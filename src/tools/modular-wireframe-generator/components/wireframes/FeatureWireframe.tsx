
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, TextBlock, TitleBlock, ButtonBlock, Container } from '../WireframeElements';

export const FeatureWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: 3 Columns with Icons
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center py-8 bg-white">
        <Container className="flex flex-col h-full justify-center">
           <div className="text-center mb-8">
             <TitleBlock width="30%" className="mx-auto" />
           </div>
           <div className="grid grid-cols-3 gap-6">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex flex-col items-center text-center space-y-3 p-4 border border-gray-100">
                 <div className="w-12 h-12 rounded-full border-2 mb-2 flex items-center justify-center" style={{ borderColor: '#ff595e' }}>
                   <div className="w-6 h-6 bg-[#ff595e] opacity-50 rounded-full" />
                 </div>
                 <div className="w-1/2 h-4 bg-gray-300 rounded" />
                 <TextBlock lines={3} align="center" />
               </div>
             ))}
           </div>
        </Container>
      </div>
    );
  }
  // ... Variations 2-30 omitted for brevity (will be included in output) ...
  // Re-implementing variations 2-30 to ensure valid full file output.

  // Variation 2: Zig Zag (Image Left, Text Right -> mirrored) - simplified to 1 row for aspect ratio
  if (variation === 2) {
    return (
      <div className="w-full h-full flex items-center bg-gray-50">
        <Container className="flex gap-8 items-center">
          <div className="w-1/2 aspect-video">
            <ImageBlock className="w-full h-full shadow-lg" text="FEATURE VISUAL" />
          </div>
          <div className="w-1/2 space-y-4">
            <TitleBlock width="70%" />
            <TextBlock lines={5} />
            <div className="w-1/3 h-2 bg-[#1982c4]" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 3: 4 Column Grid Dense
  if (variation === 3) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <Container>
          <div className="flex justify-between items-end mb-6 border-b pb-2">
             <TitleBlock width="40%" className="mb-0" />
             <div className="w-20 h-8 border border-gray-300 flex items-center justify-center text-xs">VIEW ALL</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
               <div key={i} className="space-y-2">
                 <ImageBlock className="w-full aspect-[4/3]" />
                 <div className="w-3/4 h-3 bg-gray-300" />
                 <TextBlock lines={2} />
               </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 4: List with Side Image
  if (variation === 4) {
    return (
      <div className="w-full h-full flex items-center bg-white p-8">
        <Container className="flex gap-12 h-full items-center">
          <div className="w-2/5 h-4/5">
             <ImageBlock className="w-full h-full rounded shadow" text="PRODUCT" />
          </div>
          <div className="w-3/5 space-y-6">
             <TitleBlock width="80%" />
             {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-3">
                 <div className="w-6 h-6 rounded border border-gray-400 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-[#2a9d8f]" />
                 </div>
                 <div className="flex-1">
                   <div className="w-1/3 h-3 bg-gray-700 mb-2" />
                   <TextBlock lines={1} className="w-3/4" />
                 </div>
               </div>
             ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 5: Horizontal Card Scroll
  if (variation === 5) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-gray-50 overflow-hidden">
        <div className="px-12 mb-4">
          <TitleBlock width="30%" />
        </div>
        <div className="flex gap-6 px-12 overflow-hidden">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-64 flex-shrink-0 bg-white p-4 border border-gray-200 shadow-sm rounded-lg space-y-3">
                <div className="w-8 h-8 bg-[#2a9d8f] rounded mb-2" />
                <div className="w-3/4 h-4 bg-gray-800" />
                <TextBlock lines={3} />
                <div className="w-full h-8 bg-gray-100 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variation 6: Timeline/Process
  if (variation === 6) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <Container className="flex flex-col items-center">
           <TitleBlock width="40%" className="mb-12" />
           <div className="w-full relative flex justify-between items-center px-8">
              {/* Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10" />
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col items-center space-y-4 bg-white px-2">
                   <div className="w-12 h-12 rounded-full bg-[#1982c4] border-4 border-white shadow-sm flex items-center justify-center text-white font-bold">{i}</div>
                   <div className="w-24 h-4 bg-gray-800 rounded" />
                   <TextBlock lines={2} align="center" className="w-32 scale-75" />
                </div>
              ))}
           </div>
        </Container>
      </div>
    );
  }

  // Variation 7: Bento Grid
  if (variation === 7) {
    return (
      <div className="w-full h-full flex items-center bg-gray-50 p-8">
        <Container className="grid grid-cols-4 grid-rows-2 gap-4 h-full">
           <div className="col-span-2 row-span-2 bg-white p-6 border shadow-sm flex flex-col justify-between">
              <TitleBlock width="60%" />
              <ImageBlock className="flex-1 w-full my-4" />
              <TextBlock lines={3} />
           </div>
           <div className="col-span-1 bg-white p-4 border shadow-sm">
              <div className="w-10 h-10 rounded bg-blue-100 mb-2" />
              <TextBlock lines={2} />
           </div>
           <div className="col-span-1 bg-white p-4 border shadow-sm">
              <div className="w-10 h-10 rounded bg-purple-100 mb-2" />
              <TextBlock lines={2} />
           </div>
           <div className="col-span-2 bg-[#1982c4] p-6 text-white flex items-center justify-between">
              <div className="space-y-2">
                 <div className="w-32 h-4 bg-white/40" />
                 <div className="w-48 h-6 bg-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full" />
           </div>
        </Container>
      </div>
    );
  }

  // Variation 8: Tabs/Dashboard Feature
  if (variation === 8) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-white">
        <Container>
           <div className="flex justify-center mb-8 gap-4 border-b border-gray-200 pb-1">
              <div className="px-6 py-2 border-b-2 border-[#ff595e] font-bold text-gray-800">Overview</div>
              <div className="px-6 py-2 text-gray-400">Specs</div>
              <div className="px-6 py-2 text-gray-400">Reviews</div>
           </div>
           <div className="flex gap-8 items-center">
              <div className="w-1/2 space-y-4">
                 <TitleBlock width="80%" />
                 <TextBlock lines={6} />
                 <ButtonBlock variant="secondary" />
              </div>
              <div className="w-1/2 aspect-video bg-gray-100 rounded-lg p-4">
                 <ImageBlock className="w-full h-full shadow-inner" text="INTERFACE" />
              </div>
           </div>
        </Container>
      </div>
    );
  }

  // Variation 9: Comparison Table
  if (variation === 9) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-white">
        <Container>
           <div className="text-center mb-8">
              <TitleBlock width="40%" className="mx-auto" />
           </div>
           <div className="grid grid-cols-4 gap-0 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 p-4 border-r border-gray-200">
                 <div className="h-8 mb-4"></div>
                 <div className="space-y-6">
                    <div className="h-2 w-2/3 bg-gray-300 rounded" />
                    <div className="h-2 w-1/2 bg-gray-300 rounded" />
                    <div className="h-2 w-3/4 bg-gray-300 rounded" />
                 </div>
              </div>
              {[1, 2, 3].map(i => (
                 <div key={i} className={`p-4 text-center border-r border-gray-100 ${i === 2 ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset z-10' : ''}`}>
                    <div className="font-bold text-sm mb-4">Plan {i}</div>
                    <div className="space-y-6 flex flex-col items-center">
                       <div className="w-4 h-4 rounded-full bg-green-200" />
                       <div className={`w-4 h-4 rounded-full ${i > 1 ? 'bg-green-200' : 'bg-gray-200'}`} />
                       <div className={`w-4 h-4 rounded-full ${i > 2 ? 'bg-green-200' : 'bg-gray-200'}`} />
                    </div>
                    {i === 2 && <div className="mt-6"><ButtonBlock className="text-[10px] h-8 px-2" /></div>}
                 </div>
              ))}
           </div>
        </Container>
      </div>
    );
  }

  // Variation 10: Step Wizard (Connected Dots)
  if (variation === 10) {
    return (
      <div className="w-full h-full flex items-center bg-[#f8f9fa]">
        <Container>
          <div className="flex items-center justify-between relative mb-12">
             <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 -z-10 transform -translate-y-1/2" />
             {[1,2,3].map(step => (
                <div key={step} className="flex flex-col items-center bg-[#f8f9fa] px-4">
                   <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center font-bold text-gray-400 mb-2">0{step}</div>
                   <div className="h-4 w-24 bg-gray-800 rounded" />
                </div>
             ))}
          </div>
          <div className="flex gap-8">
             <div className="w-1/2">
                <TitleBlock width="60%" />
                <TextBlock lines={4} />
             </div>
             <div className="w-1/2">
                <ImageBlock className="w-full h-40 rounded-lg" text="STEP DETAIL" />
             </div>
          </div>
        </Container>
      </div>
    );
  }

  // Variation 11: Developer Block (Code Snippet)
  if (variation === 11) {
    return (
      <div className="w-full h-full flex items-center bg-gray-900 text-white">
         <Container className="flex gap-12 items-center">
            <div className="w-1/2 space-y-6">
               <div className="text-xs text-[#2a9d8f] font-mono">FOR DEVELOPERS</div>
               <TitleBlock width="80%" className="bg-white" />
               <TextBlock lines={3} className="opacity-70" />
               <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-700 rounded" />
                  <div className="w-8 h-8 bg-gray-700 rounded" />
               </div>
            </div>
            <div className="w-1/2 bg-black rounded-lg p-4 font-mono text-xs shadow-2xl border border-gray-800">
               <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <div className="space-y-2 opacity-80">
                  <div className="flex"><span className="text-purple-400 mr-2">const</span> <span className="text-blue-400">feature</span> = <span className="text-green-400">true</span>;</div>
                  <div className="flex"><span className="text-purple-400 mr-2">async</span> <span className="text-yellow-400">init</span>() {'{'}</div>
                  <div className="ml-4 text-gray-500">// Initialize magic</div>
                  <div className="ml-4"><span className="text-blue-300">await</span> load();</div>
                  <div>{'}'}</div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 12: Mosaic Feature
  if (variation === 12) {
    return (
      <div className="w-full h-full flex items-center bg-white p-8">
        <Container className="flex gap-4 h-full">
           <div className="w-2/3 h-full relative group">
              <ImageBlock className="w-full h-full rounded-2xl" text="MAIN FEATURE" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-xl backdrop-blur-sm">
                 <div className="w-1/2 h-4 bg-gray-800 mb-2 rounded" />
                 <div className="w-full h-2 bg-gray-400 rounded" />
              </div>
           </div>
           <div className="w-1/3 flex flex-col gap-4 h-full">
              <div className="flex-1 bg-gray-100 rounded-2xl p-4 flex flex-col justify-center">
                 <div className="w-10 h-10 bg-orange-100 rounded-full mb-2" />
                 <TextBlock lines={2} />
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-4 flex flex-col justify-center">
                 <div className="w-10 h-10 bg-purple-100 rounded-full mb-2" />
                 <TextBlock lines={2} />
              </div>
           </div>
        </Container>
      </div>
    );
  }

  // Variation 13: Big Stats
  if (variation === 13) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1982c4]">
        <Container className="flex justify-around items-center text-white">
           <div className="text-center">
              <div className="text-6xl font-bold mb-2">99%</div>
              <div className="w-20 h-2 bg-white/30 mx-auto rounded" />
              <div className="text-sm mt-2 opacity-80">Uptime</div>
           </div>
           <div className="w-px h-32 bg-white/20" />
           <div className="text-center">
              <div className="text-6xl font-bold mb-2">24h</div>
              <div className="w-20 h-2 bg-white/30 mx-auto rounded" />
              <div className="text-sm mt-2 opacity-80">Support</div>
           </div>
           <div className="w-px h-32 bg-white/20" />
           <div className="text-center">
              <div className="text-6xl font-bold mb-2">50k</div>
              <div className="w-20 h-2 bg-white/30 mx-auto rounded" />
              <div className="text-sm mt-2 opacity-80">Users</div>
           </div>
        </Container>
      </div>
    );
  }

  // Variation 14: Alternating Rows (Simulated)
  if (variation === 14) {
    return (
      <div className="w-full h-full flex flex-col bg-white">
         <div className="flex-1 flex items-center px-12 gap-8 border-b border-gray-100">
            <div className="w-1/2">
               <div className="w-10 h-10 rounded bg-blue-100 mb-4" />
               <div className="w-3/4 h-4 bg-gray-800 mb-2" />
               <TextBlock lines={2} />
            </div>
            <div className="w-1/2 p-4">
               <ImageBlock className="w-full h-24 rounded" />
            </div>
         </div>
         <div className="flex-1 flex items-center px-12 gap-8 flex-row-reverse">
            <div className="w-1/2">
               <div className="w-10 h-10 rounded bg-red-100 mb-4" />
               <div className="w-3/4 h-4 bg-gray-800 mb-2" />
               <TextBlock lines={2} />
            </div>
            <div className="w-1/2 p-4">
               <ImageBlock className="w-full h-24 rounded" />
            </div>
         </div>
      </div>
    );
  }

  // Variation 15: Checklist / Benefits
  if (variation === 15) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
         <TitleBlock width="40%" className="mb-8" />
         <Container className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-2xl">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</div>
                  <div className="w-full h-3 bg-gray-300 rounded" />
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 16: Logo Integration Grid
  if (variation === 16) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-white p-8 text-center">
         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by the world's best</div>
         <Container className="grid grid-cols-4 gap-6 opacity-60 grayscale">
            {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  <div className="w-1/2 h-4 bg-gray-300 rounded" />
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 17: Connected Steps (Horizontal)
  if (variation === 17) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Container>
          <div className="flex justify-between items-center relative px-12">
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10" />
             {[1,2,3,4].map(i => (
                <div key={i} className="flex flex-col items-center gap-4 bg-white p-2">
                   <div className="w-16 h-16 rounded-full border-2 border-[#1982c4] bg-white flex items-center justify-center text-[#1982c4] font-bold text-xl shadow-lg hover:scale-110 transition-transform">{i}</div>
                   <div className="text-center">
                      <div className="w-20 h-3 bg-gray-800 rounded mx-auto mb-2" />
                      <div className="w-24 h-2 bg-gray-400 rounded mx-auto" />
                   </div>
                </div>
             ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 18: Stacked Cards
  if (variation === 18) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="relative w-full max-w-4xl h-64 flex justify-center items-center">
           <div className="absolute w-64 h-80 bg-white shadow-xl rounded-xl border border-gray-100 transform -translate-x-32 scale-90 z-0 p-6 flex flex-col">
              <div className="w-12 h-12 bg-purple-100 rounded-full mb-4" />
              <TextBlock lines={3} />
           </div>
           <div className="absolute w-64 h-80 bg-white shadow-xl rounded-xl border border-gray-100 transform translate-x-32 scale-90 z-0 p-6 flex flex-col">
              <div className="w-12 h-12 bg-green-100 rounded-full mb-4" />
              <TextBlock lines={3} />
           </div>
           <div className="absolute w-72 h-96 bg-white shadow-2xl rounded-xl border border-gray-200 z-10 p-8 flex flex-col justify-center">
              <div className="w-16 h-16 bg-[#1982c4] rounded-full mb-6" />
              <TitleBlock width="80%" />
              <TextBlock lines={4} />
              <ButtonBlock className="mt-auto" />
           </div>
        </div>
      </div>
    );
  }

  // Variation 19: Accordion List
  if (variation === 19) {
    return (
      <div className="w-full h-full flex items-center bg-white p-8">
        <Container className="flex gap-12 items-start">
           <div className="w-1/2">
              <TitleBlock width="80%" className="mb-8" />
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                    <div key={i} className={`border-b border-gray-200 pb-4 ${i===1 ? 'pb-8' : ''}`}>
                       <div className="flex justify-between items-center mb-2">
                          <div className="h-4 w-1/3 bg-gray-800 rounded" />
                          <div className="text-xl font-bold text-gray-400">{i===1 ? '-' : '+'}</div>
                       </div>
                       {i === 1 && <TextBlock lines={3} className="pl-4 border-l-2 border-[#ffca3a]" />}
                    </div>
                 ))}
              </div>
           </div>
           <div className="w-1/2 h-full min-h-[300px]">
              <ImageBlock className="w-full h-full rounded-lg" text="FEATURE DETAIL" />
           </div>
        </Container>
      </div>
    );
  }

  // Variation 20: Tag Cloud / Radar
  if (variation === 20) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-white p-8">
         <div className="relative w-full max-w-2xl aspect-video flex items-center justify-center">
            <div className="absolute inset-0 border border-white/10 rounded-full scale-50" />
            <div className="absolute inset-0 border border-white/10 rounded-full scale-90" />
            <div className="w-24 h-24 bg-[#ff595e] rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,89,94,0.5)]">
               <span className="font-bold text-xs">CORE</span>
            </div>
            
            {/* Satellites */}
            <div className="absolute top-1/4 left-1/4 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-xs">Analytics</div>
            <div className="absolute bottom-1/4 right-1/4 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-xs">Speed</div>
            <div className="absolute top-1/3 right-1/4 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-xs">Security</div>
            <div className="absolute bottom-1/3 left-1/3 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-xs">Scale</div>
         </div>
      </div>
    );
  }

  // Variation 21: Radial Hub
  if (variation === 21) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <div className="relative w-96 h-96 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#1982c4] flex items-center justify-center z-10 shadow-xl text-white font-bold text-xl">HUB</div>
              
              {[0, 90, 180, 270].map((deg, i) => (
                 <div 
                    key={i} 
                    className="absolute w-24 h-24 bg-gray-50 border border-gray-200 rounded-full flex flex-col items-center justify-center p-2 shadow-sm"
                    style={{ transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)` }}
                 >
                    <div className="w-6 h-6 bg-gray-300 rounded-full mb-1" />
                    <div className="w-12 h-2 bg-gray-300 rounded" />
                 </div>
              ))}
              <div className="absolute w-64 h-64 border-2 border-dashed border-gray-200 rounded-full -z-0" />
           </div>
        </div>
     );
  }

  // Variation 22: Code Terminal Feature
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center bg-gray-100 p-8">
           <Container className="flex gap-12 items-center">
              <div className="w-1/2 space-y-6">
                 <TitleBlock width="80%" />
                 <TextBlock lines={4} />
                 <ButtonBlock />
              </div>
              <div className="w-1/2">
                 <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden font-mono text-xs">
                    <div className="bg-[#2d2d2d] px-4 py-2 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500" />
                       <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="p-6 text-green-400 space-y-2">
                       <div>$ npm install awesome-feature</div>
                       <div className="text-white">Installing... [================] 100%</div>
                       <div className="text-white">Done.</div>
                       <div className="mt-4 text-blue-300">import <span className="text-white">{'{ feature }'}</span> from <span className="text-orange-300">'awesome-lib'</span>;</div>
                    </div>
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 23: Pricing Highlights
  if (variation === 23) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <Container className="grid grid-cols-3 gap-6 items-center">
              {[1, 2, 3].map(i => (
                 <div key={i} className={`p-6 rounded-xl border ${i === 2 ? 'border-[#ffca3a] bg-white shadow-xl scale-110 z-10' : 'border-gray-200 bg-gray-50'}`}>
                    {i === 2 && <div className="text-center text-xs font-bold text-[#ffca3a] mb-2 uppercase tracking-wider">Most Popular</div>}
                    <div className="text-2xl font-bold mb-4">${i * 10}/mo</div>
                    <div className="space-y-3 mb-6">
                       <div className="w-full h-2 bg-gray-200 rounded" />
                       <div className="w-3/4 h-2 bg-gray-200 rounded" />
                       <div className="w-1/2 h-2 bg-gray-200 rounded" />
                    </div>
                    <ButtonBlock className={`w-full ${i === 2 ? 'bg-[#ffca3a] text-black border-none' : ''}`} />
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 24: Image Hotspots
  if (variation === 24) {
     return (
        <div className="w-full h-full flex items-center bg-gray-900 text-white p-8">
           <Container className="flex gap-8">
              <div className="w-2/3 relative">
                 <ImageBlock className="w-full h-full rounded-lg opacity-50" text="PRODUCT VIEW" />
                 {[1, 2, 3].map(i => (
                    <div key={i} className="absolute w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform" style={{ top: `${20 + i*20}%`, left: `${20 + i*25}%` }}>
                       +
                    </div>
                 ))}
              </div>
              <div className="w-1/3 flex flex-col justify-center space-y-8">
                 <TitleBlock width="80%" className="bg-white" />
                 <TextBlock lines={4} className="opacity-70" />
              </div>
           </Container>
        </div>
     );
  }

  // Variation 25: Split Checklist
  if (variation === 25) {
     return (
        <div className="w-full h-full flex bg-white">
           <div className="w-1/2 p-12 flex flex-col justify-center bg-gray-50">
              <TitleBlock width="70%" className="mb-8" />
              <div className="space-y-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="flex gap-4 items-center p-3 bg-white rounded shadow-sm">
                       <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                       </div>
                       <div className="h-3 w-32 bg-gray-400 rounded" />
                    </div>
                 ))}
              </div>
           </div>
           <div className="w-1/2 p-4">
              <ImageBlock className="w-full h-full rounded-2xl" text="RESULT" />
           </div>
        </div>
     );
  }

  // Variation 26: Numbered List Big
  if (variation === 26) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
        <Container className="flex justify-between items-start gap-8">
           {[1, 2, 3].map(i => (
             <div key={i} className="relative flex-1 p-6 border-t-4 border-gray-900 pt-8">
                <div className="absolute -top-12 left-0 text-8xl font-black text-gray-100 -z-10">0{i}</div>
                <TitleBlock width="80%" className="mb-4" />
                <TextBlock lines={3} />
             </div>
           ))}
        </Container>
      </div>
    );
  }

  // Variation 27: Icon Cloud
  if (variation === 27) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="relative w-96 h-96 flex items-center justify-center">
           <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center z-20">
              <span className="font-bold">CORE</span>
           </div>
           {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <div 
                 key={i} 
                 className="absolute w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center"
                 style={{ transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)` }}
              >
                 <div className="w-8 h-8 bg-blue-100 rounded-full" />
              </div>
           ))}
        </div>
      </div>
    );
  }

  // Variation 28: Comparison Sliders (Before/After)
  if (variation === 28) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <Container className="flex gap-12">
            <div className="w-1/2 text-center">
               <div className="mb-4 text-xs font-bold text-red-400 uppercase">Old Way</div>
               <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-4xl">☹</span>
               </div>
               <div className="mt-4 text-sm text-gray-500">Manual, slow, error-prone</div>
            </div>
            <div className="w-1/2 text-center">
               <div className="mb-4 text-xs font-bold text-green-500 uppercase">New Way</div>
               <div className="h-64 bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200">
                  <span className="text-4xl">☺</span>
               </div>
               <div className="mt-4 text-sm text-gray-500">Automated, fast, reliable</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 29: Card Carousel (Partially Visible)
  if (variation === 29) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
         <div className="flex gap-8 items-center opacity-80">
            <div className="w-64 h-80 bg-gray-800 rounded-xl flex-shrink-0 opacity-50 transform scale-90" />
            <div className="w-80 h-96 bg-gray-800 rounded-xl flex-shrink-0 border border-gray-700 p-8 flex flex-col justify-end">
               <TitleBlock width="80%" className="bg-white" />
               <TextBlock lines={3} className="opacity-60" />
            </div>
            <div className="w-64 h-80 bg-gray-800 rounded-xl flex-shrink-0 opacity-50 transform scale-90" />
         </div>
      </div>
    );
  }

  // Variation 30: Stats Focus
  if (variation === 30) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#4361ee] text-white p-8">
         <Container className="grid grid-cols-3 gap-8 text-center divide-x divide-white/20">
            {[1,2,3].map(i => (
               <div key={i} className="px-4">
                  <div className="text-6xl font-black mb-2">{i}00%</div>
                  <div className="text-lg font-bold mb-2">Improvement</div>
                  <div className="text-sm opacity-70">In user engagement metrics</div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 31: Feature Wheel
  if (variation === 31) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <div className="relative w-80 h-80 border-4 border-gray-100 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">CORE</div>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
               <div 
                  key={i} 
                  className="absolute w-20 h-20 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-[10px] text-gray-500"
                  style={{ transform: `rotate(${deg}deg) translate(160px) rotate(-${deg}deg)` }}
               >
                  Feature {i+1}
               </div>
            ))}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gray-200 origin-bottom transform -z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gray-200 origin-bottom transform rotate-120 -z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gray-200 origin-bottom transform rotate-240 -z-0" />
         </div>
      </div>
    );
  }

  // Variation 32: Hover Reveal Grid
  if (variation === 32) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <Container className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group cursor-pointer">
                  <ImageBlock className="w-full h-full group-hover:opacity-10 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="font-bold text-sm mb-2">Feature {i}</div>
                     <TextBlock lines={2} align="center" />
                  </div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 33: Checklist Manifesto
  if (variation === 33) {
    return (
      <div className="w-full h-full flex items-center bg-yellow-50 p-8 border-l-8 border-yellow-300">
         <Container className="max-w-2xl">
            <TitleBlock width="50%" className="mb-8" />
            <div className="space-y-4">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4 items-start">
                     <div className="w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {i < 4 && <span className="font-bold">✓</span>}
                     </div>
                     <div className="flex-1">
                        <div className="w-full h-3 bg-gray-800 mb-2 rounded-sm" />
                        <div className="w-3/4 h-2 bg-gray-400 rounded-sm" />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
    );
  }

  // Variation 34: Isometric Card Stack
  if (variation === 34) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden">
         <div className="relative w-64 h-64">
            {[1,2,3].map(i => (
               <div 
                  key={i} 
                  className="absolute inset-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                  style={{ 
                     transform: `translate(${i*20}px, -${i*20}px)`, 
                     zIndex: 3-i,
                     opacity: 1 - (i*0.1) 
                  }}
               >
                  <div className="w-10 h-10 rounded bg-blue-100 mb-4" />
                  <div className="w-32 h-3 bg-gray-800 mb-2" />
                  <div className="w-full h-2 bg-gray-300" />
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 35: Floating Bubbles
  if (variation === 35) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
         <div className="relative w-full max-w-2xl h-64">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
               <TitleBlock width="200px" className="mx-auto bg-white" />
            </div>
            {[1,2,3,4,5].map((i) => (
               <div 
                  key={i} 
                  className="absolute w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-white/50 backdrop-blur-sm"
                  style={{
                     top: `${Math.random() * 80}%`,
                     left: `${Math.random() * 90}%`,
                  }}
               >
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Feature Variation {variation}</div>;
};
