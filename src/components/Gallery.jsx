import React from 'react';

/* Every frame shows work actually being done on a vehicle — hands, tools, a
   mechanic at the car — rather than a parked car or a detached part. */
const IMAGES = [
  {
    id: 'photo-1599474151975-1f978922fa02',
    alt: 'Mechanic working underneath a car raised on a hoist in a repair bay',
    span: 'lg:col-span-2 lg:row-span-2',
    ratio: 'aspect-4/3 lg:aspect-auto lg:h-full',
  },
  {
    id: 'photo-1568644305664-5c7c2f88fa65',
    alt: 'Mechanic servicing a wheel hub and brake rotor with the wheel removed',
    ratio: 'aspect-square',
  },
  {
    id: 'photo-1643700973089-baa86a1ab9ee',
    alt: 'Mechanic inspecting the underside of a vehicle on a lift in the workshop',
    ratio: 'aspect-square',
  },
  {
    id: 'photo-1632733711679-529326f6db12',
    alt: 'Technician testing a vehicle fuse box and wiring with a hand tool',
    ratio: 'aspect-square',
  },
  {
    id: 'photo-1628577478162-d4d00467c627',
    alt: 'Mechanic repairing interior trim and wiring inside a customer vehicle',
    ratio: 'aspect-square',
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 md:py-28 bg-[#1a1a1a] text-white border-t border-zinc-900"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 border-l-4 border-amber-accent pl-6 text-left">
          <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-2">
            Inside the Shop
          </span>
          <h2
            id="gallery-title"
            className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white leading-none"
          >
            Hands on the car, not just parked in a bay.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr gap-4 md:gap-6">
          {IMAGES.map((img, index) => (
            <figure
              key={img.id}
              className={`relative overflow-hidden border-2 border-zinc-800 bg-[#141414] group
                          transition-colors duration-300 hover:border-amber-accent
                          ${img.span ?? ''} ${img.ratio}`}
            >
              <img
                src={`https://images.unsplash.com/${img.id}?auto=format&fit=crop&w=1000&q=75`}
                alt={img.alt}
                className="w-full h-full object-cover opacity-85 saturate-[0.85]
                           group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-[1.04]
                           transition-[opacity,transform,filter] duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                           motion-reduce:transition-opacity motion-reduce:group-hover:scale-100"
                width="1000"
                height="750"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />

              {/* Measurement-mark corners, kept as shop detailing */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
