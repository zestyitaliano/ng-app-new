
import React from 'react';
import { WireframeProps } from '../../types';
import { Container, TitleBlock, TextBlock, ButtonBlock } from '../WireframeElements';

export const FooterWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: 4 Columns
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center bg-gray-900 text-white p-8">
        <Container className="grid grid-cols-4 gap-8">
           <div className="space-y-2">
             <div className="w-10 h-10 border-2 border-white rounded-full mb-2" />
             <div className="w-full h-2 bg-gray-600" />
             <div className="w-2/3 h-2 bg-gray-600" />
           </div>
           {[1, 2, 3].map(i => (
             <div key={i} className="space-y-3">
               <div className="w-1/2 h-3 bg-white opacity-50 mb-4" />
               <div className="w-full h-2 bg-gray-700" />
               <div className="w-full h-2 bg-gray-700" />
               <div className="w-3/4 h-2 bg-gray-700" />
             </div>
           ))}
        </Container>
      </div>
    );
  }

  // Variation 2: Centered Simple
  if (variation === 2) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-8 border-t-4" style={{ borderColor: '#1982c4' }}>
         <div className="text-2xl font-bold tracking-widest text-gray-300 mb-6">LOGO</div>
         <div className="flex gap-8 mb-8">
           {[1,2,3,4].map(i => <div key={i} className="w-16 h-3 bg-gray-400 rounded" />)}
         </div>
         <div className="flex gap-4">
           {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border border-gray-400" />)}
         </div>
         <div className="mt-8 w-64 h-2 bg-gray-300 text-xs text-center" />
      </div>
    );
  }

  // Variation 3: Split (Newsletter Left, Links Right)
  if (variation === 3) {
    return (
      <div className="w-full h-full flex items-center bg-gray-800 p-8">
        <Container className="flex gap-12">
          <div className="w-1/2 space-y-4">
             <div className="w-1/2 h-4 bg-white mb-2" />
             <div className="w-full h-2 bg-gray-500" />
             <div className="flex mt-4 h-10">
               <div className="flex-1 bg-gray-700 border border-gray-600" />
               <div className="w-24 bg-[#ffca3a]" />
             </div>
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-4">
             {[1, 2].map(col => (
               <div key={col} className="space-y-2">
                 {[1,2,3,4].map(row => <div key={row} className="w-full h-2 bg-gray-600" />)}
               </div>
             ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 4: Big Typographic
  if (variation === 4) {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-black text-white p-12">
         <TitleBlock width="80%" className="bg-white h-16 opacity-100" />
         <div className="grid grid-cols-4 gap-4 mt-8 border-t border-gray-800 pt-8">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="flex flex-col gap-2">
                <div className="w-full h-2 bg-gray-700" />
                <div className="w-2/3 h-2 bg-gray-700" />
             </div>
           ))}
         </div>
      </div>
    );
  }

  // Variation 5: Minimal Single Line
  if (variation === 5) {
    return (
      <div className="w-full h-full flex items-center bg-white border-t border-gray-200 p-8">
        <Container className="flex items-center justify-between">
           <div className="font-bold text-lg text-gray-800">BRAND</div>
           <div className="flex gap-8">
              <div className="w-16 h-2 bg-gray-400" />
              <div className="w-16 h-2 bg-gray-400" />
              <div className="w-16 h-2 bg-gray-400" />
           </div>
           <div className="w-24 h-2 bg-gray-300" />
        </Container>
      </div>
    );
  }

  // Variation 6: Sitemap Style
  if (variation === 6) {
    return (
      <div className="w-full h-full bg-gray-900 text-gray-400 p-12 flex flex-col justify-between">
        <div className="grid grid-cols-5 gap-8">
           {[1,2,3,4,5].map(col => (
             <div key={col} className="space-y-4">
                <div className="h-4 w-20 bg-white opacity-80 mb-6" />
                <div className="h-2 w-full bg-gray-700" />
                <div className="h-2 w-2/3 bg-gray-700" />
                <div className="h-2 w-3/4 bg-gray-700" />
                <div className="h-2 w-1/2 bg-gray-700" />
             </div>
           ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center">
           <div className="w-32 h-4 bg-gray-700" />
           <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gray-700" />
              <div className="w-6 h-6 rounded-full bg-gray-700" />
           </div>
        </div>
      </div>
    );
  }

  // Variation 7: Social Focus
  if (variation === 7) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white border-t p-8">
        <div className="flex gap-8 mb-8">
           {[1,2,3,4].map(i => (
             <div key={i} className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-transform">
                <div className="w-6 h-6 bg-gray-400" />
             </div>
           ))}
        </div>
        <div className="flex gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
           <span>Privacy</span>
           <span>Terms</span>
           <span>Contact</span>
        </div>
      </div>
    );
  }

  // Variation 8: Dark Contrast with Input
  if (variation === 8) {
    return (
      <div className="w-full h-full flex flex-col">
         <div className="flex-1 bg-gray-800 p-12 flex items-center justify-between">
            <div className="w-1/2">
               <TitleBlock width="60%" className="bg-white" />
               <TextBlock lines={2} className="opacity-50" />
            </div>
            <div className="w-1/3">
               <div className="flex border-b border-white pb-2">
                  <div className="flex-1 text-white opacity-50">Email Address</div>
                  <div className="text-white font-bold">→</div>
               </div>
            </div>
         </div>
         <div className="h-16 bg-black flex items-center justify-between px-12 text-gray-600 text-xs">
            <div>© 2024 Brand Inc.</div>
            <div>All rights reserved.</div>
         </div>
      </div>
    );
  }

  // Variation 9: App Download Focus
  if (variation === 9) {
    return (
      <div className="w-full h-full flex items-center bg-gray-900 text-white p-8">
         <Container className="flex justify-between items-center">
            <div className="w-1/2">
               <TitleBlock width="60%" className="bg-white" />
               <TextBlock lines={2} className="opacity-60 my-4" />
            </div>
            <div className="flex gap-4">
               <div className="w-32 h-10 border border-gray-600 rounded-lg flex items-center justify-center bg-black">
                  <span className="text-xs">App Store</span>
               </div>
               <div className="w-32 h-10 border border-gray-600 rounded-lg flex items-center justify-center bg-black">
                  <span className="text-xs">Google Play</span>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 10: Legal Text Heavy
  if (variation === 10) {
    return (
      <div className="w-full h-full flex flex-col justify-end bg-gray-100 p-8">
         <div className="text-xs text-gray-400 space-y-2 text-justify">
            <div className="w-full h-2 bg-gray-200" />
            <div className="w-full h-2 bg-gray-200" />
            <div className="w-full h-2 bg-gray-200" />
            <div className="w-2/3 h-2 bg-gray-200" />
         </div>
         <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-500">
            <div>© 2024 Company. All rights reserved.</div>
            <div className="flex gap-4">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
         </div>
      </div>
    );
  }

  // Variation 11: CTA Footer
  if (variation === 11) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#ff595e] text-white p-8 text-center">
         <div className="text-4xl font-bold mb-6">Ready to get started?</div>
         <ButtonBlock className="bg-white text-[#ff595e] border-white text-lg px-8 py-4 h-auto" />
         <div className="mt-8 flex gap-8 text-sm opacity-80">
            <span>email@company.com</span>
            <span>+1 (555) 000-0000</span>
         </div>
      </div>
    );
  }

  // Variation 12: Search Footer
  if (variation === 12) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-white border-t p-8">
         <Container className="flex justify-between items-start">
            <div className="w-1/4">
               <div className="font-bold text-xl mb-4">BRAND</div>
               <div className="space-y-2 text-sm text-gray-500">
                  <div>About</div>
                  <div>Careers</div>
                  <div>Press</div>
               </div>
            </div>
            <div className="w-1/2">
               <div className="relative">
                  <div className="w-full h-10 bg-gray-100 rounded pl-4 flex items-center text-gray-400 text-sm">Search site...</div>
                  <div className="absolute right-2 top-2 w-6 h-6 bg-gray-300 rounded" />
               </div>
               <div className="flex gap-4 mt-4 justify-center">
                  {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />)}
               </div>
            </div>
            <div className="w-1/4 text-right text-xs text-gray-400">
               <div className="mb-2">123 Street Name</div>
               <div>City, Country</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 13: Tag Cloud Footer
  if (variation === 13) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
           <div className="max-w-xl flex flex-wrap justify-center gap-3">
              {['Design', 'Development', 'Marketing', 'Strategy', 'Business', 'Tech', 'AI', 'Cloud', 'Mobile', 'Web'].map((tag, i) => (
                 <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 hover:border-black cursor-pointer">
                    {tag}
                 </span>
              ))}
           </div>
           <div className="mt-12 text-xs text-gray-400">© 2024 All rights reserved.</div>
        </div>
     );
  }

  // Variation 14: Partners + Links
  if (variation === 14) {
     return (
        <div className="w-full h-full flex flex-col justify-center bg-white border-t p-8">
           <Container>
              <div className="flex justify-between items-center opacity-30 grayscale mb-12 border-b pb-8">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-24 h-8 bg-gray-300 rounded" />)}
              </div>
              <div className="flex justify-between items-end">
                 <div className="space-y-2 text-sm font-bold text-gray-800">
                    <div className="text-xl mb-4">STUDIO</div>
                    <div>hello@studio.com</div>
                 </div>
                 <div className="flex gap-8 text-sm text-gray-500">
                    <span>Instagram</span>
                    <span>Twitter</span>
                    <span>LinkedIn</span>
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 15: QR Code / Mobile
  if (variation === 15) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-8">
           <div className="flex items-center gap-12 bg-gray-800 p-8 rounded-2xl">
              <div className="space-y-4">
                 <TitleBlock width="80%" className="bg-white" />
                 <TextBlock lines={2} className="opacity-70 w-64" />
              </div>
              <div className="w-24 h-24 bg-white rounded p-2">
                 <div className="w-full h-full border-4 border-dashed border-gray-300 flex items-center justify-center text-black text-[8px] text-center font-bold">
                    SCAN ME
                 </div>
              </div>
           </div>
        </div>
     );
  }

  // Variation 16: Ultra Minimal
  if (variation === 16) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
           <div className="w-8 h-8 bg-black rounded-full mb-8" />
           <div className="flex gap-6 text-xs text-gray-400 tracking-widest uppercase mb-8">
              <span>Work</span>
              <span>About</span>
              <span>Contact</span>
           </div>
           <div className="text-[10px] text-gray-300">© 2024 • MADE WITH ♥</div>
        </div>
     );
  }

  // Variation 17: Newsletter Centered
  if (variation === 17) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-8">
           <Container className="text-center max-w-lg">
              <div className="text-sm font-bold tracking-widest text-[#ffca3a] mb-6">WEEKLY UPDATES</div>
              <TitleBlock width="60%" className="bg-white mx-auto mb-8" />
              <div className="relative">
                 <input disabled className="w-full h-16 bg-gray-800 border-none rounded-full px-8 text-white text-center" placeholder="email@address.com" />
                 <div className="absolute right-2 top-2 h-12 w-12 bg-[#ffca3a] rounded-full flex items-center justify-center text-black font-bold">→</div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 18: Copyright Only
  if (variation === 18) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white border-t">
           <div className="text-xs text-gray-300 tracking-[0.5em]">COPYRIGHT © 2024</div>
        </div>
     );
  }

  // Variation 19: Brand Family
  if (variation === 19) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 border-t p-8">
           <div className="text-xs text-gray-400 mb-6 uppercase tracking-wider">Part of the Family</div>
           <div className="flex gap-12 opacity-50 grayscale">
              {[1,2,3,4].map(i => <div key={i} className="w-16 h-16 bg-gray-300 rounded-full" />)}
           </div>
        </div>
     );
  }

  // Variation 20: Big Links
  if (variation === 20) {
     return (
        <div className="w-full h-full flex flex-col justify-center bg-black text-white p-12">
           <div className="space-y-4 text-4xl font-bold tracking-tighter hover:text-gray-400 cursor-pointer transition-colors border-b border-gray-800 pb-4">WORK</div>
           <div className="space-y-4 text-4xl font-bold tracking-tighter hover:text-gray-400 cursor-pointer transition-colors border-b border-gray-800 pb-4">STUDIO</div>
           <div className="space-y-4 text-4xl font-bold tracking-tighter hover:text-gray-400 cursor-pointer transition-colors border-b border-gray-800 pb-4">CONTACT</div>
           <div className="mt-8 text-xs text-gray-500">© 2024</div>
        </div>
     );
  }

  // Variation 21: Dark Mega Menu
  if (variation === 21) {
     return (
        <div className="w-full h-full flex items-center bg-black text-white p-12">
           <Container className="grid grid-cols-5 gap-8">
              <div className="col-span-2 space-y-4">
                 <TitleBlock width="50%" className="bg-white" />
                 <TextBlock lines={3} className="opacity-50" />
              </div>
              <div>
                 <div className="text-xs font-bold text-gray-500 mb-4">PRODUCT</div>
                 <div className="space-y-2 text-sm text-gray-300">
                    <div>Features</div>
                    <div>Pricing</div>
                    <div>Changelog</div>
                 </div>
              </div>
              <div>
                 <div className="text-xs font-bold text-gray-500 mb-4">COMPANY</div>
                 <div className="space-y-2 text-sm text-gray-300">
                    <div>About</div>
                    <div>Careers</div>
                    <div>Blog</div>
                 </div>
              </div>
              <div>
                 <div className="text-xs font-bold text-gray-500 mb-4">LEGAL</div>
                 <div className="space-y-2 text-sm text-gray-300">
                    <div>Privacy</div>
                    <div>Terms</div>
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 22: Status Bar
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center justify-between bg-white border-t p-8 px-12">
           <div className="flex gap-4 text-sm text-gray-500">
              <span>English (US)</span>
              <span>$ USD</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-gray-500">ALL SYSTEMS OPERATIONAL</span>
           </div>
        </div>
     );
  }

  // Variation 23: Centered Logo & Socials
  if (variation === 23) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
           <div className="w-12 h-12 bg-black rounded-lg mb-6 transform rotate-45" />
           <div className="flex gap-6 mb-8 text-gray-400">
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
           </div>
           <div className="flex gap-6 text-sm text-gray-500">
              <span>Home</span>
              <span>About</span>
              <span>Services</span>
              <span>Contact</span>
           </div>
        </div>
     );
  }

  // Variation 24: Minimal Legal
  if (variation === 24) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white border-t p-8">
           <div className="text-[10px] text-gray-400 flex flex-col items-center gap-2">
              <div>© 2024 Corporation Inc.</div>
              <div className="flex gap-2">
                 <span className="underline">Privacy Policy</span>
                 <span>•</span>
                 <span className="underline">Terms of Service</span>
                 <span>•</span>
                 <span className="underline">Cookies</span>
              </div>
           </div>
        </div>
     );
  }

  // Variation 25: "Get in Touch" Big Link
  if (variation === 25) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1982c4] text-white p-8 overflow-hidden group">
           <div className="text-sm font-bold uppercase tracking-widest opacity-70 mb-4">Have an idea?</div>
           <div className="text-6xl font-black underline decoration-4 underline-offset-8 cursor-pointer hover:scale-105 transition-transform">
              LET'S TALK
           </div>
        </div>
     );
  }

  // Variation 26: Full Sitemap
  if (variation === 26) {
    return (
      <div className="w-full h-full flex items-center bg-white border-t border-gray-200 p-12">
         <Container className="grid grid-cols-6 gap-8">
            <div className="col-span-2 font-black text-2xl">LOGO.</div>
            {['Product', 'Resources', 'Company', 'Support'].map((col, i) => (
               <div key={i} className="space-y-4">
                  <div className="font-bold text-sm">{col}</div>
                  {[1,2,3,4].map(link => (
                     <div key={link} className="text-sm text-gray-500 cursor-pointer hover:text-black">Link {link}</div>
                  ))}
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 27: Curve Top
  if (variation === 27) {
    return (
      <div className="w-full h-full relative bg-[#111] text-white flex flex-col justify-end">
         <div className="absolute top-0 left-0 w-full h-16 bg-white rounded-b-[50%] z-10" />
         <div className="p-12 text-center pt-24">
            <div className="text-3xl font-bold mb-8">Ready to launch?</div>
            <ButtonBlock className="bg-white text-black border-none mx-auto mb-12" />
            <div className="text-xs text-gray-500">© 2024 Brand. All rights reserved.</div>
         </div>
      </div>
    );
  }

  // Variation 28: Centered Logo
  if (variation === 28) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8 border-t-8 border-black">
         <div className="flex items-center gap-12 text-sm font-bold tracking-widest">
            <span>ABOUT</span>
            <span>WORK</span>
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-xl font-serif italic">B.</div>
            <span>BLOG</span>
            <span>CONTACT</span>
         </div>
      </div>
    );
  }

  // Variation 29: Dark Mode Switch
  if (variation === 29) {
    return (
      <div className="w-full h-full flex items-center justify-between bg-white px-12 border-t border-gray-200">
         <div className="font-bold">Brand</div>
         <div className="text-xs text-gray-400">© 2024</div>
         <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <div className="px-3 py-1 rounded-full bg-white shadow-sm text-xs font-bold">Light</div>
            <div className="px-3 py-1 text-xs text-gray-500">Dark</div>
         </div>
      </div>
    );
  }

  // Variation 30: QR Code
  if (variation === 30) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
         <div className="flex items-center gap-8 bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center text-white text-[10px]">QR CODE</div>
            <div className="text-left">
               <div className="font-bold mb-1">Download the App</div>
               <div className="text-xs text-gray-500 w-32">Scan to get started on your mobile device.</div>
            </div>
         </div>
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Footer Variation {variation}</div>;
};
