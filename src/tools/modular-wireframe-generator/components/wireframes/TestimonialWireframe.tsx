
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, TextBlock, TitleBlock, Container, ButtonBlock } from '../WireframeElements';
import { COLORS } from '../../constants';

export const TestimonialWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: Single Large Quote Center
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#fcfcfc] border-y border-gray-200">
        <Container className="max-w-3xl flex flex-col items-center text-center space-y-6">
          <div className="text-6xl font-serif text-[#ff595e] opacity-30">“</div>
          <TextBlock lines={3} align="center" className="w-full scale-125" />
          <div className="flex items-center gap-3 mt-4">
             <div className="w-10 h-10 rounded-full bg-gray-300" />
             <div className="text-left">
               <div className="w-24 h-3 bg-gray-800 rounded mb-1" />
               <div className="w-16 h-2 bg-gray-400 rounded" />
             </div>
          </div>
        </Container>
      </div>
    );
  }

  // Variation 2: 2 Cards Side-by-Side
  if (variation === 2) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <Container className="grid grid-cols-2 gap-12">
          {[1, 2].map(i => (
            <div key={i} className="p-6 border-2 border-dashed border-gray-300 relative">
              <div className="absolute -top-4 left-6 bg-white px-2">
                 <div className="flex text-[#ffca3a] gap-1 text-xs">★★★★★</div>
              </div>
              <TextBlock lines={4} />
              <div className="flex items-center gap-3 mt-6 border-t pt-4">
                <ImageBlock className="w-10 h-10 rounded-full" />
                <div className="w-20 h-3 bg-gray-800" />
              </div>
            </div>
          ))}
        </Container>
      </div>
    );
  }

  // Variation 3: 3 Small Cards
  if (variation === 3) {
    return (
      <div className="w-full h-full flex items-center bg-[#1982c4] bg-opacity-5">
        <Container className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 shadow-sm border-l-4" style={{ borderColor: COLORS.accent }}>
              <div className="mb-4 text-xs font-bold text-gray-400">CUSTOMER STORY</div>
              <TextBlock lines={3} />
              <div className="mt-4 w-24 h-3 bg-gray-800 opacity-50" />
            </div>
          ))}
        </Container>
      </div>
    );
  }

  // Variation 4: Sidebar Quote (Image Left, Quote Right)
  if (variation === 4) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <div className="w-1/3 h-full">
           <ImageBlock className="w-full h-full" text="PHOTO" />
        </div>
        <div className="w-2/3 h-full flex items-center p-12 bg-gray-50">
           <div className="max-w-xl space-y-6">
             <div className="text-4xl font-bold text-gray-200">“</div>
             <TextBlock lines={4} />
             <div className="flex gap-2 items-center">
                <div className="w-12 h-px bg-gray-400" />
                <div className="w-32 h-3 bg-gray-800" />
             </div>
           </div>
        </div>
      </div>
    );
  }

  // Variation 5: Chat Bubble Grid
  if (variation === 5) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Container className="grid grid-cols-3 gap-8">
           {[1, 2, 3].map(i => (
             <div key={i} className="relative bg-white p-6 rounded-2xl rounded-bl-none shadow-sm mt-4">
                <TextBlock lines={2} />
                <div className="absolute -bottom-2 left-0 w-4 h-4 bg-white" /> {/* Bubble tail hack */}
                <div className="absolute -bottom-8 left-0 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-300" />
                   <div className="w-20 h-2 bg-gray-400" />
                </div>
             </div>
           ))}
        </Container>
      </div>
    );
  }

  // Variation 6: Review Summary
  if (variation === 6) {
    return (
      <div className="w-full h-full flex items-center bg-white">
        <Container className="flex gap-12 items-center">
           <div className="w-1/3 flex flex-col items-center justify-center bg-gray-50 p-8 rounded-xl">
              <div className="text-6xl font-bold text-gray-800">4.9</div>
              <div className="flex text-yellow-400 gap-1 my-2">★★★★★</div>
              <div className="text-sm text-gray-500">2,304 Reviews</div>
           </div>
           <div className="w-2/3 space-y-3">
              {[5,4,3,2,1].map(stars => (
                <div key={stars} className="flex items-center gap-4">
                   <span className="w-4 text-sm font-bold">{stars}</span>
                   <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${stars * 18}%` }} />
                   </div>
                   <span className="w-8 text-xs text-gray-400 text-right">{stars * 12}%</span>
                </div>
              ))}
           </div>
        </Container>
      </div>
    );
  }

  // Variation 7: Avatar Grid
  if (variation === 7) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-900 text-white p-8">
        <TitleBlock width="40%" className="bg-white mx-auto mb-12" />
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
           {[1,2,3,4,5,6,7,8,9,10].map(i => (
             <div key={i} className="w-16 h-16 rounded-full border-2 border-gray-700 bg-gray-800 hover:border-white transition-colors cursor-pointer relative group">
                {i === 1 && <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded whitespace-nowrap opacity-100">"Amazing work!"</div>}
             </div>
           ))}
        </div>
      </div>
    );
  }

  // Variation 8: Large Card Stack
  if (variation === 8) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden">
         <div className="w-[600px] h-64 relative">
            <div className="absolute top-0 left-8 right-8 bottom-4 bg-gray-200 rounded-xl shadow-sm transform scale-95 -translate-y-4 opacity-60" />
            <div className="absolute top-2 left-4 right-4 bottom-2 bg-gray-300 rounded-xl shadow-sm transform scale-98 -translate-y-2 opacity-80" />
            <div className="absolute inset-0 bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col justify-center items-center text-center">
               <div className="w-12 h-12 rounded-full bg-blue-100 mb-4" />
               <TextBlock lines={3} align="center" />
               <div className="mt-4 font-bold text-gray-800">Jane Doe, CEO</div>
            </div>
         </div>
      </div>
    );
  }

  // Variation 9: Social Media Cards
  if (variation === 9) {
    return (
      <div className="w-full h-full flex items-center bg-white">
         <Container className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
               <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                     <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="w-20 h-2 bg-gray-300" />
                     </div>
                     <div className="w-4 h-4 bg-blue-400 rounded-full opacity-50" />
                  </div>
                  <TextBlock lines={2} />
                  <div className="mt-3 text-xs text-gray-400">#greatservice #design</div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 10: Video Testimonials
  if (variation === 10) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
         <Container className="text-center">
            <TitleBlock width="30%" className="mx-auto mb-8" />
            <div className="flex gap-6 justify-center">
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-64 aspect-[9/16] bg-gray-200 rounded-2xl relative overflow-hidden group">
                     <ImageBlock className="w-full h-full" text="" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center pl-1 shadow-lg">▶</div>
                     </div>
                     <div className="absolute bottom-4 left-4 text-left">
                        <div className="w-24 h-2 bg-white mb-1" />
                        <div className="w-16 h-2 bg-white/70" />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
    );
  }

  // Variation 11: Sidebar Slider
  if (variation === 11) {
    return (
      <div className="w-full h-full flex items-center bg-white">
         <Container className="flex">
            <div className="w-1/3 border-r border-gray-100 pr-8 flex flex-col justify-center">
               <div className="text-4xl font-serif text-[#1982c4] mb-4">Clients Love Us.</div>
               <div className="flex gap-2">
                  <div className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-full">←</div>
                  <div className="w-10 h-10 border border-black bg-black text-white flex items-center justify-center rounded-full">→</div>
               </div>
            </div>
            <div className="w-2/3 pl-12 flex items-center">
               <div className="space-y-6">
                  <div className="text-2xl font-light italic text-gray-600">"This is absolutely the best service we have ever used. Highly recommended for everyone."</div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gray-200" />
                     <div>
                        <div className="w-32 h-3 bg-gray-800 mb-1" />
                        <div className="w-20 h-2 bg-gray-400" />
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 12: Ticker Tape
  if (variation === 12) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-[#ffca3a] overflow-hidden">
         <div className="flex gap-12 items-center opacity-80 whitespace-nowrap -ml-20">
            {[1,2,3,4,5].map(i => (
               <div key={i} className="flex items-center gap-4 text-black font-bold text-2xl">
                  <span>"INCREDIBLE RESULTS"</span>
                  <span className="text-4xl">•</span>
                  <span>"FAST SHIPPING"</span>
                  <span className="text-4xl">•</span>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 13: Tweet Grid (Masonry)
  if (variation === 13) {
    return (
      <div className="w-full h-full bg-white p-8 overflow-hidden">
         <div className="columns-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="break-inside-avoid mb-6 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-8 h-8 rounded-full bg-gray-200" />
                     <div className="flex-1">
                        <div className="w-16 h-2 bg-gray-800 rounded mb-1" />
                        <div className="w-12 h-2 bg-gray-400 rounded" />
                     </div>
                     <div className="text-blue-400 text-xs">@</div>
                  </div>
                  <TextBlock lines={2 + (i % 2)} />
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 14: Video Grid Rectangles
  if (variation === 14) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-black text-white p-8">
           <Container className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                 <div key={i} className="aspect-video bg-gray-800 rounded-lg relative flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">▶</div>
                    <div className="absolute bottom-4 left-4 right-4">
                       <div className="w-3/4 h-2 bg-white/80 rounded mb-1" />
                       <div className="w-1/2 h-2 bg-white/50 rounded" />
                    </div>
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 15: Sticky Sidebar + List
  if (variation === 15) {
     return (
        <div className="w-full h-full flex bg-white">
           <div className="w-1/3 bg-gray-50 p-12 flex flex-col justify-center border-r border-gray-100">
              <div className="text-sm font-bold text-gray-400 uppercase mb-4">Community</div>
              <TitleBlock width="80%" />
              <div className="mt-8 flex gap-2">
                 <ButtonBlock variant="primary" className="text-xs" />
              </div>
           </div>
           <div className="w-2/3 p-12 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="space-y-8">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4 opacity-80">
                       <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                       <div className="space-y-2">
                          <TextBlock lines={3} />
                          <div className="w-24 h-2 bg-gray-400 rounded" />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
           </div>
        </div>
     );
  }

  // Variation 16: Logo Wall + Big Quote
  if (variation === 16) {
     return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8 text-center">
           <div className="flex gap-8 opacity-40 grayscale mb-12">
              {[1,2,3,4,5].map(i => <div key={i} className="w-20 h-8 bg-gray-300 rounded" />)}
           </div>
           <div className="max-w-2xl relative">
              <div className="text-6xl text-gray-100 absolute -top-8 -left-8">“</div>
              <TextBlock lines={3} align="center" className="scale-110" />
              <div className="mt-8 flex justify-center items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-gray-200" />
                 <div className="w-24 h-2 bg-gray-800 rounded" />
              </div>
           </div>
        </div>
     );
  }

  // Variation 17: Audio Player Testimonials
  if (variation === 17) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 p-8">
           <Container className="grid grid-cols-2 gap-8">
              {[1, 2].map(i => (
                 <div key={i} className="bg-gray-700 rounded-full p-4 flex items-center gap-4 shadow-lg border border-gray-600">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">▶</div>
                    <div className="flex-1 flex items-center gap-1 h-8">
                       {[...Array(20)].map((_, j) => (
                          <div key={j} className="w-1 bg-white rounded-full opacity-60" style={{ height: `${Math.random() * 100}%` }} />
                       ))}
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full" />
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 18: Chat Interface
  if (variation === 18) {
     return (
        <div className="w-full h-full flex justify-center bg-gray-50 p-8">
           <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-100 p-3 border-b border-gray-200 text-xs font-bold text-gray-500 text-center">Community Chat</div>
              <div className="flex-1 p-4 space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100" />
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm w-2/3">
                       <div className="w-full h-2 bg-gray-300 rounded mb-1" />
                       <div className="w-2/3 h-2 bg-gray-300 rounded" />
                    </div>
                 </div>
                 <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-green-100" />
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-sm w-2/3">
                       <div className="w-full h-2 bg-white/40 rounded mb-1" />
                       <div className="w-3/4 h-2 bg-white/40 rounded" />
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100" />
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm w-1/2">
                       <div className="w-full h-2 bg-gray-300 rounded" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
     );
  }

  // Variation 19: Trust Badges
  if (variation === 19) {
     return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
           <div className="text-center mb-8">
              <TitleBlock width="40%" className="mx-auto" />
           </div>
           <div className="flex gap-12 justify-center items-center">
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 flex items-center justify-center text-center text-xs font-bold text-gray-400 p-2">
                 #1 RATED
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center text-center text-xs font-bold text-gray-400 p-2">
                 BEST CHOICE
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center text-center text-xs font-bold text-gray-400 p-2">
                 VERIFIED
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center text-center text-xs font-bold text-gray-400 p-2">
                 2024 WINNER
              </div>
           </div>
        </div>
     );
  }

  // Variation 20: Vertical Slider
  if (variation === 20) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden">
           <div className="flex flex-col items-center gap-6 opacity-40 scale-90 blur-[1px]">
              <div className="w-64 h-2 bg-gray-300 rounded" />
              <div className="w-48 h-2 bg-gray-300 rounded" />
           </div>
           <div className="my-8 p-8 bg-white shadow-xl rounded-xl max-w-lg text-center transform scale-110 z-10 border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto -mt-16 border-4 border-white mb-6" />
              <TextBlock lines={3} align="center" />
              <div className="mt-4 font-bold text-[#1982c4]">Jane Doe</div>
              <div className="text-xs text-gray-400">Director</div>
           </div>
           <div className="flex flex-col items-center gap-6 opacity-40 scale-90 blur-[1px]">
              <div className="w-64 h-2 bg-gray-300 rounded" />
              <div className="w-48 h-2 bg-gray-300 rounded" />
           </div>
        </div>
     );
  }

  // Variation 21: Comic Bubbles
  if (variation === 21) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-yellow-50 p-8">
           <div className="relative">
              <div className="absolute -top-16 -left-12 w-32 h-24 bg-white border-2 border-black rounded-[50%] flex items-center justify-center p-4 text-xs text-center z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 "WOW!"
              </div>
              <div className="w-64 h-48 bg-white border-4 border-black p-6 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20 relative">
                 <TextBlock lines={3} align="center" />
                 <div className="mt-4 font-bold">SUPER FAN</div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-40 h-32 bg-white border-2 border-black rounded-[40%] flex items-center justify-center p-4 text-xs text-center z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 "Just Amazing."
              </div>
           </div>
        </div>
     );
  }

  // Variation 22: Award Badge & Quote
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <Container className="flex items-center gap-12">
              <div className="w-1/3 flex justify-center">
                 <div className="w-40 h-40 bg-[#ffca3a] rounded-full flex items-center justify-center relative border-8 border-double border-yellow-200">
                    <div className="text-center font-bold text-xs uppercase tracking-widest text-black">
                       Top Rated<br/>2024
                    </div>
                    <div className="absolute -bottom-4 bg-red-500 text-white text-[10px] px-4 py-1 rounded-full shadow-md">WINNER</div>
                 </div>
              </div>
              <div className="w-2/3 border-l-4 border-gray-100 pl-8">
                 <div className="text-3xl font-serif text-gray-400 italic mb-6">"We have never seen results like this before. It's truly a game changer for our industry."</div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="w-32 h-2 bg-gray-800 rounded" />
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 23: Dark Cards Neon
  if (variation === 23) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-8">
           <div className="grid grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                 <div key={i} className="bg-black border border-gray-800 p-6 rounded-lg relative overflow-hidden group hover:border-[#ff595e] transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff595e] to-transparent opacity-50" />
                    <div className="w-8 h-8 rounded-full bg-gray-800 mb-4 border border-gray-700" />
                    <div className="space-y-2 opacity-60">
                       <div className="w-full h-2 bg-white rounded" />
                       <div className="w-2/3 h-2 bg-white rounded" />
                    </div>
                 </div>
              ))}
           </div>
        </div>
     );
  }

  // Variation 24: Side-by-side Case Study
  if (variation === 24) {
     return (
        <div className="w-full h-full flex items-center bg-white border-y border-gray-100">
           <div className="w-1/2 p-12 bg-gray-50 flex flex-col justify-center border-r border-gray-200">
              <div className="text-xs font-bold text-red-500 mb-2">BEFORE</div>
              <TextBlock lines={4} />
              <div className="mt-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl font-bold">☹</div>
           </div>
           <div className="w-1/2 p-12 bg-white flex flex-col justify-center">
              <div className="text-xs font-bold text-green-500 mb-2">AFTER</div>
              <TextBlock lines={4} />
              <div className="mt-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl font-bold">☺</div>
           </div>
        </div>
     );
  }

  // Variation 25: Single Tweet Card
  if (variation === 25) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-[#1DA1F2] p-8">
           <div className="bg-white rounded-xl p-8 max-w-xl shadow-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div>
                       <div className="w-32 h-3 bg-gray-800 rounded mb-1" />
                       <div className="w-20 h-2 bg-gray-400 rounded" />
                    </div>
                 </div>
                 <div className="w-6 h-6 bg-[#1DA1F2] rounded-full opacity-50" />
              </div>
              <TextBlock lines={3} className="mb-6 scale-110 origin-top-left" />
              <div className="text-xs text-gray-400 border-t pt-4 flex gap-6">
                 <span>12:45 PM • Oct 21, 2024</span>
                 <span><strong>1.2K</strong> Retweets</span>
                 <span><strong>4.5K</strong> Likes</span>
              </div>
           </div>
        </div>
     );
  }

  // Variation 26: Floating Heads
  if (variation === 26) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden relative">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] border border-gray-100 rounded-full" />
         </div>
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-gray-100 rounded-full" />
         </div>
         <Container className="text-center relative z-10 bg-white/80 p-8 backdrop-blur-sm rounded-xl border border-gray-50 shadow-sm max-w-lg">
            <TitleBlock width="60%" className="mx-auto mb-4" />
            <TextBlock lines={3} align="center" />
         </Container>
         {[1,2,3,4,5,6].map((i) => {
            const angle = i * 60;
            const radius = i % 2 === 0 ? 250 : 150;
            return (
               <div 
                  key={i} 
                  className="absolute w-12 h-12 bg-gray-200 rounded-full border-2 border-white shadow-md z-0"
                  style={{ 
                     top: '50%', 
                     left: '50%', 
                     transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` 
                  }}
               />
            );
         })}
      </div>
    );
  }

  // Variation 27: Star Rating Focus
  if (variation === 27) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f8f9fa]">
         <Container className="flex gap-12 items-center justify-center">
            <div className="text-center">
               <div className="text-8xl font-black text-gray-800">5.0</div>
               <div className="flex gap-1 text-yellow-400 justify-center text-2xl mt-2">★★★★★</div>
               <div className="text-gray-400 mt-2">from 500+ reviews</div>
            </div>
            <div className="w-px h-32 bg-gray-300" />
            <div className="w-64 space-y-2">
               {[5,4,3,2,1].map((r) => (
                  <div key={r} className="flex items-center gap-2">
                     <span className="text-xs font-bold text-gray-500 w-3">{r}</span>
                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: r === 5 ? '90%' : '5%' }} />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
    );
  }

  // Variation 28: Detailed Case Study
  if (variation === 28) {
    return (
      <div className="w-full h-full flex bg-white border border-gray-200 m-8 shadow-xl max-w-5xl mx-auto rounded-lg overflow-hidden">
         <div className="w-1/3 bg-gray-50 p-8 border-r border-gray-200 flex flex-col justify-center">
            <div className="mb-6">
               <div className="text-xs font-bold text-gray-400 uppercase">Industry</div>
               <div className="font-bold">Fintech</div>
            </div>
            <div className="mb-6">
               <div className="text-xs font-bold text-gray-400 uppercase">Location</div>
               <div className="font-bold">New York, USA</div>
            </div>
            <div className="mb-6">
               <div className="text-xs font-bold text-gray-400 uppercase">Outcome</div>
               <div className="text-green-600 font-bold">+200% Growth</div>
            </div>
         </div>
         <div className="w-2/3 p-12 flex flex-col justify-center">
            <div className="text-2xl font-serif italic text-gray-700 mb-6">"This platform revolutionized our entire workflow. We can't imagine working without it."</div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-200 rounded-full" />
               <div>
                  <div className="w-32 h-3 bg-gray-800 rounded mb-1" />
                  <div className="w-24 h-2 bg-gray-400 rounded" />
               </div>
            </div>
            <ButtonBlock className="mt-8 self-start scale-90 origin-left" />
         </div>
      </div>
    );
  }

  // Variation 29: Horizontal Scroller (Loop)
  if (variation === 29) {
    return (
      <div className="w-full h-full flex items-center bg-gray-100 overflow-hidden relative">
         <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-gray-100 to-transparent z-10" />
         <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-gray-100 to-transparent z-10" />
         <div className="flex gap-6 px-12 opacity-60">
            {[1,2,3,4].map(i => (
               <div key={i} className="w-80 p-6 bg-white rounded-xl shadow-sm flex-shrink-0">
                  <TextBlock lines={3} />
                  <div className="mt-4 flex gap-3 items-center">
                     <div className="w-8 h-8 rounded-full bg-gray-200" />
                     <div className="w-24 h-2 bg-gray-400 rounded" />
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Variation 30: Minimal Text
  if (variation === 30) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-12">
         <div className="max-w-2xl text-center">
            <div className="text-3xl md:text-5xl font-light text-gray-800 leading-tight mb-8">
               "Simple. Powerful. Beautiful. It just works."
            </div>
            <div className="text-sm font-bold tracking-widest uppercase text-gray-400">— Satisfied Customer</div>
         </div>
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Testimonial Variation {variation}</div>;
};
