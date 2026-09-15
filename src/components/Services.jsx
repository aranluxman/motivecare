import React from 'react';

/* Compact stroke icons kept inline so the grid costs no extra requests. */
const Icon = {
  scan: 'M12 3v2m0 14v2m9-9h-2M5 12H3m2.6-6.4 1.5 1.5m9.8 9.8 1.5 1.5m0-12.8-1.5 1.5m-9.8 9.8-1.5 1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  brake: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0-5.5v5.5m6.4 3.5H15.5m-1.7 5.6-1.8-3M6.5 12h3m1.8 5.6 1.8-3',
  tire: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 3v4.2m9 4.8h-4.2M12 21v-4.2M3 12h4.2',
  align: 'M4 7h16M4 17h16M9 4v6m6 4v6M7.5 12.5 12 17l4.5-4.5',
  oil: 'M7 6h7l3 3v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2Zm10 3h2.5a1.5 1.5 0 0 1 1.5 1.5V13M9 3h4',
  battery: 'M3 9h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm18 2v2M7 6v3m8-3v3m-8 3.5h3M8.5 11v3',
  alternator: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  suspension: 'M12 3v3m0 12v3M8 7h8M8 17h8m-6-7 4 3m-4 0 4-3m-4-3 4 3m-4 4 4 3',
  exhaust: 'M3 15h10a3 3 0 0 0 3-3V9m0 0h4m-4 0-1.5-2M17 9l-1.5 2M6 15v3m4-3v3m-7-3v-2a2 2 0 0 1 2-2h2',
  climate: 'M12 3v18m9-9H3m6.5-5.5L12 9l2.5-2.5M9.5 17.5 12 15l2.5 2.5M4.8 7.2l3.4 1M19.2 7.2l-3.4 1M4.8 16.8l3.4-1m11 1-3.4-1',
  belt: 'M8 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 4h10M8 20h10M4 12h.01',
  engine: 'M5 11h2V8h4V6h4v2h2l2 3h2v5h-2v3H9v-3H7v2H3v-6h2Zm6-5V4h2v2',
  transmission: 'M6 5v14M12 5v14m6-14v14M5 5h14M6 12h12M6 9h.01M18 9h.01',
  clipboard: 'M9 4h6v3H9V4Zm-2 1.5H6a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5a2 2 0 0 0-2-2h-1M8.5 12.5l2 2 4-4',
  snow: 'M12 3v18M3.8 7.5l16.4 9M20.2 7.5l-16.4 9M12 7l-2.5-2M12 7l2.5-2m-2.5 12-2.5 2m2.5-2 2.5 2M6.7 10.2 3.3 9.9m3.4.3-1 3.2m11.6-3.2 3.4-.3m-3.4.3 1 3.2',
  parts: 'M10.5 3.5 9 6l-3-1-2 3 2.2 2.2a5.5 5.5 0 0 0 0 1.6L4 14l2 3 3-1 1.5 2.5h3L15 16l3 1 2-3-2.2-2.2a5.5 5.5 0 0 0 0-1.6L20 8l-2-3-3 1-1.5-2.5h-3ZM12 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
};

