import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-zinc-400 border-t border-zinc-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-850 pb-8 mb-8 text-left">
          
          {/* Shop branding info */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-amber-accent text-white font-display text-lg px-2.5 py-0.5 flex items-center justify-center tracking-wider skew-x-[-10deg]">
                MC
              </div>
              <span className="font-display text-xl tracking-wider text-white uppercase">
                Motive Care
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              Auto Repair Shop · Markham, Ontario
            </p>
          </div>

          {/* Contact and address quick links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a 
              href="tel:+19052010087" 
              className="font-sans text-sm font-semibold hover:text-amber-accent transition-colors duration-150 min-h-[44px] flex items-center"
            >
              (905) 201-0087
            </a>
            <a 
              href="https://www.google.com/maps/place/Motive+Care/" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold hover:text-amber-accent transition-colors duration-150 min-h-[44px] flex items-center"
            >
              Google Maps Location
            </a>
          </div>

        </div>

        {/* Bottom copyright alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-zinc-650 text-left">
          <p>
            &copy; {new Date().getFullYear()} Motive Care. All rights reserved.
          </p>
          <p>
            20 Heritage Rd, Markham, ON L3P 3P3
          </p>
        </div>

      </div>
    </footer>
  );
}
