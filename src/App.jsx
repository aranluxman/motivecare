import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f2ee] font-sans selection:bg-amber-accent selection:text-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main">
        {/* Hero Section */}
        <Hero />

        {/* Industrial Trust Bar */}
        <TrustBar />

        {/* Services Section */}
        <Services />

        {/* Why Choose Us (Pinder Section) */}
        <WhyChooseUs />

        {/* Reviews Section */}
        <Reviews />

        {/* Image Gallery */}
        <Gallery />

        {/* Location & Contact Section */}
        <Location />

        {/* Action Call-to-Action Banner */}
        <section 
          className="bg-[#111111] text-white py-16 md:py-20 border-t border-zinc-900 text-left relative overflow-hidden" 
          aria-labelledby="cta-title"
        >
          {/* Subtle industrial background mesh lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
                Get Your Vehicle Checked
              </span>
              <h2 
                id="cta-title"
                className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-4"
              >
                Need a mechanic in Markham?
              </h2>
              <p className="font-sans text-lg text-zinc-400 mb-8 max-w-xl">
                Call Motive Care before your next repair, maintenance visit, or parts question. Speak to Pinder and get a fair estimate.
              </p>
              <a
                href="tel:+19052010087"
                className="inline-flex items-center justify-center font-display text-xl uppercase tracking-wider bg-amber-accent hover:bg-amber-accent-hover text-white px-8 py-3.5 min-h-[44px] transition-colors duration-200 skew-x-[-10deg]"
              >
                <span className="skew-x-[10deg] flex items-center gap-2.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Call (905) 201-0087
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
