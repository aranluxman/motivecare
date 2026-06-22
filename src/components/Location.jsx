import React from 'react';

export default function Location() {
  return (
    <section id="location" className="py-20 md:py-28 bg-[#f5f2ee] text-[#1a1a1a]" aria-labelledby="location-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: Business Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
                Find Motive Care
              </span>
              
              <h2 
                id="location-title"
                className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#1a1a1a] mb-6 leading-none"
              >
                20 Heritage Rd,<br />Markham, ON L3P 3P3
              </h2>
              
              <p className="font-sans text-zinc-600 text-sm md:text-base mb-10 leading-relaxed max-w-md">
                Appointments are highly recommended. Call ahead so Pinder and the team can plan the right inspection path and check parts availability for your vehicle.
              </p>
            </div>

            {/* Structured details list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t-2 border-zinc-200 pt-8 mt-auto">
              
              {/* Phone Info */}
              <div className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-wider text-zinc-400 mb-1">
                  Phone Number
                </span>
                <a 
                  href="tel:+19052010087" 
                  className="font-sans text-lg font-bold text-[#1a1a1a] hover:text-amber-accent transition-colors duration-150 min-h-[44px] flex items-center"
                >
                  (905) 201-0087
                </a>
              </div>

              {/* Directions Link */}
              <div className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-wider text-zinc-400 mb-1">
                  Get Directions
                </span>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Motive+Care+20+Heritage+Rd+Markham+ON"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-lg font-bold text-[#e07b00] hover:text-amber-accent-hover transition-colors duration-150 min-h-[44px] flex items-center"
                >
                  Open Google Maps
                </a>
              </div>

              {/* Payments Accepted */}
              <div className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-wider text-zinc-400 mb-1">
                  Payments Accepted
                </span>
                <span className="font-sans text-sm font-semibold text-zinc-700 min-h-[44px] flex items-center">
                  Credit, Debit, Mobile Tap
                </span>
              </div>

              {/* Shop Hours Note */}
              <div className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-wider text-zinc-400 mb-1">
                  Availability
                </span>
                <span className="font-sans text-sm font-semibold text-zinc-700 min-h-[44px] flex items-center">
                  Call ahead to confirm hours
                </span>
              </div>

            </div>
          </div>

          {/* Right Side: Map Embed (7 cols) */}
          <div className="lg:col-span-7 min-h-[350px] lg:min-h-[450px] relative border-2 border-zinc-300">
            <iframe
              title="Interactive map to Motive Care at 20 Heritage Rd in Markham"
              src="https://www.google.com/maps?q=Motive%20Care%2020%20Heritage%20Rd%20Markham%20ON&output=embed"
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