const SERVICES = [
  { icon: 'scan', title: 'Computer Diagnostics', desc: 'Check-engine lights, warning messages, stored fault codes, and drivability complaints traced to the actual cause.' },
  { icon: 'brake', title: 'Brake Service & Repair', desc: 'Pads, rotors, calipers, brake lines, fluid flushes, and pedal or vibration complaints inspected for safety.' },
  { icon: 'tire', title: 'Tires & Balancing', desc: 'Mounting, balancing, puncture and flat repair, tread and pressure checks, plus TPMS sensor service.' },
  { icon: 'align', title: 'Wheel Alignment', desc: 'Pulling, crooked steering wheels, and uneven tire wear corrected back to manufacturer specification.' },
  { icon: 'oil', title: 'Oil & Fluid Changes', desc: 'Engine oil and filter, coolant, brake and transmission fluid, plus a full top-up and service-interval reset.' },
  { icon: 'battery', title: 'Batteries & Charging', desc: 'Battery testing and replacement, no-start diagnosis, terminal cleaning, and charging-system checks.' },
  { icon: 'alternator', title: 'Starters & Alternators', desc: 'Cranking faults, charging warning lights, wiring and ignition issues on both older and newer vehicles.' },
  { icon: 'suspension', title: 'Suspension & Steering', desc: 'Shocks, struts, springs, control arms, bushings, tie rods, and ball joints for clunks and rough rides.' },
  { icon: 'exhaust', title: 'Exhaust & Mufflers', desc: 'Mufflers, pipes, flex joints, and leaks fixed to quiet the car and keep it emissions-ready.' },
  { icon: 'climate', title: 'A/C & Heating', desc: 'Air conditioning recharge and leak checks, heater and blower faults, and cabin air filter replacement.' },
  { icon: 'belt', title: 'Belts & Hoses', desc: 'Serpentine and timing belts, tensioners, pulleys, coolant hoses, and squeal or overheating diagnosis.' },
  { icon: 'engine', title: 'Engine Repair', desc: 'Misfires, rough idle, oil and coolant leaks, gaskets, sensors, and tune-ups handled in-house.' },
  { icon: 'transmission', title: 'Transmission Service', desc: 'Fluid and filter service, shifting complaints, slipping, and clutch or driveline inspection.' },
  { icon: 'clipboard', title: 'Pre-Purchase Inspection', desc: 'Buying used? Get an honest mechanical opinion on the car before you hand over any money.' },
  { icon: 'snow', title: 'Seasonal Tire Changeover', desc: 'Winter and summer swaps timed for Ontario weather, with wheel torque and condition checks.' },
  { icon: 'parts', title: 'Motor Parts Sourcing', desc: 'Quality OEM and aftermarket parts found and priced, with straight guidance and no sales pressure.' },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#f5f2ee] text-[#1a1a1a]"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#1a1a1a] pb-8">
          <div className="max-w-xl text-left">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
              What We Do
            </span>
            <h2
              id="services-title"
              className="font-display text-5xl md:text-7xl uppercase tracking-tight text-[#1a1a1a] leading-none"
            >
              Services
            </h2>
          </div>
          <p className="font-sans text-zinc-600 max-w-sm text-left md:text-right">
            Everything from a warning light to a full mechanical repair, handled in one shop on Heritage Rd. Not sure what you need? Call and describe it.
          </p>
        </div>

        {/* Service grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-300 border border-zinc-300">
          {SERVICES.map((service) => (
            <li
              key={service.title}
              className="group bg-[#f5f2ee] hover:bg-white p-6 md:p-7 text-left transition-colors duration-200 flex flex-col"
            >
              <span
                className="w-11 h-11 flex items-center justify-center bg-[#1a1a1a] text-amber-accent mb-5 shrink-0 group-hover:bg-amber-accent group-hover:text-white transition-colors duration-200"
                aria-hidden="true"
              >
                <svg
                  className="w-5.5 h-5.5"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={Icon[service.icon]} />
                </svg>
              </span>

              <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide text-[#1a1a1a] mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                {service.desc}
              </p>
            </li>
          ))}
        </ul>

        {/* Catch-all: the list is long, but it is never going to be complete. */}
        <p className="font-sans text-sm text-zinc-600 mt-8 text-left">
          Don't see your problem listed?{' '}
          <a
            href="tel:+19052010087"
            className="font-bold text-[#1a1a1a] underline decoration-amber-accent decoration-2 underline-offset-4 hover:text-amber-accent transition-colors duration-150"
          >
            Call (905) 201-0087
          </a>{' '}
          and describe what the car is doing — if it is not something we handle, we will tell you who does.
        </p>
      </div>
    </section>
  );
}
