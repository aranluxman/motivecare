import React from 'react';

const HIGHLIGHTS = [
  { value: '4.7 Stars', label: 'Google customer rating', accent: true },
  { value: '98+ Reviews', label: 'Verified public feedback' },
  { value: '15+ Years', label: 'Trusted by Markham drivers', accent: true },
  { value: 'All Makes', label: 'Domestic and import vehicles' },
  { value: 'Honest Pricing', label: 'No unnecessary upsells', accent: true },
  { value: 'Appointments', label: 'Call ahead to book a bay' },
  { value: 'Tap · Debit · Credit', label: 'Payments at the counter' },
  { value: 'Talk To The Mechanic', label: 'No commissioned service writers', accent: true },
];

function Highlight({ value, label, accent }) {
  return (
    <div className="flex items-center gap-5 px-8 shrink-0">
      <span className="text-amber-accent text-lg leading-none select-none" aria-hidden="true">
        ◆
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl md:text-3xl tracking-wider uppercase whitespace-nowrap ${
            accent ? 'text-amber-accent' : 'text-white'
          }`}
        >
          {value}
        </span>
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400 font-semibold mt-1.5 whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section
      className="bg-[#222222] border-y border-zinc-800 text-white relative z-30 py-6 md:py-7"
      aria-label="Shop highlights"
    >
      <div className="marquee-rail marquee-fade overflow-hidden">
        <div className="marquee animate-marquee [animation-duration:38s]">
          {/* Pass one: the real, readable content. */}
          <div className="flex items-center">
            {HIGHLIGHTS.map((item) => (
              <Highlight key={item.value} {...item} />
            ))}
          </div>
          {/* Pass two: a visual duplicate that makes the loop seamless. Hidden
              from assistive tech so the facts are not announced twice. */}
          <div className="flex items-center marquee-duplicate" aria-hidden="true">
            {HIGHLIGHTS.map((item) => (
              <Highlight key={`dup-${item.value}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
