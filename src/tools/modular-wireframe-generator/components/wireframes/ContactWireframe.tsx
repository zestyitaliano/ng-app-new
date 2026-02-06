
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, TitleBlock, ButtonBlock, Container, TextBlock } from '../WireframeElements';
import { COLORS } from '../../constants';

export const ContactWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: Form Center
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Container className="max-w-lg w-full border p-8 shadow-sm">
          <TitleBlock width="50%" className="mx-auto mb-8" />
          <div className="space-y-4">
            <div className="h-10 border border-gray-300 w-full bg-gray-50" />
            <div className="h-10 border border-gray-300 w-full bg-gray-50" />
            <div className="h-24 border border-gray-300 w-full bg-gray-50" />
            <ButtonBlock className="w-full" />
          </div>
        </Container>
      </div>
    );
  }

  // Variation 2: Map Left, Info Right
  if (variation === 2) {
    return (
      <div className="w-full h-full flex bg-gray-50">
        <div className="w-1/2 h-full">
           <ImageBlock className="w-full h-full" text="MAP PLACEHOLDER" />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center p-12 bg-white">
           <TitleBlock width="60%" />
           <div className="space-y-6 mt-8">
             {[1,2,3].map(i => (
               <div key={i} className="flex gap-4">
                 <div className="w-6 h-6 bg-gray-200 rounded-full" />
                 <div className="flex-1 space-y-2">
                   <div className="w-1/2 h-3 bg-gray-600" />
                   <div className="w-3/4 h-2 bg-gray-400" />
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  // Variation 3: Simple Banner with Button
  if (variation === 3) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
        <Container className="text-center text-white flex flex-col items-center">
          <div className="w-2/3 h-8 bg-white opacity-20 mb-6 rounded" />
          <div className="w-1/2 h-4 bg-white opacity-10 mb-8 rounded" />
          <div className="h-12 px-8 bg-white text-[#1982c4] font-bold flex items-center shadow-lg border-2 border-white cursor-pointer">
            CONTACT US NOW
          </div>
        </Container>
      </div>
    );
  }

  // Variation 4: Minimal Typographic
  if (variation === 4) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 space-y-8">
         <div className="text-sm font-bold tracking-[0.2em] text-gray-400">GET IN TOUCH</div>
         <div className="text-5xl md:text-6xl font-bold text-gray-800 text-center border-b-2 border-[#ff595e] pb-2">
            hello@studio.com
         </div>
         <div className="flex gap-6 mt-4">
           {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" />)}
         </div>
      </div>
    );
  }

  // Variation 5: Split Vertical (Dark/Light)
  if (variation === 5) {
    return (
      <div className="w-full h-full flex">
        <div className="w-1/3 h-full bg-gray-800 text-white p-12 flex flex-col justify-center space-y-8">
           <TitleBlock width="80%" className="bg-white opacity-90" />
           <div className="space-y-4 opacity-60">
             <div className="w-full h-2 bg-white" />
             <div className="w-2/3 h-2 bg-white" />
             <div className="w-3/4 h-2 bg-white" />
           </div>
        </div>
        <div className="w-2/3 h-full bg-white p-12 flex flex-col justify-center">
           <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-12 border bg-gray-50" />
              <div className="h-12 border bg-gray-50" />
           </div>
           <div className="h-12 border bg-gray-50 mb-4" />
           <div className="h-24 border bg-gray-50 mb-6" />
           <ButtonBlock className="w-1/3" />
        </div>
      </div>
    );
  }

  // Variation 6: Floating Card on Map
  if (variation === 6) {
    return (
      <div className="w-full h-full relative">
        <ImageBlock className="w-full h-full absolute inset-0" text="FULL MAP" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="bg-white p-8 rounded-lg shadow-2xl w-96 pointer-events-auto">
              <TitleBlock width="60%" className="mb-6" />
              <div className="space-y-4">
                 <div className="h-10 bg-gray-50 border rounded" />
                 <div className="h-24 bg-gray-50 border rounded" />
                 <ButtonBlock className="w-full" />
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Variation 7: Newsletter Focus
  if (variation === 7) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#2a9d8f] p-8">
        <div className="text-white text-3xl font-bold mb-2">Stay Updated</div>
        <div className="text-white/80 mb-8 text-center max-w-md">Join our mailing list for the latest news.</div>
        <div className="flex w-full max-w-md bg-white p-1 rounded shadow-lg">
           <div className="flex-1 bg-transparent px-4 py-2 text-gray-500 flex items-center">email@address.com</div>
           <button className="bg-gray-900 text-white px-6 py-2 rounded font-bold uppercase text-xs tracking-wider">Subscribe</button>
        </div>
      </div>
    );
  }

  // Variation 8: Big Phone Number
  if (variation === 8) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white border-y-[12px] border-[#ff595e]">
         <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Call Us 24/7</div>
            <div className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">555.0199</div>
            <div className="text-xl text-[#ff595e] font-serif italic">hello@agency.com</div>
         </div>
      </div>
    );
  }

  // Variation 9: Chat Interface
  if (variation === 9) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
         <Container className="max-w-md w-full bg-white rounded-t-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-[#1982c4] p-4 flex justify-between items-center text-white">
               <div className="font-bold">Chat with us</div>
               <div className="text-xs opacity-70">Online</div>
            </div>
            <div className="h-48 bg-gray-50 p-4 space-y-3">
               <div className="bg-gray-200 w-2/3 p-2 rounded-lg rounded-tl-none text-xs text-gray-600">Hello! How can we help?</div>
               <div className="bg-blue-100 w-2/3 ml-auto p-2 rounded-lg rounded-tr-none text-xs text-blue-800">I have a question about pricing.</div>
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2">
               <div className="flex-1 h-8 bg-gray-100 rounded" />
               <div className="w-8 h-8 bg-[#1982c4] rounded-full flex items-center justify-center text-white text-xs">↑</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 10: Calendar Booking
  if (variation === 10) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
         <Container className="flex gap-8 max-w-4xl border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="w-1/3 border-r pr-8">
               <div className="w-12 h-12 bg-gray-100 rounded-full mb-4" />
               <TitleBlock width="80%" />
               <TextBlock lines={2} />
               <div className="mt-4 text-xs text-gray-400">30 min meeting</div>
            </div>
            <div className="w-2/3">
               <div className="text-sm font-bold mb-4">Select a Date & Time</div>
               <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs">
                  {['S','M','T','W','T','F','S'].map(d => <div key={d} className="font-bold text-gray-400">{d}</div>)}
                  {Array.from({length: 30}).map((_, i) => (
                     <div key={i} className={`p-2 rounded hover:bg-blue-50 cursor-pointer ${i === 14 ? 'bg-[#1982c4] text-white' : 'text-gray-600'}`}>
                        {i + 1}
                     </div>
                  ))}
               </div>
               <div className="flex gap-2">
                  <div className="border border-[#1982c4] text-[#1982c4] px-4 py-1 rounded text-xs">9:00 AM</div>
                  <div className="border border-gray-200 text-gray-400 px-4 py-1 rounded text-xs">10:00 AM</div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 11: FAQ + Contact
  if (variation === 11) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
         <div className="max-w-2xl w-full">
            <TitleBlock width="40%" className="mx-auto mb-8" />
            <div className="space-y-3 mb-8">
               {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 rounded shadow-sm flex justify-between items-center cursor-pointer">
                     <div className="w-2/3 h-3 bg-gray-400 rounded" />
                     <div className="text-gray-400">+</div>
                  </div>
               ))}
            </div>
            <div className="text-center">
               <div className="text-sm text-gray-500 mb-4">Still have questions?</div>
               <ButtonBlock className="mx-auto" />
            </div>
         </div>
      </div>
    );
  }

  // Variation 12: Split Form (Image Top/Form Bottom or Side) - Let's do Dark Form Left
  if (variation === 12) {
    return (
      <div className="w-full h-full flex bg-white">
         <div className="w-1/2 bg-black text-white p-12 flex flex-col justify-center">
            <TitleBlock width="60%" className="bg-white" />
            <div className="mt-8 space-y-4">
               <div className="space-y-1">
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="h-8 border-b border-gray-700 w-full" />
               </div>
               <div className="space-y-1">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="h-8 border-b border-gray-700 w-full" />
               </div>
               <div className="pt-4">
                  <ButtonBlock className="bg-white text-black border-white w-full" />
               </div>
            </div>
         </div>
         <div className="w-1/2 p-4">
            <ImageBlock className="w-full h-full" text="OFFICE VIEW" />
         </div>
      </div>
    );
  }

  // Variation 13: Help Center Search
  if (variation === 13) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fa] p-12">
           <TitleBlock width="30%" className="mb-8 mx-auto" />
           <div className="w-full max-w-xl relative mb-12">
              <input disabled className="w-full h-14 pl-12 bg-white shadow-lg rounded-full text-sm" placeholder="Search for answers..." />
              <div className="absolute left-4 top-4 w-6 h-6 bg-gray-200 rounded-full" />
           </div>
           <div className="flex gap-8 justify-center">
              {[1, 2, 3].map(i => (
                 <div key={i} className="w-32 h-32 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-50" />
                    <div className="w-16 h-2 bg-gray-300 rounded" />
                 </div>
              ))}
           </div>
        </div>
     );
  }

  // Variation 14: Location Cards
  if (variation === 14) {
     return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
           <TitleBlock width="20%" className="mx-auto mb-12" />
           <Container className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                 <div key={i} className="border border-gray-200 p-6 rounded-lg text-center hover:border-black transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4" />
                    <div className="h-4 w-24 bg-gray-800 mx-auto mb-2 rounded" />
                    <TextBlock lines={2} align="center" className="opacity-60 mb-4" />
                    <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">Get Directions</div>
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 15: Big Minimal Link
  if (variation === 15) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-[#ffca3a] group cursor-pointer">
           <div className="flex items-center gap-8 transform transition-transform group-hover:scale-105">
              <div className="text-6xl font-black text-black">Start a Project</div>
              <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl transition-transform group-hover:translate-x-4">→</div>
           </div>
        </div>
     );
  }

  // Variation 16: Feedback / NPS
  if (variation === 16) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white">
           <Container className="max-w-3xl text-center border border-gray-100 p-12 shadow-sm rounded-2xl">
              <TitleBlock width="50%" className="mx-auto mb-8" />
              <div className="flex justify-between items-center mb-2 px-4">
                 <span className="text-xs text-gray-400">Not Likely</span>
                 <span className="text-xs text-gray-400">Very Likely</span>
              </div>
              <div className="flex gap-2 justify-between mb-8">
                 {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <div key={n} className="flex-1 aspect-square flex items-center justify-center rounded border border-gray-200 hover:bg-[#1982c4] hover:text-white hover:border-[#1982c4] cursor-pointer transition-colors text-sm font-bold text-gray-600">
                       {n}
                    </div>
                 ))}
              </div>
              <div className="w-full h-24 border border-gray-200 rounded-lg bg-gray-50 mb-4" />
              <ButtonBlock className="mx-auto" />
           </Container>
        </div>
     );
  }

  // Variation 17: Business Card
  if (variation === 17) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
           <div className="w-96 h-56 bg-white shadow-2xl rounded-xl p-8 flex flex-col justify-between border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1982c4] transform rotate-45 translate-x-12 -translate-y-12 opacity-20" />
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded-lg" />
                 <div>
                    <div className="w-32 h-4 bg-gray-800 rounded mb-2" />
                    <div className="w-20 h-2 bg-gray-400 rounded" />
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="w-full h-2 bg-gray-300 rounded" />
                 <div className="w-2/3 h-2 bg-gray-300 rounded" />
                 <div className="w-3/4 h-2 bg-gray-300 rounded" />
              </div>
           </div>
        </div>
     );
  }

  // Variation 18: Typeform Style
  if (variation === 18) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
           <div className="max-w-2xl w-full">
              <div className="flex items-center gap-4 mb-8">
                 <div className="text-[#1982c4] font-bold text-xl">1 →</div>
                 <div className="text-3xl font-light text-gray-800">What is your name?</div>
              </div>
              <div className="w-full border-b-2 border-[#1982c4] pb-2 text-2xl text-gray-400 font-light mb-8">
                 Type your answer here...
              </div>
              <ButtonBlock className="w-32" />
           </div>
        </div>
     );
  }

  // Variation 19: Floating Action Button
  if (variation === 19) {
     return (
        <div className="w-full h-full relative bg-gray-200">
           <ImageBlock className="w-full h-full opacity-50" text="MAP VIEW" />
           <div className="absolute bottom-12 right-12 w-16 h-16 bg-[#ff595e] rounded-full shadow-2xl flex items-center justify-center text-white text-2xl cursor-pointer hover:scale-110 transition-transform">
              +
           </div>
           <div className="absolute bottom-32 right-12 flex flex-col gap-4 items-end">
              <div className="bg-white px-4 py-2 rounded-lg shadow-md text-xs">Email Us</div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-md text-xs">Call Now</div>
           </div>
        </div>
     );
  }

  // Variation 20: Social Grid
  if (variation === 20) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white">
           <Container className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="h-32 bg-[#1DA1F2] rounded-lg flex items-center justify-center text-white font-bold text-xl hover:opacity-90 cursor-pointer">TWITTER</div>
              <div className="h-32 bg-[#E1306C] rounded-lg flex items-center justify-center text-white font-bold text-xl hover:opacity-90 cursor-pointer">INSTAGRAM</div>
              <div className="h-32 bg-[#0077B5] rounded-lg flex items-center justify-center text-white font-bold text-xl hover:opacity-90 cursor-pointer">LINKEDIN</div>
              <div className="h-32 bg-[#000000] rounded-lg flex items-center justify-center text-white font-bold text-xl hover:opacity-90 cursor-pointer">TIKTOK</div>
           </Container>
        </div>
     );
  }

  // Variation 21: Postcard Style
  if (variation === 21) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0]">
           <div className="w-[600px] h-[400px] bg-white shadow-2xl flex p-8 relative">
              <div className="absolute top-4 right-4 w-16 h-20 border border-gray-300 flex items-center justify-center bg-gray-50">
                 <div className="w-10 h-14 bg-gray-200" />
              </div>
              <div className="w-1/2 pr-8 flex flex-col justify-center border-r border-gray-200">
                 <div className="font-serif italic text-2xl text-gray-400 mb-4">Dear Visitor,</div>
                 <TextBlock lines={4} />
                 <div className="mt-8 font-serif italic text-xl text-right">- The Team</div>
              </div>
              <div className="w-1/2 pl-8 flex flex-col justify-center space-y-8 mt-12">
                 <div className="border-b border-gray-300 pb-1 text-sm text-gray-600">Your Name</div>
                 <div className="border-b border-gray-300 pb-1 text-sm text-gray-600">Your Email</div>
                 <div className="border-b border-gray-300 pb-1 text-sm text-gray-600">Message...</div>
                 <ButtonBlock className="mt-4 scale-75 origin-left" />
              </div>
           </div>
        </div>
     );
  }

  // Variation 22: Big QR Code
  if (variation === 22) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-8 text-center">
           <TitleBlock width="30%" className="bg-white mx-auto mb-8" />
           <div className="w-48 h-48 bg-white p-2 rounded-xl mb-6">
              <div className="w-full h-full border-4 border-dashed border-gray-400 flex items-center justify-center text-black font-bold text-xs">
                 SCAN TO CHAT
              </div>
           </div>
           <div className="text-xs text-gray-500 uppercase tracking-widest">or email us at hello@site.com</div>
        </div>
     );
  }

  // Variation 23: Support Ticket Form
  if (variation === 23) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
           <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                 <span className="font-bold text-sm text-gray-600">New Ticket #8291</span>
                 <div className="w-3 h-3 rounded-full bg-red-400" />
              </div>
              <div className="p-8 space-y-4">
                 <div className="flex gap-4">
                    <div className="w-1/2 h-8 bg-gray-50 border border-gray-200 rounded" />
                    <div className="w-1/2 h-8 bg-gray-50 border border-gray-200 rounded" />
                 </div>
                 <div className="w-full h-8 bg-gray-50 border border-gray-200 rounded" />
                 <div className="w-full h-32 bg-gray-50 border border-gray-200 rounded" />
                 <div className="flex justify-end">
                    <ButtonBlock className="w-32" />
                 </div>
              </div>
           </div>
        </div>
     );
  }

  // Variation 24: Floating Map Card
  if (variation === 24) {
     return (
        <div className="w-full h-full relative">
           <ImageBlock className="w-full h-full" text="MAP" />
           <div className="absolute top-8 left-8 bg-white p-6 shadow-xl rounded-lg max-w-xs space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-full" />
                 <div className="flex-1">
                    <div className="w-24 h-3 bg-gray-800 rounded mb-1" />
                    <div className="w-16 h-2 bg-gray-400 rounded" />
                 </div>
              </div>
              <TextBlock lines={2} />
              <ButtonBlock className="w-full text-xs h-8" />
           </div>
        </div>
     );
  }

  // Variation 25: Diagonal Split
  if (variation === 25) {
     return (
        <div className="w-full h-full relative bg-gray-900 overflow-hidden">
           <div className="absolute inset-0 bg-white transform -skew-x-12 origin-top-left w-1/2 h-full z-0" />
           <div className="relative z-10 w-full h-full flex">
              <div className="w-1/2 flex items-center justify-center p-12">
                 <div className="w-full max-w-sm space-y-4">
                    <TitleBlock width="60%" />
                    <TextBlock lines={3} />
                 </div>
              </div>
              <div className="w-1/2 flex items-center justify-center p-12 text-white">
                 <div className="w-full max-w-sm text-right">
                    <div className="text-4xl font-bold mb-2">Say Hello</div>
                    <div className="text-xl opacity-60">hello@world.com</div>
                    <div className="mt-8 flex justify-end gap-4">
                       <div className="w-10 h-10 bg-gray-800 rounded-full" />
                       <div className="w-10 h-10 bg-gray-800 rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
     );
  }

  // Variation 26: Full Screen Video
  if (variation === 26) {
    return (
      <div className="w-full h-full relative bg-black flex items-center justify-center">
         <ImageBlock className="w-full h-full opacity-30" text="VIDEO BG" />
         <div className="absolute inset-0 flex items-center justify-center">
            <Container className="text-center text-white">
               <div className="text-5xl font-bold mb-8">Get In Touch</div>
               <div className="flex justify-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                     <span className="text-xs">EMAIL</span>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                     <span className="text-xs">CALL</span>
                  </div>
               </div>
            </Container>
         </div>
      </div>
    );
  }

  // Variation 27: FAQ Accordion + Contact
  if (variation === 27) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <Container className="flex gap-12">
            <div className="w-1/2 space-y-4">
               {[1,2,3,4].map(i => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                     <div className="flex justify-between items-center cursor-pointer">
                        <div className="w-32 h-3 bg-gray-700 rounded" />
                        <span className="text-gray-400">+</span>
                     </div>
                  </div>
               ))}
            </div>
            <div className="w-1/2 bg-gray-50 p-8 rounded-xl text-center flex flex-col justify-center">
               <div className="font-bold mb-4">Still need help?</div>
               <ButtonBlock className="mx-auto w-full" />
            </div>
         </Container>
      </div>
    );
  }

  // Variation 28: Calendar Picker
  if (variation === 28) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
         <div className="bg-white p-8 rounded-xl shadow-lg flex gap-8">
            <div className="w-64">
               <div className="flex justify-between mb-4 font-bold text-gray-700">
                  <span>September</span>
                  <span>{'>'}</span>
               </div>
               <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500">
                  {['S','M','T','W','T','F','S'].map(d => <span key={d}>{d}</span>)}
                  {Array.from({length: 30}).map((_, i) => (
                     <div key={i} className={`p-2 rounded hover:bg-blue-50 cursor-pointer ${i === 12 ? 'bg-[#1982c4] text-white' : ''}`}>
                        {i+1}
                     </div>
                  ))}
               </div>
            </div>
            <div className="w-48 border-l border-gray-100 pl-8 flex flex-col justify-center gap-2">
               <div className="text-xs text-gray-400 uppercase font-bold">Available Times</div>
               {['9:00 AM', '11:00 AM', '2:00 PM'].map(t => (
                  <div key={t} className="border border-gray-200 rounded px-3 py-2 text-xs text-center hover:border-blue-500 cursor-pointer">{t}</div>
               ))}
            </div>
         </div>
      </div>
    );
  }

  // Variation 29: Direct Message
  if (variation === 29) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
         <div className="w-[500px] border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50 rounded-t-lg">
               <div className="w-3 h-3 rounded-full bg-red-400" />
               <div className="w-3 h-3 rounded-full bg-yellow-400" />
               <div className="w-3 h-3 rounded-full bg-green-400" />
               <div className="ml-4 text-xs font-mono text-gray-500">Message to: Support</div>
            </div>
            <div className="p-4 h-48 bg-white relative">
               <div className="text-2xl text-gray-300 font-light p-4">Type your message here...</div>
               <div className="absolute bottom-4 right-4">
                  <ButtonBlock className="scale-75 origin-bottom-right" />
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Variation 30: Location Grid
  if (variation === 30) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#f8f9fa] p-8">
         <TitleBlock width="30%" className="mx-auto mb-8" />
         <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
            {['New York', 'London', 'Tokyo'].map((city, i) => (
               <div key={i} className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-gray-900">
                  <div className="font-bold text-lg mb-2">{city}</div>
                  <div className="space-y-1 text-sm text-gray-500">
                     <div className="w-32 h-2 bg-gray-200 rounded" />
                     <div className="w-24 h-2 bg-gray-200 rounded" />
                     <div className="w-28 h-2 bg-gray-200 rounded" />
                  </div>
                  <div className="mt-4 text-xs font-bold text-blue-500 uppercase">View Map</div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Contact Variation {variation}</div>;
};
