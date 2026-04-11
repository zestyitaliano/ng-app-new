import React, { useState, useEffect } from 'react';
import ToolHeaderLite from '../../components/ToolHeaderLite';
import { SitemapState } from './types';
import { fetchRobotsAndRoots, processSitemap, categorizeLinks } from './services/sitemapService';
import InputForm from './components/InputForm';
import RobotsViewer from './components/RobotsViewer';
import LinkCategory from './components/LinkCategory';
import LoadingStatus from './components/LoadingStatus';
import { toolMeta } from './meta';

const BATCH_SIZE = 5;

export default function SitemapRobotsExplorerTool() {
  const [state, setState] = useState<SitemapState>({
    robotsContent: null,
    processedSitemaps: [],
    sitemapQueue: [],
    links: [],
    categorizedLinks: {},
    errors: [],
    status: 'idle',
    statusMessage: '',
  });

  // State for global expand/collapse
  const [areAllExpanded, setAreAllExpanded] = useState(false);
  const [globalExpandState, setGlobalExpandState] = useState<{ isOpen: boolean; timestamp: number } | undefined>(undefined);

  // Initial Fetch: Robots + Roots
  const handleFetch = async (url: string) => {
    setState(prev => ({ 
      ...prev, 
      status: 'fetching_robots', 
      statusMessage: 'Fetching robots.txt...',
      robotsContent: null,
      links: [],
      sitemapQueue: [],
      processedSitemaps: [],
      categorizedLinks: {},
      errors: [] 
    }));
    
    setAreAllExpanded(false);
    setGlobalExpandState(undefined);

    try {
      const { robotsContent, rootSitemaps, error } = await fetchRobotsAndRoots(url);
      
      const errors = error ? [error] : [];
      
      if (rootSitemaps.length === 0) {
        setState(prev => ({
            ...prev,
            status: 'complete',
            statusMessage: 'No sitemaps found.',
            robotsContent,
            errors
        }));
        return;
      }

      // Start processing the first batch immediately
      setState(prev => ({
        ...prev,
        robotsContent,
        sitemapQueue: rootSitemaps,
        errors,
        status: 'processing_batch',
        statusMessage: `Found ${rootSitemaps.length} sitemaps. Starting scan...`
      }));

    } catch (error: any) {
      setState(prev => ({
        ...prev,
        status: 'error',
        errors: [error.message || 'An unexpected error occurred.'],
        statusMessage: 'Error encountered.'
      }));
    }
  };

  // Process Batch Effect
  // Whenever status becomes 'processing_batch', we take items from queue and process them.
  // We also depend on processedSitemaps.length to trigger the next batch if status remains 'processing_batch'
  useEffect(() => {
    if (state.status === 'processing_batch') {
      const processQueue = async () => {
        const { sitemapQueue, processedSitemaps, links, errors } = state;
        
        // Safety check
        if (sitemapQueue.length === processedSitemaps.length) {
            setState(prev => ({ ...prev, status: 'complete', statusMessage: 'Scan complete.' }));
            return;
        }

        // Take up to BATCH_SIZE items that haven't been processed
        const batch = sitemapQueue
            .filter(url => !processedSitemaps.includes(url))
            .slice(0, BATCH_SIZE);

        if (batch.length === 0) {
           setState(prev => ({
            ...prev,
            status: 'complete',
            statusMessage: 'Scan complete.'
          }));
          return;
        }

        let newLinks: string[] = [];
        let newSitemaps: string[] = [];
        let newErrors: string[] = [];
        let completedUrls: string[] = [];

        for (const url of batch) {
          setState(prev => ({ ...prev, statusMessage: `Scanning: ${url.split('/').pop()}...` }));
          
          const result = await processSitemap(url);
          completedUrls.push(url);
          
          if (result.error) {
            newErrors.push(`${url}: ${result.error}`);
          } else {
            newLinks = [...newLinks, ...result.newLinks];
            // Add discovered child sitemaps to queue if not already there or processed
            result.newSitemaps.forEach(child => {
                 if (!sitemapQueue.includes(child) && !processedSitemaps.includes(child)) {
                     newSitemaps.push(child);
                 }
            });
          }
        }

        const allLinks = [...links, ...newLinks];
        // Unique links
        const uniqueLinks = Array.from(new Set(allLinks));
        const categories = categorizeLinks(uniqueLinks);
        const updatedQueue = [...sitemapQueue, ...newSitemaps];
        const updatedProcessed = [...processedSitemaps, ...completedUrls];
        
        const pendingCount = updatedQueue.length - updatedProcessed.length;
        const totalLinksCount = uniqueLinks.length;
        const totalProcessedCount = updatedProcessed.length;

        // Auto-continue heuristic:
        // Continue if we have pending items AND:
        // 1. We have found very few links (< 50)
        // 2. OR we haven't processed many sitemaps yet (< 20)
        // This prevents the app from pausing on "sitemap indexes" that contain no links themselves,
        // while still providing a safety break for massive sites.
        const isLowData = totalLinksCount < 50;
        const isEarlyStage = totalProcessedCount < 20;
        const shouldAutoContinue = pendingCount > 0 && (isLowData || isEarlyStage);

        setState(prev => ({
          ...prev,
          links: uniqueLinks,
          categorizedLinks: categories,
          sitemapQueue: updatedQueue,
          processedSitemaps: updatedProcessed,
          errors: [...prev.errors, ...newErrors],
          status: pendingCount === 0 ? 'complete' : (shouldAutoContinue ? 'processing_batch' : 'paused'),
          statusMessage: pendingCount === 0 
            ? 'Scan complete.' 
            : (shouldAutoContinue ? `Auto-continuing... Found ${uniqueLinks.length} links so far.` : `Paused. ${pendingCount} sitemaps pending.`)
        }));
      };

      processQueue();
    }
  }, [state.status, state.processedSitemaps.length]);

  const continueScanning = () => {
    setState(prev => ({ ...prev, status: 'processing_batch' }));
  };

  const toggleAllCategories = () => {
    const newState = !areAllExpanded;
    setAreAllExpanded(newState);
    setGlobalExpandState({ isOpen: newState, timestamp: Date.now() });
  };

  const pendingCount = state.sitemapQueue.length - state.processedSitemaps.length;

  return (
    <div className="min-h-screen bg-brand-gray font-syne">
      <ToolHeaderLite meta={toolMeta} />
      <div className="p-6">
      <div className="max-w-7xl mx-auto pt-10 pb-20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">
            Sitemap <span className="text-brand-red">&</span> Robots
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Instantly visualize any website's structure. Enter a URL to fetch the robots.txt, parse sitemaps, and discover hidden pages.
          </p>
        </div>

        {/* Input */}
        <InputForm onFetch={handleFetch} isLoading={state.status === 'fetching_robots' || state.status === 'processing_batch'} />

        {/* Error/Warning Display */}
        {state.errors.length > 0 && (
          <div className={`border-l-4 p-4 rounded-none mb-8 shadow-sm bg-yellow-50 border-brand-yellow text-yellow-800 max-h-40 overflow-y-auto custom-scrollbar`}>
            <p className="font-bold sticky top-0 bg-yellow-50 pb-2">Scan Warnings ({state.errors.length})</p>
            {state.errors.map((err, i) => <p key={i} className="text-sm mt-1 border-b border-yellow-200/50 pb-1">{err}</p>)}
          </div>
        )}

        {/* Loading State */}
        {(state.status === 'fetching_robots' || state.status === 'processing_batch') && (
          <LoadingStatus message={state.statusMessage} />
        )}

        {/* Results Area */}
        {(state.status === 'paused' || state.status === 'complete' || state.links.length > 0) && (
          <div className="animate-fade-in space-y-12">
            
            {/* Robots.txt */}
            <RobotsViewer content={state.robotsContent} />

            {/* Sitemap Stats & Control */}
            <div className="bg-white p-8 rounded-none shadow-sm border-t-4 border-brand-blue">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Total Links Found</p>
                        <p className="text-3xl font-extrabold text-gray-800">{state.links.length}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Processed Sitemaps</p>
                        <p className="text-3xl font-extrabold text-brand-blue">{state.processedSitemaps.length}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Pending Sitemaps</p>
                        <p className="text-3xl font-extrabold text-brand-yellow">{pendingCount}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                       {pendingCount > 0 ? (
                            <button 
                                onClick={continueScanning}
                                disabled={state.status === 'processing_batch'}
                                className="bg-brand-blue hover:bg-[#156a9e] text-white font-bold py-3 px-6 rounded-none shadow-lg transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {state.status === 'processing_batch' ? 'Scanning...' : `Scan Next ${Math.min(pendingCount, BATCH_SIZE)}`}
                            </button>
                       ) : (
                           <div className="text-green-600 font-bold flex items-center justify-center gap-2">
                               <span className="text-xl">✓</span> Scan Complete
                           </div>
                       )}
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-none bg-brand-red"></div>
                  <h2 className="text-2xl font-bold text-brand-blue">Discovered Content</h2>
                </div>
                {Object.keys(state.categorizedLinks).length > 0 && (
                  <button
                    onClick={toggleAllCategories}
                    className="px-5 py-2 text-sm font-bold text-brand-blue bg-white border border-brand-blue/20 rounded-none hover:bg-brand-blue/5 transition-all shadow-sm hover:shadow active:scale-95"
                  >
                    {areAllExpanded ? 'Collapse All' : 'Expand All'}
                  </button>
                )}
              </div>
              
              {Object.keys(state.categorizedLinks).length === 0 ? (
                <div className="text-center p-12 bg-white rounded-none shadow-sm border border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">No links found yet.</p>
                </div>
              ) : (
                <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
                  {Object.entries(state.categorizedLinks).sort((a,b) => a[0].localeCompare(b[0])).map(([category, links]) => (
                    <div key={category} className="break-inside-avoid mb-6">
                        <LinkCategory 
                          category={category} 
                          links={links} 
                          globalExpandState={globalExpandState}
                        />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-4 bg-brand-yellow"></div>
      </div>
    </div>
  );
}
