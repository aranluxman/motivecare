import React from 'react';

export default function Gallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80',
      alt: 'Automotive tools and air impact wrench on workbench in repair shop',
    },
    {
      src: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=900&q=80',
      alt: 'Clean car engine compartment undergoing routine mechanical service',
    },
    {
      src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
      alt: 'Auto repair shop bay with hydraulic lift and mechanics equipment',
    },
    {
      src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
      alt: 'Passenger car inspected on lift in clean modern garage workspace',
    },
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#1a1a1a] text-white border-t border-zinc-900" aria-labelledby="gallery-title">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="mb-12 border-l-4 border-amber-accent pl-6 text-left">
          <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-2">
            Inside the Shop
          </span>
          <h2 
            id="gallery-title"
            className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white"
          >
            Mechanic imagery that matches the service.
          </h2>
        </div>

        {/* 4-Image Grid with Asymmetric Visual Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, index) => {
            // Apply different aspect ratios to create subtle visual asymmetry
            const aspectClass = index % 2 === 0 ? 'aspect-4/3' : 'aspect-square';
            return (
              <div 
                key={index} 
                className={`relative overflow-hidden border-2 border-zinc-800 bg-[#141414] group transition-all duration-300 hover:border-amber-accent ${aspectClass}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out mix-blend-luminosity hover:mix-blend-normal"
                  width="500"
                  height="375"
                  loading="lazy"
                />
                
                {/* Border corner details to look like measurement markings */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700 pointer-events-none group-hover:border-amber-accent transition-colors duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
