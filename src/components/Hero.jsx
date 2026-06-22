import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-[#111] overflow-hidden text-white" aria-labelledby="hero-title">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&q=80"
        alt="Automotive mechanic working on vehicle engine block inside shop"
        width="1400"
        height="900"
        loading="eager"
      />
      
      {/* Heavy industrial dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 z-20 w-full flex flex-col justify-center">
        <div className="max-w-3xl text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border-l-4 border-amber-accent pl-3 mb-6">
            <span className="font-sans text-xs md:text-sm uppercase tracking-widest font-extrabold text-amber-accent">
              Trusted Markham Shop · 20 Heritage Rd
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            id="hero-title"
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none uppercase tracking-wide text-white mb-6 select-none"
          >
            Auto repair in Markham,<br />
            <span className="text-amber-accent block mt-1">handled with care.</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl">
            Diagnostics, brakes, tires, oil changes, electrical concerns, motor parts, and straight answers from a mechanic shop customers keep recommending. 
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 mb-12">
            <a
              href="tel:+19052010087"
              className="inline-flex items-center justify-center font-display text-xl uppercase tracking-wider bg-amber-accent hover:bg-amber-accent-hover text-white px-8 py-3.5 min-h-[44px] transition-colors duration-200 skew-x-[-10deg]"
            >
              <span className="skew-x-[10deg] flex items-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call to Book
              </span>
            </a>
            
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Motive+Care+20+Heritage+Rd+Markham+ON"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-display text-xl uppercase tracking-wider border-2 border-zinc-500 hover:border-white text-zinc-300 hover:text-white px-8 py-3 min-h-[44px] transition-colors duration-200 skew-x-[-10deg]"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                Get Directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </a>
          </div>

          {/* Quick Rating Summary */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-zinc-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-white">
              <span className="text-amber-accent text-lg">★</span> 4.7 Google Rating
            </span>
            <span className="hidden sm:inline text-zinc-650">•</span>
            <a href="#reviews" className="hover:text-amber-accent transition-colors duration-150">
              98+ Verified Reviews
            </a>
            <span className="hidden sm:inline text-zinc-650">•</span>
            <span>Markham, ON</span>
          </div>
        </div>
      </div>

      {/* Decorative mechanical mesh background detail (subtle) */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-accent/5 blur-3xl pointer-events-none z-0" />
    </section>
  );
}
