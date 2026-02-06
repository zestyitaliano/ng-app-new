
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, TextBlock, TitleBlock, ButtonBlock, Container } from '../WireframeElements';

export const HeroWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: Text Left, Image Right
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center p-8 bg-white">
        <Container className="flex flex-row items-center gap-8 h-full">
          <div className="w-1/2 flex flex-col justify-center space-y-4">
            <TitleBlock width="80%" />
            <TextBlock lines={4} />
            <div className="pt-4 flex gap-3">
              <ButtonBlock />
              <ButtonBlock variant="secondary" />
            </div>
          </div>
          <div className="w-1/2 h-full py-4">
            <ImageBlock className="w-full h-full rounded-lg" text="HERO IMAGE" />
          </div>
        </Container>
      </div>
    );
  }
  // ... Variations 2-30 omitted for brevity (they exist in the file being updated, this block appends to them) ...
  // Since I must output full content, I need to include all existing ones.
  // However, for token efficiency, I will try to be concise if I can, but the instructions say "Full content".
  // I will include variations 2-30 as well.

  // Variation 2: Text Center, Background Image Hint
  if (variation === 2) {
    return (
      <div className="w-full h-full relative flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 p-4">
           <ImageBlock className="w-full h-full" />
        </div>
        
        <Container className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl bg-white/80 p-12 border-2 border-dashed" style={{ borderColor: '#ccc' }}>
          <TitleBlock width="90%" className="mx-auto" />
          <TextBlock lines={3} align="center" className="w-full" />
          <ButtonBlock />
        </Container>
      </div>
    );
  }

  // Variation 3: Image Top (Split), Text Bottom
  if (variation === 3) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="h-3/5 w-full relative">
          <ImageBlock className="w-full h-full" text="FULL WIDTH VISUAL" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="h-2/5 w-full flex items-center bg-white">
          <Container className="flex justify-between items-center">
             <div className="w-2/3">
                <TitleBlock width="60%" />
                <TextBlock lines={2} />
             </div>
             <ButtonBlock />
          </Container>
        </div>
      </div>
    );
  }

  // Variation 4: Full Background with Overlay
  if (variation === 4) {
    return (
      <div className="w-full h-full relative">
        <ImageBlock className="w-full h-full absolute inset-0 z-0" text="FULL BG" />
        <div className="absolute inset-0 bg-white/60 z-10 backdrop-blur-[2px]" />
        <Container className="relative z-20 h-full flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-3/4">
             <TitleBlock width="100%" className="mx-auto h-12" />
          </div>
          <TextBlock lines={3} align="center" className="w-2/3 mx-auto" />
          <div className="flex gap-4">
            <ButtonBlock className="bg-black text-white border-black" />
            <ButtonBlock variant="secondary" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 5: Asymmetrical Grid
  if (variation === 5) {
    return (
      <div className="w-full h-full flex">
        <div className="w-2/3 h-full p-4">
           <ImageBlock className="w-full h-full rounded-2xl" text="VISUAL FOCUS" />
        </div>
        <div className="w-1/3 h-full bg-white flex flex-col justify-center p-8 border-l border-gray-100">
           <div className="space-y-6">
             <div className="text-xs font-bold tracking-widest text-gray-400">CATEGORY</div>
             <TitleBlock width="100%" />
             <TextBlock lines={5} />
             <div className="pt-8 space-y-2">
               <div className="w-8 h-8 rounded-full border border-gray-300" />
               <div className="w-8 h-8 rounded-full border border-gray-300" />
               <div className="w-8 h-8 rounded-full border border-gray-300" />
             </div>
           </div>
        </div>
      </div>
    );
  }

  // Variation 6: Diagonal Split
  if (variation === 6) {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-100 transform -skew-x-12 translate-x-20 z-0" />
        <Container className="relative z-10 flex items-center h-full">
          <div className="w-1/2 pr-12">
            <TitleBlock width="90%" className="mb-6" />
            <TextBlock lines={4} />
            <div className="mt-8">
              <ButtonBlock />
            </div>
          </div>
          <div className="w-1/2 pl-12 flex justify-center">
             <ImageBlock className="w-80 h-80 rounded-full shadow-2xl border-4 border-white" text="HERO" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 7: Video/Media Header
  if (variation === 7) {
    return (
      <div className="w-full h-full relative">
        <ImageBlock className="w-full h-full" text="VIDEO BACKGROUND" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center pl-2 cursor-pointer hover:scale-110 transition-transform">
             <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent" />
          </div>
        </div>
        <div className="absolute bottom-12 left-0 right-0 text-center">
           <Container className="flex flex-col items-center">
             <TitleBlock width="50%" className="bg-white" />
             <div className="w-1/3 h-2 bg-white/80 rounded mt-2" />
           </Container>
        </div>
      </div>
    );
  }

  // Variation 8: Minimalist Big Type
  if (variation === 8) {
    return (
      <div className="w-full h-full bg-[#f8f9fa] flex items-end pb-12 px-8">
        <Container className="flex justify-between items-end">
          <div className="w-2/3">
             <div className="text-sm font-bold tracking-widest text-gray-400 mb-4">INTRODUCING</div>
             <div className="space-y-4">
               <div className="h-16 w-full bg-gray-800" />
               <div className="h-16 w-3/4 bg-gray-800" />
             </div>
          </div>
          <div className="w-1/4 mb-2">
             <TextBlock lines={3} align="right" />
             <ButtonBlock className="mt-4 w-full" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 9: SaaS Dashboard
  if (variation === 9) {
    return (
      <div className="w-full h-full bg-white flex items-center overflow-hidden">
        <Container className="flex gap-8 items-center relative">
          <div className="w-2/5 z-10">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-4">NEW VERSION 2.0</div>
            <TitleBlock width="100%" />
            <TextBlock lines={4} className="my-6" />
            <div className="flex gap-4">
              <ButtonBlock />
              <div className="flex items-center text-xs text-gray-500 underline">View Demo</div>
            </div>
          </div>
          <div className="w-3/5 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50" />
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="w-full h-64 bg-gray-50 rounded border border-dashed border-gray-200 flex flex-col p-4">
                  <div className="w-full h-8 bg-gray-100 mb-4 flex items-center px-2 gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-300" />
                     <div className="w-3 h-3 rounded-full bg-yellow-300" />
                     <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                  <div className="flex gap-4 h-full">
                     <div className="w-1/4 h-full bg-gray-200 rounded" />
                     <div className="w-3/4 h-full bg-gray-100 rounded grid grid-cols-2 gap-2 p-2">
                        <div className="bg-white rounded shadow-sm" />
                        <div className="bg-white rounded shadow-sm" />
                        <div className="bg-white rounded shadow-sm col-span-2 h-1/2" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Variation 10: Newsletter Focus
  if (variation === 10) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <Container className="max-w-2xl text-center">
           <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">@</div>
           <TitleBlock width="70%" className="mx-auto" />
           <TextBlock lines={2} align="center" className="mx-auto my-6 w-3/4" />
           <div className="flex gap-2 p-2 bg-white rounded-lg shadow-lg border border-gray-100 max-w-md mx-auto">
              <div className="flex-1 bg-transparent px-4 py-3 text-gray-400 text-left text-sm flex items-center">Enter your email...</div>
              <ButtonBlock className="h-full py-3" />
           </div>
           <div className="mt-4 text-xs text-gray-400">No spam, unsubscribe anytime.</div>
        </Container>
      </div>
    );
  }

  // Variation 11: Event Header
  if (variation === 11) {
    return (
      <div className="w-full h-full bg-gray-900 text-white flex items-center">
        <Container className="flex justify-between items-center border-t border-b border-gray-700 py-12">
           <div className="w-1/2">
              <div className="text-[#ffca3a] font-mono text-sm mb-2">OCT 24-26, 2024</div>
              <TitleBlock width="90%" className="bg-white h-12 mb-6" />
              <div className="flex gap-4">
                 <div className="px-4 py-2 border border-gray-600 rounded-full text-xs">SAN FRANCISCO</div>
                 <div className="px-4 py-2 border border-gray-600 rounded-full text-xs">VIRTUAL</div>
              </div>
           </div>
           <div className="w-1/3 flex flex-col items-end">
              <div className="text-right mb-6">
                 <div className="text-sm text-gray-400">STARTING FROM</div>
                 <div className="text-4xl font-bold">$299</div>
              </div>
              <ButtonBlock variant="primary" className="w-full bg-[#ffca3a] text-black border-none" />
           </div>
        </Container>
      </div>
    );
  }

  // Variation 12: Magazine Cover
  if (variation === 12) {
    return (
      <div className="w-full h-full relative">
         <ImageBlock className="w-full h-full" text="FULL PORTRAIT" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
         <Container className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <div className="text-xs font-bold tracking-[0.5em] mb-4 border-b border-white/30 pb-4 inline-block">ISSUE 01</div>
            <div className="flex items-end gap-8">
               <div className="flex-1">
                  <TitleBlock width="100%" className="bg-white h-16 mb-4" />
                  <TextBlock lines={3} className="opacity-80 w-2/3" />
               </div>
               <div className="w-32 h-32 border border-white/20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">READ NOW</span>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 13: Podcast/Media Player
  if (variation === 13) {
    return (
      <div className="w-full h-full relative flex items-center bg-gray-800">
        <ImageBlock className="absolute inset-0 w-full h-full opacity-30" text="ALBUM ART" />
        <Container className="relative z-10 flex gap-8 items-center bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10">
          <div className="w-1/3">
             <div className="w-full aspect-square bg-gray-900 rounded-lg shadow-2xl relative overflow-hidden">
                <ImageBlock className="w-full h-full" />
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
             </div>
          </div>
          <div className="w-2/3 text-white space-y-4">
             <div className="text-xs font-mono text-[#ffca3a]">EPISODE 42 • LIVE NOW</div>
             <TitleBlock width="90%" className="bg-white h-12" />
             <TextBlock lines={2} className="opacity-70" />
             
             {/* Player Controls */}
             <div className="mt-8 pt-6 border-t border-white/20">
               <div className="flex items-center gap-4 mb-2">
                 <div className="text-xs opacity-50">04:20</div>
                 <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                   <div className="w-1/3 h-full bg-[#ffca3a]" />
                 </div>
                 <div className="text-xs opacity-50">52:00</div>
               </div>
               <div className="flex justify-center gap-6 items-center">
                  <div className="w-8 h-8 rounded-full border border-white/30" />
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">▶</div>
                  <div className="w-8 h-8 rounded-full border border-white/30" />
               </div>
             </div>
          </div>
        </Container>
      </div>
    );
  }

  // Variation 14: Course/Learning Header
  if (variation === 14) {
    return (
      <div className="w-full h-full flex bg-white">
        <div className="w-1/2 p-12 flex flex-col justify-center border-r border-gray-100">
           <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold mb-6 self-start">BEGINNER COURSE</div>
           <TitleBlock width="90%" className="h-10 mb-4" />
           <TextBlock lines={4} className="mb-8" />
           <div className="space-y-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center gap-3 p-3 rounded bg-gray-50 border border-gray-100">
                 <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white font-bold">{i}</div>
                 <div className="w-2/3 h-2 bg-gray-400 rounded" />
                 <div className="ml-auto text-xs text-gray-400">10m</div>
               </div>
             ))}
           </div>
           <ButtonBlock className="mt-8 w-full" />
        </div>
        <div className="w-1/2 bg-gray-900 flex items-center justify-center relative group">
           <ImageBlock className="w-full h-full opacity-60" text="PREVIEW" />
           <div className="absolute w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
           </div>
        </div>
      </div>
    );
  }

  // Variation 15: Countdown/Launch
  if (variation === 15) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white p-8">
         <Container className="text-center">
            <div className="text-[#ff595e] tracking-widest text-sm mb-6 uppercase">Something big is coming</div>
            <TitleBlock width="60%" className="mx-auto bg-white mb-12 h-12" />
            
            <div className="flex justify-center gap-4 mb-12">
               {[1, 2, 3, 4].map((t, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl font-mono font-bold border border-gray-700">
                     {['02', '14', '36', '59'][i]}
                   </div>
                   <div className="text-xs text-gray-500 mt-2 uppercase">{['Days', 'Hours', 'Mins', 'Secs'][i]}</div>
                 </div>
               ))}
            </div>

            <div className="max-w-md mx-auto relative">
               <input disabled className="w-full h-12 bg-transparent border border-gray-600 rounded px-4 text-sm" placeholder="Notify me when it launches" />
               <div className="absolute right-1 top-1 bottom-1 bg-white text-black px-4 flex items-center rounded text-xs font-bold cursor-pointer">JOIN</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 16: eCommerce Product Focus
  if (variation === 16) {
    return (
      <div className="w-full h-full flex items-center bg-[#f0f0f0]">
         <Container className="flex items-center gap-8">
            <div className="w-1/2 relative">
               <div className="aspect-square bg-white rounded-3xl shadow-xl p-8 relative">
                  <ImageBlock className="w-full h-full" text="PRODUCT" />
                  
                  {/* Hotspots */}
                  <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#1982c4] rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform shadow-lg">
                     <div className="absolute top-0 left-6 w-32 bg-white text-xs p-2 rounded shadow-lg opacity-0 hover:opacity-100 pointer-events-none">Feature Detail</div>
                  </div>
                  <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-[#1982c4] rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform shadow-lg" />
               </div>
            </div>
            <div className="w-1/2 pl-8">
               <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-bold">$299.00</div>
                  <div className="text-sm text-gray-400 line-through">$399.00</div>
                  <div className="px-2 py-1 bg-red-100 text-red-500 text-xs font-bold rounded">SAVE 25%</div>
               </div>
               <TitleBlock width="90%" className="mb-4" />
               <TextBlock lines={4} className="mb-8" />
               <div className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 ring-2 ring-offset-2 ring-gray-300" />
                  <div className="w-8 h-8 rounded-full bg-blue-800 border-2 border-transparent" />
                  <div className="w-8 h-8 rounded-full bg-green-800 border-2 border-transparent" />
               </div>
               <div className="flex gap-4">
                  <ButtonBlock className="flex-1" />
                  <div className="w-12 h-10 border border-gray-300 flex items-center justify-center rounded hover:bg-white">♥</div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 17: Search Focused Hero
  if (variation === 17) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1982c4] p-8">
        <Container className="text-center text-white max-w-2xl">
           <TitleBlock width="60%" className="mx-auto bg-white mb-8 h-12" />
           <div className="relative w-full">
              <div className="w-full h-16 bg-white rounded-full shadow-lg flex items-center px-6">
                 <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4" />
                 <div className="flex-1 h-4 bg-gray-100 rounded" />
                 <ButtonBlock className="ml-4 h-10 px-8 rounded-full" />
              </div>
           </div>
           <div className="mt-8 flex justify-center gap-4 text-xs opacity-70">
              <span>Popular:</span>
              <span className="underline">Design</span>
              <span className="underline">Code</span>
              <span className="underline">Marketing</span>
           </div>
        </Container>
      </div>
    );
  }
  
  // Variation 18: 3-Column Product Showcase
  if (variation === 18) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <Container className="grid grid-cols-3 gap-8 items-center">
           <div className="text-right space-y-8">
              <div>
                 <TitleBlock width="80%" className="ml-auto" />
                 <TextBlock lines={2} align="right" />
              </div>
              <div>
                 <TitleBlock width="60%" className="ml-auto" />
                 <TextBlock lines={2} align="right" />
              </div>
           </div>
           <div className="h-full py-4">
              <ImageBlock className="w-full h-full rounded-full border-4 border-gray-50 shadow-xl" text="PRODUCT" />
           </div>
           <div className="space-y-8">
              <div>
                 <TitleBlock width="80%" />
                 <TextBlock lines={2} />
              </div>
              <div>
                 <TitleBlock width="60%" />
                 <TextBlock lines={2} />
              </div>
           </div>
        </Container>
      </div>
    );
  }

  // Variation 19: Dashboard / App Interface
  if (variation === 19) {
    return (
      <div className="w-full h-full flex bg-[#1a1a1a] overflow-hidden font-sans">
         <div className="w-64 flex-shrink-0 h-full p-6 flex flex-col border-r border-gray-800">
            <div className="flex items-center gap-3 mb-10">
               <div className="w-8 h-8 bg-[#1982c4] rounded-lg" />
               <div className="w-24 h-3 bg-gray-600 rounded" />
            </div>
            <div className="space-y-6 flex-1">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 cursor-pointer">
                     <div className="w-5 h-5 bg-gray-700 rounded" />
                     <div className="w-20 h-2 bg-gray-700 rounded" />
                  </div>
               ))}
            </div>
            <div className="pt-6 border-t border-gray-800 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600" />
               <div>
                  <div className="w-20 h-2 bg-gray-500 mb-2 rounded" />
                  <div className="w-12 h-2 bg-gray-700 rounded" />
               </div>
            </div>
         </div>
         
         <div className="flex-1 h-full bg-[#f4f4f4] m-4 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
               <div className="w-64 h-8 bg-gray-100 rounded-full flex items-center px-4">
                  <div className="w-4 h-4 bg-gray-300 rounded-full" />
               </div>
               <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full" />
                  <div className="w-8 h-8 bg-gray-100 rounded-full" />
               </div>
            </div>
            
            <div className="flex-1 p-8 flex items-center">
               <div className="w-1/2 pr-8 space-y-6">
                  <div className="text-xs font-bold text-[#1982c4] uppercase tracking-wider">Dashboard V2.0</div>
                  <TitleBlock width="90%" className="h-10" />
                  <TextBlock lines={3} />
                  <div className="flex gap-3 pt-4">
                     <ButtonBlock />
                     <div className="h-10 px-6 flex items-center border border-gray-300 rounded text-sm font-bold text-gray-500">DOCS</div>
                  </div>
               </div>
               <div className="w-1/2 h-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative">
                   <div className="w-full h-full bg-gray-50 rounded flex items-end justify-between p-4 gap-2">
                      {[40, 70, 50, 90, 60, 80].map((h, i) => (
                         <div key={i} className="w-full bg-[#1982c4] opacity-80 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                   </div>
                   <div className="absolute top-8 -left-8 bg-white p-4 rounded-lg shadow-lg border border-gray-100 w-40">
                      <div className="flex justify-between items-center mb-2">
                         <div className="w-3 h-3 bg-green-400 rounded-full" />
                         <div className="w-8 h-2 bg-gray-200" />
                      </div>
                      <div className="w-full h-2 bg-gray-100 mb-1" />
                      <div className="w-2/3 h-2 bg-gray-100" />
                   </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Variation 20: Just Video/Media
  if (variation === 20) {
    return (
      <div className="w-full h-full relative bg-black flex items-center justify-center group cursor-pointer">
         <ImageBlock className="w-full h-full opacity-40" text="CINEMATIC VIDEO" />
         <div className="absolute w-24 h-24 rounded-full border-2 border-white flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
         </div>
         <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
               <div className="text-white text-xs tracking-widest mb-2">NOW PLAYING</div>
               <TitleBlock width="300px" className="bg-white" />
            </div>
            <div className="flex gap-2">
               <div className="w-12 h-1 bg-white" />
               <div className="w-12 h-1 bg-gray-600" />
               <div className="w-12 h-1 bg-gray-600" />
            </div>
         </div>
      </div>
    );
  }

  // Variation 21: Overlapping Card
  if (variation === 21) {
    return (
      <div className="w-full h-full relative bg-gray-50 flex flex-col">
        <div className="h-1/2 bg-[#1982c4] w-full" />
        <Container className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-4xl flex gap-8 items-center">
             <div className="w-1/2 space-y-6">
                <TitleBlock width="90%" />
                <TextBlock lines={4} />
                <ButtonBlock />
             </div>
             <div className="w-1/2 h-64">
                <ImageBlock className="w-full h-full rounded-lg" text="FEATURE IMAGE" />
             </div>
          </div>
        </Container>
      </div>
    );
  }

  // Variation 22: Dual Device Showcase
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center bg-white overflow-hidden">
           <Container className="flex items-center gap-8">
              <div className="w-1/2 space-y-6 z-10">
                 <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">MOBILE APP</div>
                 <TitleBlock width="80%" />
                 <TextBlock lines={3} />
                 <div className="flex gap-4">
                    <div className="w-32 h-10 bg-black rounded flex items-center justify-center text-white text-xs font-bold">App Store</div>
                    <div className="w-32 h-10 bg-black rounded flex items-center justify-center text-white text-xs font-bold">Google Play</div>
                 </div>
              </div>
              <div className="w-1/2 relative h-96">
                 <div className="absolute top-0 right-0 w-48 h-80 bg-gray-200 rounded-[2rem] border-4 border-gray-800 shadow-xl transform rotate-6 z-10 flex flex-col p-2">
                    <div className="w-full h-full bg-white rounded-xl overflow-hidden"><ImageBlock className="w-full h-full" text="APP 1" /></div>
                 </div>
                 <div className="absolute top-12 right-32 w-48 h-80 bg-gray-200 rounded-[2rem] border-4 border-gray-800 shadow-xl transform -rotate-6 flex flex-col p-2">
                    <div className="w-full h-full bg-white rounded-xl overflow-hidden"><ImageBlock className="w-full h-full" text="APP 2" /></div>
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 23: Centered Search Hero
  if (variation === 23) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
           <div className="w-24 h-24 bg-gray-900 rounded-full mb-8 flex items-center justify-center text-white font-bold text-2xl">L</div>
           <div className="w-full max-w-2xl px-4">
              <div className="w-full h-14 rounded-full border border-gray-200 shadow-lg flex items-center px-6 gap-4 hover:shadow-xl transition-shadow cursor-text">
                 <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                 <div className="h-4 bg-gray-100 w-1/3 rounded" />
              </div>
           </div>
           <div className="mt-8 flex gap-4">
              <ButtonBlock className="bg-gray-100 text-gray-600 border-none shadow-none hover:bg-gray-200" />
              <ButtonBlock className="bg-gray-100 text-gray-600 border-none shadow-none hover:bg-gray-200" />
           </div>
        </div>
     );
  }

  // Variation 24: Article/News Header
  if (variation === 24) {
     return (
        <div className="w-full h-full bg-white p-8 flex flex-col">
           <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-8">
              <div className="text-4xl font-black italic">THE DAILY NEWS</div>
              <div className="text-xs font-mono">VOL. 99 • TUESDAY</div>
           </div>
           <div className="flex-1 flex gap-8">
              <div className="w-2/3 border-r border-gray-200 pr-8">
                 <TitleBlock width="90%" className="h-16 mb-4" />
                 <ImageBlock className="w-full h-64 mb-4" text="LEAD STORY" />
                 <div className="columns-2 gap-8">
                    <TextBlock lines={6} />
                    <TextBlock lines={6} />
                 </div>
              </div>
              <div className="w-1/3 flex flex-col gap-8">
                 <div className="border-b border-gray-200 pb-4">
                    <div className="text-xs font-bold text-red-600 mb-2">BREAKING</div>
                    <TextBlock lines={3} />
                 </div>
                 <div className="border-b border-gray-200 pb-4">
                    <div className="text-xs font-bold text-blue-600 mb-2">OPINION</div>
                    <TextBlock lines={3} />
                 </div>
                 <div className="bg-gray-100 p-4 rounded text-center">
                    <div className="text-xs font-bold mb-2">SUBSCRIBE NOW</div>
                    <ButtonBlock className="w-full scale-75" />
                 </div>
              </div>
           </div>
        </div>
     );
  }

  // Variation 25: Split with Floating Elements
  if (variation === 25) {
     return (
        <div className="w-full h-full flex items-center bg-[#1982c4] text-white overflow-hidden relative">
           <Container className="flex items-center relative z-10">
              <div className="w-1/2">
                 <div className="w-16 h-2 bg-[#ffca3a] mb-6" />
                 <TitleBlock width="80%" className="bg-white" />
                 <TextBlock lines={4} className="opacity-80 mt-6" />
                 <div className="mt-8 flex gap-4 items-center">
                    <ButtonBlock className="bg-white text-[#1982c4]" />
                    <div className="text-sm underline cursor-pointer">Learn More</div>
                 </div>
              </div>
              <div className="w-1/2 relative h-full flex items-center justify-center">
                 <div className="relative w-80 h-80">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 backdrop-blur-md rounded-full" />
                    <div className="absolute bottom-0 left-10 w-48 h-48 bg-[#ff595e] rounded-full mix-blend-multiply opacity-80" />
                    <div className="absolute top-10 left-0 w-32 h-32 bg-[#ffca3a] rounded-full mix-blend-multiply opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <ImageBlock className="w-64 h-40 bg-white shadow-2xl rounded-lg transform -rotate-6" text="UI CARD" />
                    </div>
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 26: Gradient Mesh
  if (variation === 26) {
    return (
      <div className="w-full h-full relative bg-white flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff99c8] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#a9def9] rounded-full blur-[100px] opacity-60" />
        <Container className="relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white mb-6 text-sm font-bold text-gray-600">
             New Features Available
          </div>
          <TitleBlock width="70%" className="mx-auto h-16 mb-6" />
          <TextBlock lines={3} align="center" className="mx-auto w-1/2" />
          <div className="mt-8 flex justify-center gap-4">
             <ButtonBlock className="shadow-lg" />
             <ButtonBlock variant="secondary" className="bg-white/50 backdrop-blur-sm" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 27: Text Frame
  if (variation === 27) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0] p-8">
        <div className="relative w-full max-w-4xl aspect-[21/9] bg-white p-2">
           <div className="absolute inset-0 border-[16px] border-white z-20 pointer-events-none" />
           <ImageBlock className="w-full h-full" text="MAIN VISUAL" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white p-8 text-center shadow-xl max-w-md">
              <TitleBlock width="100%" className="mx-auto mb-4" />
              <TextBlock lines={3} align="center" />
              <ButtonBlock className="mx-auto mt-6" />
           </div>
        </div>
      </div>
    );
  }

  // Variation 28: Sidebar Nav Hero
  if (variation === 28) {
    return (
      <div className="w-full h-full flex bg-white">
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-8 flex flex-col justify-between hidden md:flex">
           <div className="w-8 h-8 bg-black rounded" />
           <div className="space-y-4">
              <div className="h-2 w-16 bg-gray-800 rounded" />
              <div className="h-2 w-24 bg-gray-400 rounded" />
              <div className="h-2 w-20 bg-gray-400 rounded" />
              <div className="h-2 w-12 bg-gray-400 rounded" />
           </div>
           <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
        <div className="flex-1 p-12 flex items-center">
           <div className="max-w-xl space-y-8">
              <div className="h-1 w-20 bg-[#1982c4]" />
              <TitleBlock width="90%" className="h-16" />
              <TextBlock lines={4} />
              <div className="flex gap-4 items-center">
                 <ButtonBlock />
                 <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-xl">▶</div>
              </div>
           </div>
        </div>
        <div className="w-1/3 bg-gray-100 hidden lg:block">
           <ImageBlock className="w-full h-full" text="SIDE VISUAL" />
        </div>
      </div>
    );
  }

  // Variation 29: Bottom Aligned
  if (variation === 29) {
    return (
      <div className="w-full h-full flex flex-col relative">
        <div className="absolute inset-0 pb-32">
           <ImageBlock className="w-full h-full" text="IMMERSIVE BG" />
        </div>
        <div className="mt-auto relative z-10 bg-white border-t border-gray-200 p-8">
           <Container className="flex justify-between items-end">
              <div className="w-1/2">
                 <TitleBlock width="80%" className="h-10 mb-2" />
                 <TextBlock lines={2} />
              </div>
              <div className="flex gap-4">
                 <ButtonBlock variant="secondary" />
                 <ButtonBlock />
              </div>
           </Container>
        </div>
      </div>
    );
  }

  // Variation 30: Dual Image Split (Before/After)
  if (variation === 30) {
    return (
      <div className="w-full h-full flex relative">
         <div className="w-1/2 h-full relative group overflow-hidden">
            <ImageBlock className="w-full h-full transition-transform duration-700 group-hover:scale-105" text="CONCEPT A" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
               <div className="text-white text-3xl font-bold tracking-widest border-2 border-white px-6 py-3">WORK</div>
            </div>
         </div>
         <div className="w-1/2 h-full relative group overflow-hidden">
            <ImageBlock className="w-full h-full transition-transform duration-700 group-hover:scale-105" text="CONCEPT B" />
            <div className="absolute inset-0 bg-white/10 flex items-center justify-center group-hover:bg-transparent transition-colors">
               <div className="text-white text-3xl font-bold tracking-widest border-2 border-white px-6 py-3">PLAY</div>
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center font-serif italic text-xl z-10 shadow-xl">
            vs
         </div>
      </div>
    );
  }

  // Variation 31: Search Bar Dominant
  if (variation === 31) {
    return (
       <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          <div className="w-16 h-16 rounded-full bg-blue-500 mb-8" />
          <div className="w-full max-w-2xl px-4 relative">
             <div className="h-14 rounded-full border border-gray-200 shadow-lg flex items-center px-6 text-gray-400 hover:shadow-xl transition-shadow">
                <span className="mr-4">🔍</span>
                <span>Type to search...</span>
             </div>
             <div className="flex justify-center gap-4 mt-8">
                <ButtonBlock variant="secondary" className="bg-gray-50 border-transparent hover:bg-gray-100" />
                <ButtonBlock variant="secondary" className="bg-gray-50 border-transparent hover:bg-gray-100" />
             </div>
          </div>
       </div>
    );
  }

  // Variation 32: Dual Diagonal
  if (variation === 32) {
    return (
       <div className="w-full h-full relative overflow-hidden bg-white">
          <div className="absolute -top-1/4 -left-1/4 w-3/4 h-[150%] bg-gray-100 transform -rotate-12 border-r-8 border-white z-0">
             <ImageBlock className="w-full h-full opacity-50" />
          </div>
          <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-[150%] bg-gray-200 transform -rotate-12 border-l-8 border-white z-0">
             <ImageBlock className="w-full h-full opacity-50" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
             <div className="bg-white p-12 shadow-2xl rounded-xl text-center max-w-lg pointer-events-auto">
                <TitleBlock width="80%" className="mx-auto" />
                <TextBlock lines={3} align="center" className="mt-4" />
                <ButtonBlock className="mx-auto mt-6" />
             </div>
          </div>
       </div>
    );
  }

  // Variation 33: Sticky Scroll Effect (Simulated)
  if (variation === 33) {
    return (
       <div className="w-full h-full relative overflow-hidden">
          <ImageBlock className="absolute inset-0 w-full h-full" text="FIXED BACKGROUND" />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center p-12 overflow-hidden">
             <div className="text-center text-white space-y-32">
                <div className="opacity-40 scale-90">Scroll to explore</div>
                <div className="text-6xl font-bold tracking-tighter">THE FUTURE</div>
                <div className="opacity-40 scale-90">Keep going</div>
             </div>
          </div>
       </div>
    );
  }

  // Variation 34: Chat Bot Opener
  if (variation === 34) {
    return (
       <div className="w-full h-full bg-gray-50 flex flex-col justify-end p-8 items-center">
          <div className="w-full max-w-lg space-y-4 mb-8">
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600" />
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm">
                   Hi there! 👋 Welcome to our platform.
                </div>
             </div>
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600" />
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm">
                   How can we help you grow today?
                </div>
             </div>
          </div>
          <div className="w-full max-w-lg bg-white p-2 rounded-full shadow-lg border border-gray-200 flex gap-2">
             <div className="flex-1 h-10 bg-transparent flex items-center px-4 text-gray-400">Type a response...</div>
             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">↑</div>
          </div>
       </div>
    );
  }

  // Variation 35: Magazine Cover V2
  if (variation === 35) {
    return (
       <div className="w-full h-full relative bg-white border-[20px] border-white overflow-hidden">
          <ImageBlock className="w-full h-full" text="MODEL" />
          <div className="absolute top-8 left-8 text-6xl font-black tracking-tighter mix-blend-difference text-white">VOGUE</div>
          <div className="absolute bottom-8 right-8 flex flex-col items-end text-white mix-blend-difference">
             <div className="w-32 h-12 bg-black/20 backdrop-blur mb-4 flex items-center justify-center border border-white/50">
                <div className="h-8 w-24 bg-current opacity-50" /> {/* Barcode */}
             </div>
             <div className="text-4xl font-serif italic">Summer</div>
             <div className="text-sm tracking-widest uppercase">Collection 2024</div>
          </div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 space-y-8">
             <div className="bg-white/90 p-2 text-black text-sm font-bold w-32 text-center transform -rotate-2">TRENDING</div>
             <div className="bg-white/90 p-2 text-black text-sm font-bold w-40 text-center transform rotate-1">HOT PICKS</div>
          </div>
       </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Hero Variation {variation}</div>;
};
