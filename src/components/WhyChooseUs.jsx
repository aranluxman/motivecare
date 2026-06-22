import React from 'react';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#1a1a1a] text-white border-t border-zinc-900" aria-labelledby="why-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Large Text Column (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
              The Motive Care Standard
            </span>
            
            <h2 
              id="why-title"
              className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6"
            >
              Honest advice before the wrench turns.
            </h2>
            
            <p className="font-sans text-lg text-zinc-300 leading-relaxed max-w-2xl">
              At Motive Care, our reputation is built on Pinder — a mechanic known throughout Markham for integrity, direct answers, and fair pricing. For over 15 years, drivers have trusted Pinder for genuine advice. If a part doesn't need to be replaced, he will tell you plainly. We don't believe in high-pressure upsells, just quality repairs that keep your vehicle safe.
            </p>
          </div>

          {/* Right: Bullet Points Column (5 cols) */}
          <div className="lg:col-span-5 text-left lg:pt-12">
            <ul className="flex flex-col gap-6">
              
              {/* Bullet 1 */}
              <li className="flex gap-4 border-l-2 border-amber-accent pl-4">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wider text-amber-accent mb-1">
                    Direct Access to Pinder
                  </h3>
                  <p className="font-sans text-sm text-zinc-400">
                    No middlemen or commission-based service writers. Speak directly to the mechanic handling your car.
                  </p>
                </div>
              </li>

              {/* Bullet 2 */}
              <li className="flex gap-4 border-l-2 border-amber-accent pl-4">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wider text-white mb-1">
                    Fair, Practical Explanations
                  </h3>
                  <p className="font-sans text-sm text-zinc-400">
                    We explain the root cause of issues, separating urgent safety repairs from long-term maintenance items.
                  </p>
                </div>
              </li>

              {/* Bullet 3 */}
              <li className="flex gap-4 border-l-2 border-amber-accent pl-4">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wider text-white mb-1">
                    No Unnecessary Work
                  </h3>
                  <p className="font-sans text-sm text-zinc-400">
                    We only recommend parts and labor that your vehicle actually requires to stay roadworthy and safe.
                  </p>
                </div>
              </li>

              {/* Bullet 4 */}
              <li className="flex gap-4 border-l-2 border-amber-accent pl-4">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wider text-white mb-1">
                    Payment Flexibility
                  </h3>
                  <p className="font-sans text-sm text-zinc-400">
                    Fully equipped to accept credit, debit, and tap at the counter for seamless checkout.
                  </p>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
