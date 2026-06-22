import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-zinc-800 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand/Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-accent focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded">
          <div className="bg-amber-accent text-white font-display text-2xl px-3 py-1 flex items-center justify-center tracking-wider skew-x-[-10deg] group-hover:bg-amber-accent-hover transition-colors duration-200">
            MC
          </div>
          <span className="font-display text-2xl tracking-wider text-white uppercase group-hover:text-amber-accent transition-colors duration-200">
            Motive Care
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main menu">
          <a href="#services" className="font-sans text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-amber-accent transition-colors duration-200">
            Services
          </a>
          <a href="#reviews" className="font-sans text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-amber-accent transition-colors duration-200">
            Reviews
          </a>
          <a href="#gallery" className="font-sans text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-amber-accent transition-colors duration-200">
            Photos
          </a>
          <a href="#location" className="font-sans text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-amber-accent transition-colors duration-200">
            Location
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="tel:+19052010087"
            className="inline-flex items-center justify-center font-display text-lg uppercase tracking-wider bg-amber-accent hover:bg-amber-accent-hover text-white px-6 py-2.5 min-h-[44px] transition-colors duration-200 skew-x-[-10deg] group"
          >
            <span className="skew-x-[10deg] flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              (905) 201-0087
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 p-2 rounded text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-accent"
          aria-expanded={isOpen}
          aria-label="Toggle main menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Slideout Navigation */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[#141414] border-l border-zinc-800 z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-12">
            <a href="#" onClick={toggleMenu} className="flex items-center gap-3">
              <div className="bg-amber-accent text-white font-display text-xl px-2.5 py-0.5 flex items-center justify-center tracking-wider skew-x-[-10deg]">
                MC
              </div>
              <span className="font-display text-xl tracking-wider text-white uppercase">
                Motive Care
              </span>
            </a>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-accent rounded"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col gap-6" aria-label="Mobile menu">
            <a
              href="#services"
              onClick={toggleMenu}
              className="font-sans text-lg font-bold text-zinc-100 hover:text-amber-accent transition-colors duration-200 py-2 border-b border-zinc-850"
            >
              Services
            </a>
            <a
              href="#reviews"
              onClick={toggleMenu}
              className="font-sans text-lg font-bold text-zinc-100 hover:text-amber-accent transition-colors duration-200 py-2 border-b border-zinc-850"
            >
              Reviews
            </a>
            <a
              href="#gallery"
              onClick={toggleMenu}
              className="font-sans text-lg font-bold text-zinc-100 hover:text-amber-accent transition-colors duration-200 py-2 border-b border-zinc-850"
            >
              Photos
            </a>
            <a
              href="#location"
              onClick={toggleMenu}
              className="font-sans text-lg font-bold text-zinc-100 hover:text-amber-accent transition-colors duration-200 py-2 border-b border-zinc-850"
            >
              Location
            </a>
          </nav>
        </div>

        {/* Mobile CTA */}
        <div className="mt-auto">
          <a
            href="tel:+19052010087"
            className="flex items-center justify-center gap-3 font-display text-xl uppercase tracking-wider bg-amber-accent hover:bg-amber-accent-hover text-white py-3.5 rounded w-full min-h-[44px] transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            (905) 201-0087
          </a>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden"
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
}
