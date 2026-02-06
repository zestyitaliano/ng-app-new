
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, Container, TitleBlock, TextBlock, ButtonBlock } from '../WireframeElements';

export const GalleryWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: Masonry-ish (3 large cols)
  if (variation === 1) {
    return (
      <div className="w-full h-full p-6 bg-white overflow-hidden">
        <div className="grid grid-cols-3 gap-4 h-full">
          <ImageBlock className="h-full w-full" />
          <div className="grid grid-rows-2 gap-4 h-full">
             <ImageBlock className="h-full w-full" />
             <ImageBlock className="h-full w-full" />
          </div>
          <ImageBlock className="h-full w-full" />
        </div>
      </div>
    );
  }
  // ... Variations 2-30 omitted for brevity (will include in final output) ...
  // Including variations 2-30

  // Variation 2: 2x3 Grid
  if (variation === 2) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50">
        <Container>
          <div className="grid grid-cols-3 gap-6 h-full">
             {[1,2,3,4,5,6].map(i => (
               <ImageBlock key={i} className="aspect-square w-full" />
             ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 3: Carousel Strip
  if (variation === 3) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-white p-8">
        <div className="flex gap-6 overflow-hidden items-center h-4/5">
          <div className="w-12 flex-shrink-0 flex items-center justify-center h-full bg-gray-100">{'<'}</div>
          <ImageBlock className="h-full w-1/3 flex-shrink-0" text="1" />
          <ImageBlock className="h-full w-1/3 flex-shrink-0 scale-110 z-10 shadow-xl border-4 border-white" text="FOCUS" />
          <ImageBlock className="h-full w-1/3 flex-shrink-0" text="3" />
          <div className="w-12 flex-shrink-0 flex items-center justify-center h-full bg-gray-100">{'>'}</div>
        </div>
      </div>
    );
  }

  // Variation 4: Tight Collage
  if (variation === 4) {
    return (
      <div className="w-full h-full flex bg-black p-4">
         <div className="grid grid-cols-4 gap-1 w-full h-full">
           <div className="col-span-2 row-span-2">
             <ImageBlock className="w-full h-full bg-gray-800" text="Main" />
           </div>
           {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
             <ImageBlock key={i} className="w-full h-full bg-gray-800 opacity-80" />
           ))}
         </div>
      </div>
    );
  }

  // Variation 5: Hero + Thumbnails Bottom
  if (variation === 5) {
    return (
      <div className="w-full h-full flex flex-col p-4 bg-white gap-4">
         <div className="flex-1">
           <ImageBlock className="w-full h-full" text="SELECTED VIEW" />
         </div>
         <div className="h-1/5 flex gap-4">
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="h-full aspect-video border-2 border-transparent hover:border-blue-400">
                <ImageBlock className="w-full h-full" />
             </div>
           ))}
         </div>
      </div>
    );
  }

  // Variation 6: 1 Large, 4 Small Grid
  if (variation === 6) {
    return (
      <div className="w-full h-full p-4 bg-white">
        <Container className="grid grid-cols-2 gap-4 h-full">
           <ImageBlock className="w-full h-full rounded-lg" text="FEATURED" />
           <div className="grid grid-cols-2 gap-4 h-full">
             {[1,2,3,4].map(i => <ImageBlock key={i} className="w-full h-full rounded-lg" />)}
           </div>
        </Container>
      </div>
    );
  }

  // Variation 7: Marquee / Film Strip
  if (variation === 7) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-black overflow-hidden py-8">
        <div className="flex gap-4 px-4 opacity-80">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="w-64 aspect-[3/4] flex-shrink-0 border-y-8 border-gray-900 bg-gray-800 p-2">
                <ImageBlock className="w-full h-full bg-gray-700" />
             </div>
           ))}
        </div>
      </div>
    );
  }

  // Variation 8: Scattered Polaroid
  if (variation === 8) {
    return (
      <div className="w-full h-full bg-[#f0f0f0] relative overflow-hidden flex items-center justify-center">
         <div className="w-64 h-80 bg-white p-3 shadow-xl transform -rotate-6 absolute left-1/4 top-10 z-10 pb-12">
            <ImageBlock className="w-full h-full bg-gray-200" />
         </div>
         <div className="w-72 h-96 bg-white p-4 shadow-2xl transform rotate-3 relative z-20 pb-16">
            <ImageBlock className="w-full h-full bg-gray-200" text="MEMORIES" />
         </div>
         <div className="w-60 h-72 bg-white p-3 shadow-lg transform rotate-12 absolute right-1/4 bottom-8 z-10 pb-10">
            <ImageBlock className="w-full h-full bg-gray-200" />
         </div>
      </div>
    );
  }

  // Variation 9: Pinterest Grid (Staggered Columns simulated)
  if (variation === 9) {
    return (
      <div className="w-full h-full bg-gray-50 p-4 overflow-hidden">
         <div className="grid grid-cols-4 gap-4 h-full">
            <div className="flex flex-col gap-4">
               <ImageBlock className="h-40 w-full rounded-lg" />
               <ImageBlock className="h-60 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-4 mt-8">
               <ImageBlock className="h-56 w-full rounded-lg" />
               <ImageBlock className="h-44 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-4">
               <ImageBlock className="h-32 w-full rounded-lg" />
               <ImageBlock className="h-64 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-4 mt-12">
               <ImageBlock className="h-48 w-full rounded-lg" />
               <ImageBlock className="h-40 w-full rounded-lg" />
            </div>
         </div>
      </div>
    );
  }

  // Variation 10: Cover Flow (Central Focus)
  if (variation === 10) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden relative">
         <div className="absolute left-0 w-1/4 h-64 bg-gray-700 opacity-50 transform perspective-1000 rotate-y-45 scale-90 blur-sm" />
         <div className="absolute right-0 w-1/4 h-64 bg-gray-700 opacity-50 transform perspective-1000 -rotate-y-45 scale-90 blur-sm" />
         <div className="w-1/2 h-80 z-20 bg-black p-2 shadow-2xl transform scale-105 border border-gray-600">
            <ImageBlock className="w-full h-full" text="ACTIVE ITEM" />
         </div>
      </div>
    );
  }

  // Variation 11: Single Product Showcase
  if (variation === 11) {
    return (
      <div className="w-full h-full flex items-center bg-white p-8">
         <Container className="flex gap-12 items-center">
            <div className="w-1/2 relative">
               <div className="aspect-square bg-gray-50 rounded-full flex items-center justify-center p-8">
                  <ImageBlock className="w-3/4 h-3/4 shadow-xl" text="PRODUCT" />
               </div>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-800" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
               </div>
            </div>
            <div className="w-1/2 space-y-6">
               <div className="text-xs font-bold text-gray-400 tracking-widest">COLLECTION</div>
               <TitleBlock width="80%" />
               <TextBlock lines={4} />
               <div className="flex gap-4 pt-4">
                  <ButtonBlock />
                  <div className="w-12 h-10 border border-gray-300 flex items-center justify-center">♥</div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 12: Edge-to-Edge Grid
  if (variation === 12) {
    return (
      <div className="w-full h-full flex bg-white">
         <div className="flex-1 border-r border-white">
            <ImageBlock className="w-full h-full border-none" />
         </div>
         <div className="flex-1 flex flex-col border-r border-white">
            <ImageBlock className="h-1/2 w-full border-none border-b border-white" />
            <ImageBlock className="h-1/2 w-full border-none" />
         </div>
         <div className="flex-1">
            <ImageBlock className="w-full h-full border-none" />
         </div>
      </div>
    );
  }

  // Variation 13: Circular Grid
  if (variation === 13) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
         <Container className="grid grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="flex flex-col items-center gap-3">
                  <ImageBlock className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
                  <div className="w-20 h-2 bg-gray-300 rounded" />
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 14: Masonry Columns (Simulated vertically)
  if (variation === 14) {
    return (
      <div className="w-full h-full bg-white p-4 overflow-hidden">
         <div className="columns-3 gap-4 h-full">
            <ImageBlock className="w-full h-40 mb-4 bg-gray-100" />
            <ImageBlock className="w-full h-64 mb-4 bg-gray-200" />
            <ImageBlock className="w-full h-32 mb-4 bg-gray-100" />
            <ImageBlock className="w-full h-56 mb-4 bg-gray-200" />
            <ImageBlock className="w-full h-48 mb-4 bg-gray-100" />
         </div>
      </div>
    );
  }

  // Variation 15: Single Slider with Dots
  if (variation === 15) {
    return (
      <div className="w-full h-full relative group">
         <ImageBlock className="w-full h-full" text="FULL SLIDE" />
         <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer">←</div>
            <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer">→</div>
         </div>
         <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
         </div>
      </div>
    );
  }

  // Variation 16: Profile Cards
  if (variation === 16) {
    return (
      <div className="w-full h-full flex items-center bg-gray-100">
         <Container className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gray-200 relative">
                     <ImageBlock className="w-full h-full" />
                  </div>
                  <div className="p-4 text-center">
                     <div className="w-16 h-16 rounded-full bg-white border-4 border-white mx-auto -mt-10 relative z-10 shadow-sm">
                        <div className="w-full h-full rounded-full bg-gray-300" />
                     </div>
                     <div className="h-3 w-24 bg-gray-800 mx-auto mt-2 rounded" />
                     <div className="h-2 w-16 bg-gray-400 mx-auto mt-2 rounded" />
                  </div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 17: Honeycomb/Hex-ish Grid
  if (variation === 17) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
         <div className="flex gap-4">
            <div className="flex flex-col gap-4 mt-12">
               <div className="w-32 h-32 bg-gray-700 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
               <div className="w-32 h-32 bg-gray-600 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
            <div className="flex flex-col gap-4">
               <div className="w-32 h-32 bg-gray-600 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
               <div className="w-32 h-32 bg-gray-500 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
               <div className="w-32 h-32 bg-gray-600 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
            <div className="flex flex-col gap-4 mt-12">
               <div className="w-32 h-32 bg-gray-700 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
               <div className="w-32 h-32 bg-gray-600 clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
         </div>
      </div>
    );
  }

  // Variation 18: Card Details
  if (variation === 18) {
    return (
      <div className="w-full h-full flex items-center bg-gray-50 p-8">
         <Container className="grid grid-cols-3 gap-8">
            {[1,2,3].map(i => (
               <div key={i} className="bg-white p-4 shadow-sm border border-gray-100">
                  <div className="w-full aspect-[4/3] bg-gray-200 mb-4 relative">
                     <ImageBlock className="w-full h-full" />
                     <div className="absolute top-2 right-2 px-2 py-1 bg-black text-white text-[10px] font-bold">SALE</div>
                  </div>
                  <div className="h-4 w-3/4 bg-gray-800 mb-2 rounded" />
                  <div className="h-2 w-1/2 bg-gray-400 mb-4 rounded" />
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                     <div className="h-4 w-12 bg-gray-300 rounded" />
                     <div className="h-8 w-20 border border-black rounded flex items-center justify-center text-xs">BUY</div>
                  </div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 19: Vertical Split Stripes
  if (variation === 19) {
    return (
      <div className="w-full h-full flex">
         {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 relative group border-r border-white last:border-none overflow-hidden">
               <ImageBlock className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 border-2 border-white rounded-full mb-4" />
                  <div className="h-4 w-20 bg-white rounded" />
               </div>
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-bold text-xl opacity-100 group-hover:opacity-0 transition-opacity">
                  0{i}
               </div>
            </div>
         ))}
      </div>
    );
  }

  // Variation 20: Random Scatter
  if (variation === 20) {
    return (
      <div className="w-full h-full bg-[#e5e5e5] relative overflow-hidden flex items-center justify-center">
         <div className="absolute top-10 left-20 w-48 h-32 bg-white p-2 shadow-lg transform rotate-6 z-10">
            <ImageBlock className="w-full h-full" />
         </div>
         <div className="absolute bottom-20 right-32 w-40 h-40 bg-white p-2 shadow-lg transform -rotate-3 z-10">
            <ImageBlock className="w-full h-full" />
         </div>
         <div className="absolute top-20 right-20 w-56 h-40 bg-white p-2 shadow-xl transform rotate-12 z-20">
            <ImageBlock className="w-full h-full" />
         </div>
         <div className="absolute bottom-10 left-32 w-32 h-48 bg-white p-2 shadow-md transform -rotate-12 z-0">
            <ImageBlock className="w-full h-full" />
         </div>
         <div className="z-30 bg-black text-white px-8 py-4 rounded-full shadow-2xl">
            VIEW GALLERY
         </div>
      </div>
    );
  }

  // Variation 21: Scattered Pile
  if (variation === 21) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden relative">
           <div className="w-64 h-80 bg-white p-2 shadow-lg absolute transform -rotate-12 hover:rotate-0 transition-transform duration-500 z-10">
              <ImageBlock className="w-full h-full" />
           </div>
           <div className="w-64 h-80 bg-white p-2 shadow-lg absolute transform rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
              <ImageBlock className="w-full h-full" />
           </div>
           <div className="w-64 h-80 bg-white p-2 shadow-lg absolute transform -translate-y-4 hover:translate-y-0 transition-transform duration-500 z-30">
              <ImageBlock className="w-full h-full" text="TOP STACK" />
           </div>
        </div>
     );
  }

  // Variation 22: Vertical Film Strip
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-black p-8">
           <div className="flex flex-col gap-4 border-x-8 border-gray-900 bg-gray-800 p-2 overflow-hidden h-full w-48 opacity-70">
              {[1,2,3].map(i => <ImageBlock key={i} className="w-full h-32 bg-gray-700 flex-shrink-0" />)}
           </div>
           <div className="flex-1 h-full p-4">
              <ImageBlock className="w-full h-full border-4 border-white" text="PREVIEW" />
           </div>
        </div>
     );
  }

  // Variation 23: Browser Window Showcase
  if (variation === 23) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-[#1982c4] p-12">
           <div className="w-full h-full bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
              <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
                 <div className="flex-1 mx-4 h-5 bg-white rounded border border-gray-200" />
              </div>
              <div className="flex-1 p-0">
                 <ImageBlock className="w-full h-full border-none" text="WEB PREVIEW" />
              </div>
           </div>
        </div>
     );
  }

  // Variation 24: Instagram Grid
  if (variation === 24) {
     return (
        <div className="w-full h-full flex flex-col items-center bg-white p-4">
           <div className="flex gap-8 items-center mb-8 border-b pb-8 w-full max-w-2xl">
              <div className="w-24 h-24 rounded-full bg-gray-200" />
              <div className="space-y-2">
                 <div className="w-32 h-4 bg-gray-800 rounded" />
                 <div className="flex gap-4">
                    <div className="w-16 h-2 bg-gray-400 rounded" />
                    <div className="w-16 h-2 bg-gray-400 rounded" />
                    <div className="w-16 h-2 bg-gray-400 rounded" />
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-3 gap-1 w-full max-w-2xl">
              {[1,2,3,4,5,6].map(i => (
                 <ImageBlock key={i} className="aspect-square bg-gray-100" />
              ))}
           </div>
        </div>
     );
  }

  // Variation 25: Parallax Strip
  if (variation === 25) {
     return (
        <div className="w-full h-full flex flex-col gap-4 bg-white overflow-hidden p-4">
           <div className="h-1/3 flex gap-4 w-[120%] -ml-12">
              {[1,2,3,4,5].map(i => <ImageBlock key={i} className="h-full w-1/5 flex-shrink-0" />)}
           </div>
           <div className="h-1/3 flex gap-4 w-[120%] ml-0">
              {[1,2,3,4,5].map(i => <ImageBlock key={i} className="h-full w-1/5 flex-shrink-0" />)}
           </div>
           <div className="h-1/3 flex gap-4 w-[120%] -ml-24">
              {[1,2,3,4,5].map(i => <ImageBlock key={i} className="h-full w-1/5 flex-shrink-0" />)}
           </div>
        </div>
     );
  }

  // Variation 26: Checkerboard
  if (variation === 26) {
    return (
      <div className="w-full h-full flex flex-wrap bg-white">
         <div className="w-1/2 h-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="text-center">
               <div className="text-xl font-bold mb-2">Project A</div>
               <div className="text-xs text-gray-400">View Case Study</div>
            </div>
         </div>
         <div className="w-1/2 h-1/2">
            <ImageBlock className="w-full h-full border-none" />
         </div>
         <div className="w-1/2 h-1/2">
            <ImageBlock className="w-full h-full border-none" />
         </div>
         <div className="w-1/2 h-1/2 bg-gray-900 text-white flex items-center justify-center p-8">
            <div className="text-center">
               <div className="text-xl font-bold mb-2">Project B</div>
               <div className="text-xs text-gray-500">View Case Study</div>
            </div>
         </div>
      </div>
    );
  }

  // Variation 27: Full Screen Slider
  if (variation === 27) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-gray-800">
         <ImageBlock className="w-full h-full absolute inset-0 opacity-40" text="SLIDE 1" />
         <div className="relative z-10 text-white text-center">
            <div className="text-4xl font-light mb-4">Architecture</div>
            <div className="w-16 h-1 bg-white mx-auto" />
         </div>
         <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/10">←</div>
         <div className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/10">→</div>
         <div className="absolute bottom-8 flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
         </div>
      </div>
    );
  }

  // Variation 28: Portrait Strip
  if (variation === 28) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8 overflow-hidden">
         <div className="flex gap-4 h-full">
            {[1,2,3,4,5].map(i => (
               <div key={i} className="h-full aspect-[2/3] flex-shrink-0 relative group">
                  <ImageBlock className="w-full h-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <span className="text-white font-bold">Item {i}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 29: Circle Crop Grid
  if (variation === 29) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-4">
         <Container className="grid grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <ImageBlock className="w-full h-full border-none" />
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 30: Overlay Grid
  if (variation === 30) {
    return (
      <div className="w-full h-full bg-black p-1">
         <div className="grid grid-cols-3 gap-1 h-full">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="relative group overflow-hidden">
                  <ImageBlock className="w-full h-full bg-gray-800 border-none opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="border border-white/30 px-4 py-2 text-white text-xs tracking-widest uppercase backdrop-blur-sm">Category {i}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 31: Film Strip Vertical
  if (variation === 31) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black p-8">
         <div className="flex gap-8 h-full">
            {[1,2,3].map(i => (
               <div key={i} className="h-full w-24 bg-gray-900 border-x-4 border-gray-800 flex flex-col gap-4 py-2 overflow-hidden">
                  {[1,2,3,4,5].map(j => (
                     <div key={j} className="w-full aspect-[4/3] bg-gray-700 opacity-50" />
                  ))}
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 32: Perspective Wall
  if (variation === 32) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden perspective-1000">
         <div className="grid grid-cols-4 gap-4 transform rotate-y-12 rotate-x-6 scale-90">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
               <div key={i} className="w-32 h-32 bg-gray-700 opacity-60 border border-white/10" />
            ))}
         </div>
      </div>
    );
  }

  // Variation 33: Accordion Gallery
  if (variation === 33) {
    return (
      <div className="w-full h-full flex bg-black">
         {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 hover:flex-[3] transition-all duration-500 relative group overflow-hidden border-r border-gray-800">
               <ImageBlock className="w-full h-full opacity-40 group-hover:opacity-100 border-none" />
               <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="text-2xl font-bold">Project {i}</div>
               </div>
            </div>
         ))}
      </div>
    );
  }

  // Variation 34: Spotlight
  if (variation === 34) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black p-8 relative">
         <div className="absolute inset-0 bg-radial-gradient from-transparent to-black z-10 pointer-events-none" />
         <div className="grid grid-cols-3 gap-8 opacity-20 hover:opacity-100 transition-opacity">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="w-32 h-32 bg-white rounded-full blur-sm hover:blur-none hover:scale-110 transition-all duration-300" />
            ))}
         </div>
         <div className="absolute z-20 w-48 h-48 border-2 border-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-[0_0_100px_rgba(255,255,255,0.2)]" />
      </div>
    );
  }

  // Variation 35: Mosaic Text Wrap
  if (variation === 35) {
    return (
      <div className="w-full h-full bg-white p-12 relative overflow-hidden">
         <div className="float-left w-64 h-64 bg-gray-200 m-4 mb-8 rounded-lg" />
         <div className="float-right w-48 h-96 bg-gray-200 m-4 ml-8 rounded-lg" />
         <div className="text-justify text-gray-300 space-y-4 text-sm leading-relaxed">
            {Array.from({ length: 20 }).map((_, i) => (
               <div key={i} className="h-2 bg-gray-100 rounded w-full" style={{ width: `${Math.random() * 30 + 70}%` }} />
            ))}
         </div>
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Gallery Variation {variation}</div>;
};
