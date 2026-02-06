import React, { useState, useEffect, useMemo } from 'react';
import { UTMParameters, SavedLink, CustomParam } from './types';
import { INITIAL_UTM, Icons } from './constants';

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="group relative inline-block ml-1">
    <span className="text-slate-400 cursor-help hover:text-primary transition-colors">
      <Icons.Info />
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-3 bg-slate-900 text-white text-[10px] rounded-none shadow-none z-30 pointer-events-none border border-white">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
    </div>
  </div>
);

const STORAGE_KEY = "ng_tool_campaign_url_architect_history";

const LabelBadge: React.FC<{ required?: boolean; hasError?: boolean; showStatus?: boolean }> = ({ required, hasError, showStatus }) => (
  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-none ml-2 uppercase tracking-tighter border transition-colors ${
    showStatus && hasError 
      ? 'bg-secondary2 text-white border-secondary2' 
      : required 
        ? 'bg-secondary2/10 text-secondary2 border-secondary2' 
        : 'bg-offwhite text-slate-500 border-slate-200'
  }`}>
    {showStatus && hasError ? 'Invalid' : required ? 'Required' : 'Optional'}
  </span>
);

const ErrorMessage: React.FC<{ message?: string; visible: boolean }> = ({ message, visible }) => {
  if (!message || !visible) return null;
  return (
    <p className="text-[10px] font-bold text-secondary2 mt-1 uppercase tracking-tight animate-in fade-in slide-in-from-top-1 duration-200">
      {message}
    </p>
  );
};

export default function CampaignUrlArchitectTool() {
  const [params, setParams] = useState<UTMParameters>(INITIAL_UTM as any);
  const [history, setHistory] = useState<SavedLink[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [didTryCopy, setDidTryCopy] = useState(false);
  const [copying, setCopying] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, [history]);


  // Validation Logic
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    // Website URL Validation
    if (!params.websiteUrl) {
      newErrors.websiteUrl = 'URL is required';
    } else {
      try {
        const urlString = params.websiteUrl.startsWith('http') ? params.websiteUrl : `https://${params.websiteUrl}`;
        const u = new URL(urlString);
        if (!params.websiteUrl.includes('.') || u.hostname === '') {
          newErrors.websiteUrl = 'Invalid domain format';
        }
      } catch (e) {
        newErrors.websiteUrl = 'Invalid URL format';
      }
    }

    // Campaign Source Validation
    if (!params.campaignSource) {
      newErrors.campaignSource = 'Source is required';
    }

    const validateFormat = (val: string, key: string) => {
      if (val && /\s/.test(val)) {
        newErrors[key] = 'Avoid spaces in UTM values';
      }
    };

    validateFormat(params.campaignSource, 'campaignSource');
    validateFormat(params.campaignMedium, 'campaignMedium');
    validateFormat(params.campaignName, 'campaignName');
    validateFormat(params.campaignId, 'campaignId');
    validateFormat(params.campaignTerm, 'campaignTerm');
    validateFormat(params.campaignContent, 'campaignContent');

    params.customParams.forEach(cp => {
      if (!cp.key || cp.key === 'utm_') {
        newErrors[`custom_key_${cp.id}`] = 'Key required';
      }
      if (!cp.value) {
        newErrors[`custom_val_${cp.id}`] = 'Value required';
      }
    });

    setErrors(newErrors);
  }, [params]);

  const generatedUrl = useMemo(() => {
    if (!params.websiteUrl || (errors.websiteUrl && errors.websiteUrl === 'Invalid URL format')) return '';
    try {
      const url = new URL(params.websiteUrl.startsWith('http') ? params.websiteUrl : `https://${params.websiteUrl}`);
      const searchParams = new URLSearchParams(url.search);

      if (params.campaignId) searchParams.set('utm_id', params.campaignId);
      if (params.campaignSource) searchParams.set('utm_source', params.campaignSource);
      if (params.campaignMedium) searchParams.set('utm_medium', params.campaignMedium);
      if (params.campaignName) searchParams.set('utm_name', params.campaignName);
      if (params.campaignTerm) searchParams.set('utm_term', params.campaignTerm);
      if (params.campaignContent) searchParams.set('utm_content', params.campaignContent);

      if (params.customParams) {
        params.customParams.forEach(cp => {
          if (cp.key && cp.value) {
            searchParams.set(cp.key, cp.value);
          }
        });
      }

      url.search = searchParams.toString();
      return url.toString();
    } catch (e) {
      return '';
    }
  }, [params, errors.websiteUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomParamChange = (id: string, field: 'key' | 'value', value: string) => {
    setParams(prev => ({
      ...prev,
      customParams: prev.customParams.map(cp => cp.id === id ? { ...cp, [field]: value } : cp)
    }));
  };

  const addCustomParam = () => {
    const newParam: CustomParam = {
      id: Math.random().toString(36).slice(2, 9),
      key: 'utm_',
      value: ''
    };
    setParams(prev => ({
      ...prev,
      customParams: [...prev.customParams, newParam]
    }));
  };

  const removeCustomParam = (id: string) => {
    setParams(prev => ({
      ...prev,
      customParams: prev.customParams.filter(cp => cp.id !== id)
    }));
  };

  const handleCopy = async () => {
    setDidTryCopy(true);
    if (Object.keys(errors).length > 0) return;
    if (!generatedUrl) return;

    await navigator.clipboard.writeText(generatedUrl);
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
      setDidTryCopy(false);
    }, 2000);

    const newLink: SavedLink = {
      ...params,
      id: Math.random().toString(36).slice(2, 9),
      fullUrl: generatedUrl,
      createdAt: Date.now()
    };
    setHistory(prev => [newLink, ...prev].slice(0, 50));
  };

  const handleClear = () => {
    setParams(INITIAL_UTM as any);
    setErrors({});
    setDidTryCopy(false);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const isErrorVisible = (key: string) => {
    if (key === 'websiteUrl' && params.websiteUrl && (errors[key] === 'Invalid domain format' || errors[key] === 'Invalid URL format')) return true;
    return didTryCopy && !!errors[key];
  };

  const inputClasses = (key: string) => `w-full px-4 py-3 border-2 rounded-none transition font-medium ${
    isErrorVisible(key)
      ? 'border-secondary2 bg-secondary2/5 focus:border-secondary2 focus:ring-0 focus:outline-none' 
      : 'border-slate-200 bg-offwhite focus:border-primary focus:ring-0 focus:outline-none'
  }`;

  return (
    <div className="min-h-screen flex flex-col font-syne">
      <header className="bg-white border-b-2 border-primary px-6 py-5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-none text-white">
              <Icons.Link />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tighter">URL Architect</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 space-y-8">
          <div className="bg-white p-8 rounded-none border border-slate-200 shadow-[8px_8px_0px_0px_#1982c4]">
            <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3 text-slate-900 uppercase tracking-tight">
              <span className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-sm text-white font-black">1</span>
              Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Website URL</label>
                    <Tooltip text="The full website URL. Required to generate the base link." />
                  </div>
                  <LabelBadge required hasError={!!errors.websiteUrl} showStatus={isErrorVisible('websiteUrl')} />
                </div>
                <input 
                  type="text" 
                  name="websiteUrl"
                  value={params.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                  className={inputClasses('websiteUrl')}
                />
                <ErrorMessage message={errors.websiteUrl} visible={isErrorVisible('websiteUrl')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign ID</label>
                    <Tooltip text="Used to identify which ads campaign this referral references." />
                  </div>
                  <LabelBadge hasError={!!errors.campaignId} showStatus={isErrorVisible('campaignId')} />
                </div>
                <input 
                  type="text" 
                  name="campaignId"
                  value={params.campaignId}
                  onChange={handleInputChange}
                  placeholder="ads-123"
                  className={inputClasses('campaignId')}
                />
                <ErrorMessage message={errors.campaignId} visible={isErrorVisible('campaignId')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign Source</label>
                    <Tooltip text="The referrer (e.g. google, newsletter). Required." />
                  </div>
                  <LabelBadge required hasError={!!errors.campaignSource} showStatus={isErrorVisible('campaignSource')} />
                </div>
                <input 
                  type="text" 
                  name="campaignSource"
                  value={params.campaignSource}
                  onChange={handleInputChange}
                  placeholder="google, newsletter"
                  className={inputClasses('campaignSource')}
                />
                <ErrorMessage message={errors.campaignSource} visible={isErrorVisible('campaignSource')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign Medium</label>
                    <Tooltip text="Marketing medium (e.g. cpc, banner, email)." />
                  </div>
                  <LabelBadge hasError={!!errors.campaignMedium} showStatus={isErrorVisible('campaignMedium')} />
                </div>
                <input 
                  type="text" 
                  name="campaignMedium"
                  value={params.campaignMedium}
                  onChange={handleInputChange}
                  placeholder="cpc, banner"
                  className={inputClasses('campaignMedium')}
                />
                <ErrorMessage message={errors.campaignMedium} visible={isErrorVisible('campaignMedium')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign Name</label>
                    <Tooltip text="Product, promo code, or slogan (e.g. spring_sale)." />
                  </div>
                  <LabelBadge hasError={!!errors.campaignName} showStatus={isErrorVisible('campaignName')} />
                </div>
                <input 
                  type="text" 
                  name="campaignName"
                  value={params.campaignName}
                  onChange={handleInputChange}
                  placeholder="spring_sale"
                  className={inputClasses('campaignName')}
                />
                <ErrorMessage message={errors.campaignName} visible={isErrorVisible('campaignName')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign Term</label>
                    <Tooltip text="Identify paid keywords. Used for paid search." />
                  </div>
                  <LabelBadge hasError={!!errors.campaignTerm} showStatus={isErrorVisible('campaignTerm')} />
                </div>
                <input 
                  type="text" 
                  name="campaignTerm"
                  value={params.campaignTerm}
                  onChange={handleInputChange}
                  placeholder="running+shoes"
                  className={inputClasses('campaignTerm')}
                />
                <ErrorMessage message={errors.campaignTerm} visible={isErrorVisible('campaignTerm')} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Campaign Content</label>
                    <Tooltip text="Use to differentiate ads or links that point to the same URL." />
                  </div>
                  <LabelBadge hasError={!!errors.campaignContent} showStatus={isErrorVisible('campaignContent')} />
                </div>
                <input 
                  type="text" 
                  name="campaignContent"
                  value={params.campaignContent}
                  onChange={handleInputChange}
                  placeholder="logolink"
                  className={inputClasses('campaignContent')}
                />
                <ErrorMessage message={errors.campaignContent} visible={isErrorVisible('campaignContent')} />
              </div>

              {/* Custom Parameters Section */}
              <div className="md:col-span-2 pt-4">
                <div className="flex items-center justify-between mb-4 border-b-2 border-offwhite pb-2">
                  <div className="flex items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-primary">Custom Parameters</label>
                    <Tooltip text="Add any additional parameters needed for your campaign tracking." />
                  </div>
                  <button 
                    onClick={addCustomParam}
                    className="flex items-center gap-1 text-[10px] font-black text-primary hover:text-secondary1 transition uppercase tracking-widest"
                  >
                    <Icons.Plus />
                    Add Parameter
                  </button>
                </div>

                <div className="space-y-4">
                  {params.customParams.map((cp) => (
                    <div key={cp.id} className="group animate-in fade-in slide-in-from-left-4 duration-200">
                      <div className="flex gap-4 items-start">
                        <div className="flex-1">
                          <label className="block text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1">Key</label>
                          <input 
                            type="text" 
                            value={cp.key}
                            onChange={(e) => handleCustomParamChange(cp.id, 'key', e.target.value)}
                            placeholder="utm_custom"
                            className={`w-full px-3 py-2 border-2 rounded-none transition text-xs font-bold ${isErrorVisible(`custom_key_${cp.id}`) ? 'border-secondary2 bg-secondary2/5' : 'border-slate-100 bg-offwhite focus:border-primary'}`}
                          />
                          <ErrorMessage message={errors[`custom_key_${cp.id}`]} visible={isErrorVisible(`custom_key_${cp.id}`)} />
                        </div>
                        <div className="flex-[2]">
                          <label className="block text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1">Value</label>
                          <input 
                            type="text" 
                            value={cp.value}
                            onChange={(e) => handleCustomParamChange(cp.id, 'value', e.target.value)}
                            placeholder="value"
                            className={`w-full px-3 py-2 border-2 rounded-none transition text-xs font-bold ${isErrorVisible(`custom_val_${cp.id}`) ? 'border-secondary2 bg-secondary2/5' : 'border-slate-100 bg-offwhite focus:border-primary'}`}
                          />
                          <ErrorMessage message={errors[`custom_val_${cp.id}`]} visible={isErrorVisible(`custom_val_${cp.id}`)} />
                        </div>
                        <button 
                          onClick={() => removeCustomParam(cp.id)}
                          className="mt-6 p-2.5 text-slate-300 hover:text-secondary2 transition"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                  {params.customParams.length === 0 && (
                    <p className="text-[10px] text-slate-400 italic font-medium">No custom parameters added yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-offwhite flex justify-end">
              <button 
                onClick={handleClear}
                className="text-slate-400 hover:text-secondary2 font-black transition text-xs uppercase tracking-widest underline decoration-2 underline-offset-4"
              >
                Clear Settings
              </button>
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-none border border-slate-200 shadow-[8px_8px_0px_0px_#ffca3a] sticky top-28">
            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-3 text-slate-900 uppercase tracking-tight">
              <span className="w-8 h-8 rounded-none bg-secondary1 flex items-center justify-center text-sm text-slate-900 font-black">2</span>
              Output
            </h2>
            
            <div className="relative group">
              <textarea 
                readOnly
                value={generatedUrl}
                className="w-full h-40 p-5 bg-offwhite border-2 border-slate-100 rounded-none font-medium text-sm text-slate-700 resize-none focus:outline-none border-dashed"
                placeholder="Tagged URL will appear here..."
              />
              {generatedUrl && (
                <button 
                  onClick={handleCopy}
                  className={`absolute bottom-4 right-4 flex items-center gap-2 ${copying ? 'bg-green-500' : 'bg-primary'} text-white px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest transition shadow-none active:scale-95 border-b-4 border-black/10`}
                >
                  {copying ? <Icons.Check /> : <Icons.Copy />}
                  {copying ? 'COPIED' : 'COPY URL'}
                </button>
              )}
            </div>

            {didTryCopy && Object.keys(errors).length > 0 && (
              <div className="mt-6 p-4 bg-secondary2/5 border-l-4 border-secondary2 flex flex-col gap-2 text-secondary2 text-[10px] font-bold leading-relaxed">
                <div className="flex gap-2">
                  <div className="shrink-0">ALERT:</div>
                  <p>Incomplete configuration. Please resolve the {Object.keys(errors).length} highlighted field{Object.keys(errors).length === 1 ? '' : 's'}.</p>
                </div>
              </div>
            )}
            
            {!params.websiteUrl && !didTryCopy && (
              <div className="mt-6 p-4 bg-secondary2/5 border-l-4 border-secondary2 flex gap-4 text-secondary2 text-xs font-bold leading-relaxed">
                <div className="shrink-0 mt-0.5">TIP:</div>
                <p>Start by entering a Website URL and Campaign Source to generate your tracking link.</p>
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="bg-white p-8 rounded-none border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black flex items-center gap-3 text-slate-900 uppercase tracking-tight">
                  <Icons.History />
                  Log
                </h2>
                <button 
                  onClick={() => setHistory([])}
                  className="text-[10px] text-slate-400 hover:text-secondary2 transition font-black uppercase tracking-widest"
                >
                  WIPE HISTORY
                </button>
              </div>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item) => (
                  <div key={item.id} className="p-4 border border-offwhite rounded-none hover:bg-offwhite transition group relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-primary text-white px-2 py-0.5 rounded-none text-[9px] font-black uppercase">{item.campaignSource || 'raw'}</span>
                          <span className="text-slate-400 text-[9px] font-bold tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 truncate mb-3 border-l-2 border-slate-200 pl-2">{item.fullUrl}</p>
                      </div>
                      <button 
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-1.5 text-slate-300 hover:text-secondary2 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setParams({
                            websiteUrl: item.websiteUrl,
                            campaignId: item.campaignId,
                            campaignSource: item.campaignSource,
                            campaignMedium: item.campaignMedium,
                            campaignName: item.campaignName,
                            campaignTerm: item.campaignTerm,
                            campaignContent: item.campaignContent,
                            customParams: item.customParams || []
                          });
                          setDidTryCopy(false);
                        }}
                        className="text-[10px] text-primary font-black hover:underline underline-offset-4 decoration-2 uppercase tracking-widest"
                      >
                        LOAD PARAMS
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(item.fullUrl);
                        }}
                        className="text-[10px] text-slate-400 font-black hover:text-primary transition uppercase tracking-widest"
                      >
                        COPY AGAIN
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t-4 border-offwhite py-10 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
            CAMPAIGN URL ARCHITECT &copy; {new Date().getFullYear()} — BUILT FOR PERFORMANCE
          </p>
        </div>
      </footer>
    </div>
  );
}