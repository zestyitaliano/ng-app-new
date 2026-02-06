
import React from 'react';
import { WireframeProps } from '../../types';
import { ImageBlock, TitleBlock, ButtonBlock, Container, TextBlock } from '../WireframeElements';

export const PricingWireframe: React.FC<WireframeProps> = ({ variation }) => {
  // Variation 1: Standard 3 Cards
  if (variation === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
        <Container>
          <div className="text-center mb-12">
            <TitleBlock width="40%" className="mx-auto" />
            <TextBlock lines={2} align="center" className="mx-auto mt-4 w-1/2" />
          </div>
          <div className="grid grid-cols-3 gap-8 items-center">
            {[1, 2, 3].map(i => (
              <div key={i} className={`bg-white p-6 rounded-xl border ${i === 2 ? 'border-[#4361ee] shadow-xl relative scale-105 z-10' : 'border-gray-200 shadow-sm'}`}>
                {i === 2 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4361ee] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Plan {i}</div>
                  <div className="text-4xl font-black text-gray-800">${i * 19}<span className="text-lg font-normal text-gray-400">/mo</span></div>
                </div>
                <div className="space-y-4 mb-8">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${j > i + 1 ? 'bg-gray-100 text-gray-300' : 'bg-green-100 text-green-600'}`}>✓</div>
                      <div className={`h-2 rounded w-full ${j > i + 1 ? 'bg-gray-100' : 'bg-gray-200'}`} />
                    </div>
                  ))}
                </div>
                <ButtonBlock variant={i === 2 ? 'primary' : 'secondary'} className="w-full" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // Variation 2: Simple Toggle (2 Cards)
  if (variation === 2) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
        <TitleBlock width="30%" className="mx-auto mb-6" />
        
        {/* Toggle */}
        <div className="flex items-center gap-4 mb-12 bg-gray-100 p-1 rounded-full">
          <div className="px-4 py-1 bg-white rounded-full shadow-sm text-xs font-bold text-gray-800">Monthly</div>
          <div className="px-4 py-1 text-xs font-bold text-gray-400">Yearly</div>
        </div>

        <Container className="grid grid-cols-2 gap-12 max-w-4xl">
          {[1, 2].map(i => (
            <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:border-gray-400 transition-colors">
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-xl font-bold mb-1">Basic</div>
                    <div className="text-sm text-gray-500">For starters</div>
                  </div>
                  <div className="text-3xl font-bold">$0</div>
               </div>
               <div className="space-y-4 mb-8">
                  <div className="w-full h-2 bg-gray-200 rounded" />
                  <div className="w-full h-2 bg-gray-200 rounded" />
                  <div className="w-2/3 h-2 bg-gray-200 rounded" />
               </div>
               <ButtonBlock className="w-full" />
            </div>
          ))}
        </Container>
      </div>
    );
  }

  // Variation 3: Comparison Table
  if (variation === 3) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <Container className="max-w-5xl">
            <div className="grid grid-cols-4 gap-4 border-b border-gray-200 pb-4 mb-4">
               <div className="font-bold text-lg pt-8">Features</div>
               {[1,2,3].map(i => (
                 <div key={i} className="text-center bg-gray-50 p-4 rounded-t-lg">
                    <div className="font-bold">Tier {i}</div>
                    <div className="text-xl text-[#4361ee] font-bold mt-2">${i*10}</div>
                 </div>
               ))}
            </div>
            {[1,2,3,4,5].map(row => (
               <div key={row} className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100 items-center hover:bg-gray-50">
                  <div className="pl-4">
                     <div className="w-32 h-3 bg-gray-600 rounded" />
                  </div>
                  {[1,2,3].map(col => (
                     <div key={col} className="flex justify-center">
                        {col >= row - 2 ? (
                           <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</div>
                        ) : (
                           <div className="w-2 h-px bg-gray-300" />
                        )}
                     </div>
                  ))}
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 4: Enterprise/Horizontal
  if (variation === 4) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-8">
         <Container className="flex items-center justify-between border border-gray-700 rounded-2xl p-12 bg-gray-800">
            <div className="w-1/2 space-y-6">
               <div className="inline-block px-2 py-1 bg-[#4361ee] rounded text-xs font-bold tracking-widest">ENTERPRISE</div>
               <TitleBlock width="80%" className="bg-white" />
               <TextBlock lines={3} className="opacity-70" />
               <div className="flex gap-4 pt-4 text-sm opacity-60">
                  <div className="flex items-center gap-2"><span>•</span> Unlimited Seats</div>
                  <div className="flex items-center gap-2"><span>•</span> 24/7 Support</div>
               </div>
            </div>
            <div className="w-1/3 flex flex-col gap-4 border-l border-gray-700 pl-12">
               <div className="text-right">
                  <div className="text-sm text-gray-400">Starting at</div>
                  <div className="text-5xl font-bold">$999</div>
                  <div className="text-sm text-gray-400">per month</div>
               </div>
               <ButtonBlock className="bg-white text-black border-none w-full" />
               <div className="text-center text-xs text-gray-500 underline cursor-pointer">Contact Sales</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 5: Single Card Focus (Dark Mode)
  if (variation === 5) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#111] p-8">
         <div className="max-w-md w-full bg-[#1a1a1a] border border-[#333] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4361ee] opacity-20 blur-3xl rounded-full pointer-events-none" />
            
            <div className="text-center mb-8">
               <div className="text-white text-3xl font-bold mb-2">Pro Access</div>
               <div className="text-gray-400 text-sm">Everything you need to grow.</div>
            </div>

            <div className="flex justify-center items-baseline gap-1 text-white mb-8">
               <span className="text-5xl font-bold">$49</span>
               <span className="text-gray-500">/mo</span>
            </div>

            <div className="space-y-4 mb-8">
               {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#222]">
                     <div className="w-6 h-6 rounded-full bg-[#4361ee]/20 text-[#4361ee] flex items-center justify-center text-xs">★</div>
                     <div className="w-32 h-2 bg-gray-600 rounded" />
                  </div>
               ))}
            </div>

            <ButtonBlock className="w-full bg-[#4361ee] border-none text-white hover:bg-[#3a56d4]" />
            <div className="text-center mt-4 text-xs text-gray-500">No credit card required</div>
         </div>
      </div>
    );
  }

  // Variation 6: Feature List Left, Pricing Right
  if (variation === 6) {
    return (
      <div className="w-full h-full flex items-center bg-white p-8">
         <Container className="flex gap-12 items-center">
            <div className="w-1/2 pr-8">
               <TitleBlock width="70%" className="mb-6" />
               <TextBlock lines={4} className="mb-8" />
               <div className="space-y-3">
                  {[1,2,3].map(i => (
                     <div key={i} className="flex gap-3 items-center">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</div>
                        <div className="w-48 h-2 bg-gray-300 rounded" />
                     </div>
                  ))}
               </div>
            </div>
            <div className="w-1/2 flex gap-4">
               {[1, 2].map(i => (
                  <div key={i} className="flex-1 border border-gray-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow bg-gray-50">
                     <div className="font-bold text-gray-500 text-sm mb-4">TIER {i}</div>
                     <div className="text-3xl font-bold mb-6">${i * 25}</div>
                     <ButtonBlock className="w-full scale-90" />
                  </div>
               ))}
            </div>
         </Container>
      </div>
    );
  }

  // Variation 7: Slider / Usage Based
  if (variation === 7) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
        <Container className="max-w-2xl text-center">
           <TitleBlock width="50%" className="mx-auto mb-8" />
           <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-8">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                 <span>1 User</span>
                 <span>100 Users</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full mb-8">
                 <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#4361ee] rounded-full" />
                 <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-[#4361ee] rounded-full shadow-lg cursor-grab" />
                 <div className="absolute left-1/3 bottom-full mb-4 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                    25 Users
                 </div>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">$125<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <div className="text-sm text-gray-500">Estimated cost based on volume</div>
           </div>
           <div className="grid grid-cols-3 gap-4 text-left">
              {[1,2,3].map(i => (
                 <div key={i} className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px]">✓</div>
                    <div className="w-20 h-2 bg-gray-300 rounded" />
                 </div>
              ))}
           </div>
        </Container>
      </div>
    );
  }

  // Variation 8: Split Freemium vs Pro
  if (variation === 8) {
    return (
      <div className="w-full h-full flex items-center border-t border-b border-gray-100">
         <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white p-12 border-r border-gray-200">
            <div className="text-xl font-bold text-gray-400 mb-4">HOBBY</div>
            <div className="text-4xl font-black text-gray-800 mb-8">Free</div>
            <div className="space-y-4 mb-8 opacity-60">
               <div className="w-32 h-2 bg-gray-400 rounded mx-auto" />
               <div className="w-24 h-2 bg-gray-400 rounded mx-auto" />
               <div className="w-28 h-2 bg-gray-400 rounded mx-auto" />
            </div>
            <ButtonBlock variant="secondary" className="scale-90" />
         </div>
         <div className="w-1/2 h-full flex flex-col justify-center items-center bg-[#1e1e1e] text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4361ee] blur-[60px] opacity-30 rounded-full" />
            <div className="text-xl font-bold text-[#4361ee] mb-4">PRO</div>
            <div className="text-4xl font-black mb-8">$29</div>
            <div className="space-y-4 mb-8">
               <div className="w-40 h-2 bg-gray-300 rounded mx-auto" />
               <div className="w-32 h-2 bg-gray-300 rounded mx-auto" />
               <div className="w-36 h-2 bg-gray-300 rounded mx-auto" />
               <div className="w-24 h-2 bg-gray-300 rounded mx-auto" />
            </div>
            <ButtonBlock variant="primary" className="scale-100 border-none bg-[#4361ee] text-white" />
         </div>
      </div>
    );
  }

  // Variation 9: Lifetime Deal / Urgency
  if (variation === 9) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#fff8e1] p-8">
         <Container className="max-w-3xl bg-white border-2 border-[#ffca3a] rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(255,202,58,1)] flex gap-8 items-center">
            <div className="w-1/2">
               <div className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold mb-4">FLASH SALE</div>
               <div className="text-3xl font-black mb-2">Lifetime Access</div>
               <div className="text-gray-500 line-through text-lg mb-1">$999/year</div>
               <div className="text-5xl font-black text-[#4361ee] mb-6">$199<span className="text-sm text-gray-400 font-normal ml-2">one-time</span></div>
               <ButtonBlock className="w-full" />
            </div>
            <div className="w-1/2 bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center border border-gray-100">
               <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Offer Ends In</div>
               <div className="flex gap-4">
                  {[
                     { val: '02', label: 'HRS' },
                     { val: '45', label: 'MIN' },
                     { val: '12', label: 'SEC' }
                  ].map((t, i) => (
                     <div key={i} className="text-center">
                        <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center text-xl font-mono font-bold">{t.val}</div>
                        <div className="text-[10px] text-gray-400 mt-2 font-bold">{t.label}</div>
                     </div>
                  ))}
               </div>
               <div className="mt-6 space-y-2 w-full">
                  <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                     <div className="w-3/4 h-full bg-red-400" />
                  </div>
                  <div className="text-xs text-red-400 text-center font-bold">85% claimed</div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 10: Add-on Store
  if (variation === 10) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
         <Container className="max-w-4xl">
            <div className="flex gap-8 mb-8">
               <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-xs font-bold text-gray-400 uppercase">Core Platform</div>
                  <div className="text-3xl font-bold mt-2 mb-4">$49<span className="text-sm font-normal text-gray-400">/mo</span></div>
                  <div className="w-full h-px bg-gray-100 mb-4" />
                  <TextBlock lines={3} />
               </div>
               <div className="w-2/3">
                  <div className="text-sm font-bold text-gray-500 mb-4">CUSTOMIZE YOUR PLAN</div>
                  <div className="grid grid-cols-2 gap-4">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white p-4 rounded border border-gray-200 flex items-start gap-3 hover:border-[#4361ee] cursor-pointer transition-colors group">
                           <div className="w-5 h-5 rounded border border-gray-300 mt-1 flex items-center justify-center group-hover:border-[#4361ee] group-hover:bg-[#4361ee] group-hover:text-white transition-colors">
                              {i % 2 === 0 && <span className="text-xs">✓</span>}
                           </div>
                           <div>
                              <div className="font-bold text-sm">Add-on {i}</div>
                              <div className="text-xs text-gray-500 mt-1">+$10/mo</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="flex justify-end items-center gap-6 border-t border-gray-200 pt-6">
               <div className="text-right">
                  <div className="text-xs text-gray-400">Total Monthly</div>
                  <div className="text-2xl font-bold">$69.00</div>
               </div>
               <ButtonBlock />
            </div>
         </Container>
      </div>
    );
  }

  // Variation 11: Developer / Pay-as-you-go
  if (variation === 11) {
    return (
      <div className="w-full h-full flex items-center bg-[#0d1117] text-white p-12">
         <Container className="flex items-center gap-12">
            <div className="w-1/2 space-y-6">
               <div className="text-[#4361ee] font-mono text-xs">USAGE PRICING</div>
               <div className="text-4xl font-bold">Pay for what you use.</div>
               <div className="text-gray-400">No upfront costs. No hidden fees. Scale automatically.</div>
               <div className="flex gap-8 border-t border-gray-800 pt-6">
                  <div>
                     <div className="text-2xl font-mono font-bold">$0.60</div>
                     <div className="text-xs text-gray-500">per 1M reads</div>
                  </div>
                  <div>
                     <div className="text-2xl font-mono font-bold">$1.20</div>
                     <div className="text-xs text-gray-500">per 1M writes</div>
                  </div>
               </div>
               <ButtonBlock className="bg-white text-black border-none mt-4" />
            </div>
            <div className="w-1/2">
               <div className="bg-[#161b22] rounded-lg border border-gray-800 p-6 font-mono text-sm shadow-2xl">
                  <div className="flex justify-between text-gray-500 text-xs mb-4 border-b border-gray-800 pb-2">
                     <span>usage_estimator.js</span>
                     <span>node</span>
                  </div>
                  <div className="space-y-2">
                     <div className="flex"><span className="text-pink-400 mr-2">const</span> <span className="text-blue-300">reads</span> = <span className="text-green-300">1000000</span>;</div>
                     <div className="flex"><span className="text-pink-400 mr-2">const</span> <span className="text-blue-300">writes</span> = <span className="text-green-300">500000</span>;</div>
                     <div className="flex mt-4"><span className="text-gray-500">// Calculate cost</span></div>
                     <div className="flex"><span className="text-pink-400 mr-2">const</span> <span className="text-yellow-300">total</span> = (reads * <span className="text-green-300">0.0000006</span>) + </div>
                     <div className="pl-24">(writes * <span className="text-green-300">0.0000012</span>);</div>
                     <div className="flex mt-4"><span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-yellow-300">total</span>); <span className="text-gray-500">// $1.20</span></div>
                  </div>
               </div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 12: Vertical Stack (Mobile First)
  if (variation === 12) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 p-8">
         <Container className="max-w-sm space-y-4">
            {[1, 2, 3].map(i => (
               <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-[#4361ee]">
                  <div className="flex items-center gap-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i===2 ? 'bg-[#4361ee] text-white' : 'bg-gray-200 text-gray-600'}`}>{i}</div>
                     <div>
                        <div className="font-bold text-sm">Plan Name</div>
                        <div className="text-xs text-gray-400">Brief description</div>
                     </div>
                  </div>
                  <div className="font-bold">${i * 20}/mo</div>
               </div>
            ))}
            <div className="text-center text-xs text-gray-400 mt-4">All plans include a 7-day free trial</div>
         </Container>
      </div>
    );
  }

  // Variation 13: Donation / Pay What You Want
  if (variation === 13) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#4361ee] p-8">
         <Container className="max-w-md bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-blue-50 text-[#4361ee] rounded-full mx-auto mb-6 flex items-center justify-center text-2xl">♥</div>
            <TitleBlock width="60%" className="mx-auto mb-4" />
            <TextBlock lines={2} align="center" className="mb-8" />
            
            <div className="grid grid-cols-3 gap-3 mb-6">
               {['$5', '$10', '$25'].map(amt => (
                  <div key={amt} className="border border-gray-300 rounded-lg py-3 font-bold hover:bg-[#4361ee] hover:text-white hover:border-[#4361ee] cursor-pointer transition-colors">{amt}</div>
               ))}
            </div>
            
            <div className="relative mb-6">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
               <div className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg flex items-center px-8 font-bold text-gray-700">Custom Amount</div>
            </div>
            
            <ButtonBlock className="w-full" />
         </Container>
      </div>
    );
  }

  // Variation 14: Complex Features Matrix Header
  if (variation === 14) {
    return (
      <div className="w-full h-full flex flex-col bg-white overflow-hidden">
         <div className="bg-gray-50 border-b border-gray-200 p-8">
            <Container className="flex items-end justify-between">
               <div className="w-1/4 pb-4">
                  <TitleBlock width="80%" />
                  <TextBlock lines={2} />
               </div>
               <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                  {[1,2,3].map(i => (
                     <div key={i} className="flex flex-col items-center">
                        <div className="text-sm font-bold mb-2">Tier {i}</div>
                        <div className="text-2xl font-bold mb-4">${i * 15}</div>
                        <ButtonBlock className="scale-75 w-full" />
                     </div>
                  ))}
               </div>
            </Container>
         </div>
         <div className="flex-1 overflow-y-auto p-8">
            <Container className="space-y-2">
               {[1,2,3,4,5].map(row => (
                  <div key={row} className="flex py-2 border-b border-gray-100 hover:bg-gray-50">
                     <div className="w-1/4 text-sm font-medium text-gray-600 pl-4">Feature {row}</div>
                     <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                        {[1,2,3].map(col => (
                           <div key={col} className="text-xs text-gray-500">
                              {col >= 4-row ? 'Unlimited' : row % 2 === 0 ? 'Yes' : '-'}
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </Container>
         </div>
      </div>
    );
  }

  // Variation 15: Minimal Typography
  if (variation === 15) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <div className="text-center">
            <div className="text-[10rem] leading-none font-black text-[#4361ee] tracking-tighter opacity-90">$29</div>
            <div className="text-2xl font-bold text-gray-800 tracking-widest uppercase mt-4">One Price. Everything.</div>
            <div className="mt-12">
               <ButtonBlock className="px-12 py-4 h-auto text-lg" />
            </div>
            <div className="mt-8 text-sm text-gray-400">Includes all future updates</div>
         </div>
      </div>
    );
  }

  // Variation 16: Interactive Calculator
  if (variation === 16) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
         <Container className="flex gap-12 items-center bg-white p-12 rounded-2xl shadow-sm max-w-4xl">
            <div className="w-1/2 space-y-6">
               <TitleBlock width="80%" />
               <div className="space-y-4 pt-4">
                  <div>
                     <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">TEAM SIZE</div>
                     <div className="h-2 bg-gray-200 rounded-full relative">
                        <div className="w-1/2 h-full bg-[#4361ee] rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-[#4361ee] rounded-full -translate-y-1/2 -translate-x-1/2 shadow" />
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-4 h-4 border border-gray-300 rounded bg-[#4361ee]" />
                     <div className="text-xs text-gray-600">Include Analytics</div>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-4 h-4 border border-gray-300 rounded" />
                     <div className="text-xs text-gray-600">Include Priority Support</div>
                  </div>
               </div>
            </div>
            <div className="w-1/2 border-l border-gray-100 pl-12 flex flex-col justify-center text-center">
               <div className="text-sm font-bold text-gray-400 mb-2">ESTIMATED COST</div>
               <div className="text-6xl font-black text-gray-800 mb-2">$450</div>
               <div className="text-sm text-gray-400 mb-8">per month</div>
               <ButtonBlock className="w-full" />
            </div>
         </Container>
      </div>
    );
  }

  // Variation 17: Comparison Vs Competitor
  if (variation === 17) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-8">
         <Container className="grid grid-cols-3 gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-50 p-6 flex flex-col justify-center">
               <div className="font-bold text-gray-400 text-xs uppercase mb-4">Features</div>
               <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="text-sm font-bold text-gray-700">Feature {i}</div>)}
               </div>
            </div>
            <div className="bg-[#4361ee] p-6 text-white text-center relative z-10 shadow-xl transform scale-105">
               <div className="font-bold text-xs uppercase mb-4 opacity-80">Us</div>
               <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="text-sm font-bold">✓</div>)}
               </div>
               <div className="mt-8 font-black text-2xl">$20</div>
            </div>
            <div className="bg-gray-50 p-6 text-center text-gray-400">
               <div className="font-bold text-xs uppercase mb-4">Them</div>
               <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="text-sm">{i > 2 ? '×' : '✓'}</div>)}
               </div>
               <div className="mt-8 font-bold text-2xl text-gray-300">$50</div>
            </div>
         </Container>
      </div>
    );
  }

  // Variation 18: Tabbed Tiers
  if (variation === 18) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
         <div className="flex gap-2 mb-8 bg-white p-1 rounded-lg shadow-sm">
            <div className="px-6 py-2 bg-black text-white rounded font-bold text-xs cursor-pointer">Startups</div>
            <div className="px-6 py-2 text-gray-400 font-bold text-xs cursor-pointer">Agencies</div>
            <div className="px-6 py-2 text-gray-400 font-bold text-xs cursor-pointer">Enterprise</div>
         </div>
         <Container className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">🚀</div>
            <TitleBlock width="60%" className="mx-auto mb-4" />
            <TextBlock lines={2} align="center" className="mb-8" />
            <div className="text-5xl font-black text-gray-900 mb-8">$99</div>
            <ButtonBlock className="w-full mb-4" />
            <div className="text-xs text-gray-400">Includes 14-day free trial</div>
         </Container>
      </div>
    );
  }

  // Variation 19: Gradient Borders
  if (variation === 19) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 p-8">
         <Container className="grid grid-cols-3 gap-8">
            {[1,2,3].map(i => (
               <div key={i} className="p-[2px] bg-gradient-to-b from-[#4361ee] to-purple-600 rounded-xl">
                  <div className="bg-gray-900 h-full rounded-[10px] p-6 text-white flex flex-col">
                     <div className="text-xs font-bold text-[#4361ee] mb-2 uppercase">Tier {i}</div>
                     <div className="text-3xl font-bold mb-6">${i*20}</div>
                     <div className="space-y-3 mb-8 flex-1">
                        <div className="w-full h-2 bg-gray-700 rounded" />
                        <div className="w-2/3 h-2 bg-gray-700 rounded" />
                     </div>
                     <ButtonBlock className="bg-transparent border border-white/20 text-white w-full hover:bg-white hover:text-black" />
                  </div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 20: Horizontal Stack
  if (variation === 20) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
         <Container className="max-w-4xl space-y-4">
            {[1,2,3].map(i => (
               <div key={i} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-[#4361ee] transition-colors bg-white shadow-sm">
                  <div className="w-1/4">
                     <div className="font-bold text-lg">Plan {i}</div>
                     <div className="text-xs text-gray-400">Best for small teams</div>
                  </div>
                  <div className="w-1/2 px-8 flex gap-2">
                     <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Feature A</div>
                     <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Feature B</div>
                     {i > 1 && <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Feature C</div>}
                  </div>
                  <div className="w-1/4 flex items-center justify-end gap-6">
                     <div className="font-bold text-2xl">${i * 15}</div>
                     <ButtonBlock className="scale-75" />
                  </div>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 21: Dark Mode Matrix
  if (variation === 21) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black p-8 font-mono">
         <Container className="grid grid-cols-3 gap-px bg-green-900 border border-green-800">
            {[1,2,3].map(i => (
               <div key={i} className="bg-black p-6 text-green-500 flex flex-col hover:bg-[#051105] transition-colors">
                  <div className="border-b border-green-900 pb-4 mb-4">
                     <div className="text-xl">SYSTEM_0{i}</div>
                     <div className="opacity-50 text-xs">STATUS: AVAILABLE</div>
                  </div>
                  <div className="flex-1 space-y-2 text-xs mb-8 opacity-80">
                     <div>&gt; ACCESS_LEVEL: {i}</div>
                     <div>&gt; BANDWIDTH: UNLIMITED</div>
                     <div>&gt; ENCRYPTION: {i > 1 ? 'ENABLED' : 'DISABLED'}</div>

                  </div>
                  <div className="text-3xl mb-4">${i * 33}</div>
                  <button className="w-full border border-green-700 py-2 text-xs hover:bg-green-900 hover:text-white transition-colors">INITIALIZE</button>
               </div>
            ))}
         </Container>
      </div>
    );
  }

  // Variation 22: Add-on Builder
  if (variation === 22) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <Container className="max-w-3xl flex gap-8">
              <div className="w-1/2 border border-gray-200 p-8 rounded-xl shadow-lg">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-2">Base Plan</div>
                 <div className="text-5xl font-black mb-6">$20</div>
                 <TextBlock lines={3} className="mb-6" />
                 <ButtonBlock className="w-full" />
              </div>
              <div className="w-1/2">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-4">Select Add-ons</div>
                 <div className="grid grid-cols-2 gap-3">
                    {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="border border-gray-200 p-3 rounded text-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all">
                          <div className="w-6 h-6 rounded-full bg-gray-100 mx-auto mb-2" />
                          <div className="text-xs font-bold">Plugin {i}</div>
                          <div className="text-[10px] text-gray-500">+$5</div>
                       </div>
                    ))}
                 </div>
              </div>
           </Container>
        </div>
     );
  }

  // Variation 23: Floating Header
  if (variation === 23) {
     return (
        <div className="w-full h-full flex flex-col justify-center bg-gray-50 p-12">
           <Container>
               <div className="grid grid-cols-4 gap-4 mb-4">
                  <div />
                  {[1,2,3].map(i => (
                     <div key={i} className="bg-white p-4 rounded-lg shadow-md text-center transform -translate-y-2">
                        <div className="font-bold">Plan {i}</div>
                        <div className="text-blue-600 font-bold">${i * 10}</div>
                     </div>
                  ))}
               </div>
               <div className="bg-white rounded-lg shadow-sm p-8 space-y-4">
                  {[1,2,3,4,5].map(row => (
                     <div key={row} className="grid grid-cols-4 gap-4 items-center border-b border-gray-100 pb-2 last:border-0">
                        <div className="font-bold text-sm text-gray-600">Feature {row}</div>
                        {[1,2,3].map(col => (
                           <div key={col} className="text-center text-sm text-gray-400">
                              {col >= row ? '●' : '○'}
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
           </Container>
        </div>
     );
  }

  // Variation 24: Trust Focused
  if (variation === 24) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <Container className="grid grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                 <div key={i} className="border border-gray-200 p-8 rounded-xl text-center">
                    <div className="font-bold text-2xl mb-2">${i * 50}</div>
                    <div className="text-sm text-gray-500 mb-8">per month</div>
                    <ButtonBlock className="w-full mb-8" />
                    <div className="border-t border-gray-100 pt-6">
                       <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Trusted By</div>
                       <div className="flex justify-center gap-2 opacity-30 grayscale">
                          <div className="w-8 h-8 bg-gray-400 rounded-full" />
                          <div className="w-8 h-8 bg-gray-400 rounded-full" />
                          <div className="w-8 h-8 bg-gray-400 rounded-full" />
                       </div>
                    </div>
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 25: Simple Text List
  if (variation === 25) {
     return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fa] p-8">
           <TitleBlock width="30%" className="mb-12 mx-auto" />
           <div className="max-w-lg w-full space-y-8">
              {[1,2,3].map(i => (
                 <div key={i} className="flex items-baseline justify-between border-b border-gray-300 pb-2 hover:border-black transition-colors cursor-pointer group">
                    <div>
                       <span className="text-2xl font-light group-hover:font-normal">Tier 0{i}</span>
                       <span className="ml-4 text-xs text-gray-500 uppercase tracking-widest group-hover:text-black">Best for X</span>
                    </div>
                    <div className="text-xl font-bold">${i * 25}</div>
                 </div>
              ))}
           </div>
        </div>
     );
  }

  // Variation 26: Illustrated
  if (variation === 26) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-white p-8">
           <Container className="grid grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                 <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <div className={`h-32 bg-gray-100 relative ${i===1 ? 'bg-blue-50' : i===2 ? 'bg-purple-50' : 'bg-orange-50'}`}>
                       <ImageBlock className="w-full h-full opacity-50 border-none" />
                    </div>
                    <div className="p-6 text-center">
                       <div className="font-bold text-lg mb-2">Package {i}</div>
                       <div className="text-3xl font-black text-gray-800 mb-6">${i * 10}</div>
                       <ButtonBlock variant="secondary" className="w-full" />
                    </div>
                 </div>
              ))}
           </Container>
        </div>
     );
  }

  // Variation 27: FAQ Bottom
  if (variation === 27) {
     return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50 p-8">
           <Container className="mb-12 grid grid-cols-2 gap-8 max-w-4xl">
              {[1,2].map(i => (
                 <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="font-bold text-xl">${i * 100}</div>
                    <div className="text-sm text-gray-500 mb-4">Lifetime License</div>
                    <ButtonBlock className="w-full" />
                 </div>
              ))}
           </Container>
           <div className="max-w-2xl w-full text-center">
              <div className="text-xs font-bold text-gray-400 mb-4">FREQUENTLY ASKED QUESTIONS</div>
              <div className="grid grid-cols-2 gap-4 text-left">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="text-xs text-gray-600 p-2 border-l-2 border-gray-300">
                       <span className="font-bold">Question {i}?</span>
                       <p className="opacity-70 mt-1">Answer goes here.</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
     );
  }

  // Variation 28: Sticky Footer Bar
  if (variation === 28) {
     return (
        <div className="w-full h-full flex flex-col bg-white">
           <div className="flex-1 p-12 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-12 text-center">
                 {[1,2,3].map(i => (
                    <div key={i}>
                       <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4" />
                       <div className="font-bold mb-2">Feature Set {i}</div>
                       <TextBlock lines={3} align="center" />
                    </div>
                 ))}
              </div>
           </div>
           <div className="h-24 bg-gray-900 text-white flex items-center justify-between px-12">
              <div>
                 <div className="text-xs text-gray-400">Total Price</div>
                 <div className="text-2xl font-bold">$299</div>
              </div>
              <div className="flex gap-4 items-center">
                 <div className="text-xs text-gray-400">Includes all 3 sets</div>
                 <ButtonBlock className="bg-white text-black border-none" />
              </div>
           </div>
        </div>
     );
  }

  // Variation 29: Circle Layout
  if (variation === 29) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-[#4361ee] p-8 overflow-hidden">
           <div className="relative flex items-center justify-center">
              {[1,2,3].map(i => (
                 <div 
                  key={i} 
                  className={`w-48 h-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white shadow-xl transition-transform hover:scale-110 hover:bg-white/20 z-${10*i} ${i===2 ? '-mx-4 scale-110 z-20' : ''}`}
                 >
                    <div className="text-xs font-bold opacity-70 mb-1">PLAN {i}</div>
                    <div className="text-3xl font-bold mb-2">${i * 15}</div>
                    <div className="w-8 h-1 bg-white/50 rounded" />
                 </div>
              ))}
           </div>
        </div>
     );
  }

  // Variation 30: Receipt/Invoice Style
  if (variation === 30) {
     return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 p-8">
           <div className="bg-white w-80 p-6 shadow-sm relative font-mono text-sm">
              {/* Jagged top/bottom via css clip-path or simple border hacks */}
              <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                 <div className="font-bold text-xl uppercase">Invoice</div>
                 <div className="text-xs text-gray-500">Order #001</div>
              </div>
              <div className="space-y-2 mb-4">
                 <div className="flex justify-between"><span>Base Plan</span><span>$20.00</span></div>
                 <div className="flex justify-between"><span>Pro Addon</span><span>$10.00</span></div>
                 <div className="flex justify-between"><span>Tax</span><span>$3.00</span></div>
              </div>
              <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-8">
                 <div className="flex justify-between font-bold text-lg"><span>TOTAL</span><span>$33.00</span></div>
              </div>
              <ButtonBlock className="w-full bg-black text-white h-10" />
              <div className="text-center mt-4 text-[10px] text-gray-400">Thank you for your business!</div>
           </div>
        </div>
     );
  }

  // Fallback
  return <div className="p-4 text-center text-gray-400">Pricing Variation {variation}</div>;
};
