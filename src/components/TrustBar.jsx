import React from 'react';

export default function TrustBar() {
  return (
    <section 
      className="bg-[#222222] border-y border-zinc-800 text-white relative z-30" 
      aria-label="Shop highlights"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left divide-y lg:divide-y-0 lg:divide-x divide-zinc-850">
          
          {/* Stat 1 */}
          <div className="flex flex-col justify-center lg:pr-8">
            <span className="font-display text-3xl md:text-4xl text-amber-accent tracking-wider uppercase">
              4.7 STARS
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-1">
              Google Customer Rating
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col justify-center pt-4 lg:pt-0 lg:px-8">
            <span className="font-display text-3xl md:text-4xl text-white tracking-wider uppercase">
              98+ REVIEWS
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-1">
              Verified Public Feedback
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col justify-center pt-4 lg:pt-0 lg:px-8">
            <span className="font-display text-2xl md:text-3xl text-white tracking-wider uppercase leading-none">
              APPOINTMENTS
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-semibold mt-1.5">
              Recommended Call Ahead
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col justify-center pt-4 lg:pt-0 lg:pl-8">
            <span className="font-display text-2xl md:text-3xl text-white tracking-wider uppercase leading-none">
              HONEST PRICING
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-1.5">
              No Unnecessary Upsells
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
