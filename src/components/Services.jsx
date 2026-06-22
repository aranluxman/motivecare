import React from 'react';

export default function Services() {
  const servicesList = [
    {
      num: '01',
      title: 'Diagnostics',
      desc: 'Check-engine lights, warning messages, noises, leaks, and drivability concerns checked clearly using modern scanning tools.',
    },
    {
      num: '02',
      title: 'Brake Repair',
      desc: 'Brake pads, rotors, caliper servicing, fluid flushes, pedal responsiveness, vibration diagnostics, and safety inspections.',
    },
    {
      num: '03',
      title: 'Tires & Alignment',
      desc: 'Seasonal tire changes, mounting, balancing, wear inspection, pressure monitoring systems, and alignment troubleshooting.',
    },
    {
      num: '04',
      title: 'Oil Changes',
      desc: 'Routine oil and filter replacement, fluid check-ups, interval resets, and overall vehicle health check to prevent wear.',
    },
    {
      num: '05',
      title: 'Electrical & Engine',
      desc: 'Battery testing, starter and alternator replacement, wiring issues, and ignition system diagnostics for old and new vehicles.',
    },
    {
      num: '06',
      title: 'Motor Parts',
      desc: 'Sourcing quality aftermarket and OEM parts, mechanical repair planning, and expert guidance without sales pressure.',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#f5f2ee] text-[#1a1a1a]" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Asymmetric Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#1a1a1a] pb-8">
          <div className="max-w-xl text-left">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
              Professional Solutions
            </span>
            <h2 
              id="services-title"
              className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a]"
            >
              Complete Auto Care Without the Runaround.
            </h2>
          </div>
          <p className="font-sans text-zinc-600 max-w-sm text-left md:text-right">
            From emergency warning lights to scheduled fluid maintenance, we diagnose and resolve issues with complete transparency.
          </p>
        </div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {servicesList.map((service, index) => {
            // Give even cards a slight top shift on desktop to create an asymmetric offset flow
            const offsetClass = index % 2 === 1 ? 'md:translate-y-8' : '';
            return (
              <article 
                key={service.num} 
                className={`group flex gap-6 text-left border-l-2 border-zinc-300 hover:border-amber-accent pl-6 transition-all duration-300 ${offsetClass}`}
              >
                {/* Number Accent */}
                <div className="font-display text-4xl md:text-5xl text-zinc-400 group-hover:text-amber-accent transition-colors duration-300 select-none leading-none pt-1">
                  {service.num}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-[#1a1a1a] mb-3 group-hover:text-amber-accent transition-colors duration-250">
                    {service.title}
                  </h3>
                  <p className="font-sans text-zinc-600 text-sm md:text-base leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Spacer to balance the asymmetric bottom offset */}
        <div className="hidden md:block h-8" />

      </div>
    </section>
  );
}
