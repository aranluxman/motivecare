import React, { useRef } from 'react';

export default function Reviews() {
  const scrollContainerRef = useRef(null);

  const reviews = [
    {
      text: 'Pinder is excellent. He really knows his work and is extremely reliable and trustworthy.',
      author: 'Motive Care customer',
      stars: 5,
    },
    {
      text: 'Pinder is the kind of person you hope to find when your car needs repairs. Him and his team really go above and beyond.',
      author: 'Simra Niz',
      stars: 5,
    },
    {
      text: 'I know Pinder for the last more than 15 years. My family and friends get auto service from his garage and is satisfactory and professional.',
      author: 'Suryakant Patel',
      stars: 5,
    },
    {
      text: 'I have not went to a more professional and caring mechanic in my life. He knows the ins and outs of all the old cars and new cars.',
      author: 'Ahmed Ghumman',
      stars: 5,
    },
    {
      text: 'I was referred by a friend to this mechanic shop. Overall, it is good.',
      author: 'Ozzy Ak',
      stars: 5,
    },
    {
      text: 'Always honest and reasonable. He will only commit to work that he can do and provide service on time.',
      author: 'Tanaksh Modi',
      stars: 5,
    },
    {
      text: 'Pinders been my guy for 15 years and have taken 5 cars and countless referrals to him.',
      author: 'G__therealest',
      stars: 5,
    },
    {
      text: "Pinder immediately found out what needed to be replaced to eliminate some noise coming from my car that other mechanics couldn't find.",
      author: 'Chahatpreet Singh Batth',
      stars: 5,
    },
    {
      text: "Very knowledgeable and accommodative. Very helpful and affordable prices. He won't charge you unnecessarily.",
      author: 'Nishit Dave',
      stars: 5,
    },
    {
      text: "Pinder is a great mechanic who offers genuine advice. If something doesn't need to be fixed, he'll tell you and won't try to up-sell.",
      author: 'Soumiel',
      stars: 5,
    },
    {
      text: 'I went there for Flat tire repair. Pinder is a good guy. He fixed it quickly and even changed back the spare wheel.',
      author: 'Syed Uzair Ahmed',
      stars: 5,
    },
    {
      isSummary: true,
      text: 'Drivers repeatedly mention trustworthy service, fair pricing, quick help, and practical advice for both old and new cars.',
      author: '98 public Google reviews',
      stars: 5,
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#f5f2ee] text-[#1a1a1a] overflow-hidden" aria-labelledby="reviews-title">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[#1a1a1a] pb-8">
          <div className="text-left max-w-xl">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
              Customer Feedback
            </span>
            <h2 
              id="reviews-title"
              className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a]"
            >
              Public reviews people keep sharing.
            </h2>
          </div>

          {/* Navigation Skewed Arrows */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 flex items-center justify-center border-2 border-zinc-800 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200 skew-x-[-10deg] focus:outline-none focus:ring-2 focus:ring-amber-accent"
              aria-label="Scroll reviews left"
            >
              <svg className="w-5 h-5 skew-x-[10deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 flex items-center justify-center border-2 border-zinc-800 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200 skew-x-[-10deg] focus:outline-none focus:ring-2 focus:ring-amber-accent"
              aria-label="Scroll reviews right"
            >
              <svg className="w-5 h-5 skew-x-[10deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar -mx-6 px-6"
          role="region"
          aria-label="Reviews slider"
        >
          {reviews.map((rev, index) => (
            <article 
              key={index}
              className={`flex-none w-[320px] md:w-[360px] p-8 bg-[#1a1a1a] text-white flex flex-col justify-between snap-start border-b-4 border-amber-accent hover:border-white transition-colors duration-300 ${
                rev.isSummary ? 'bg-amber-accent text-white border-b-4 border-white' : ''
              }`}
            >
              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-6" aria-label={`${rev.stars} out of 5 stars`}>
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg font-bold leading-none ${
                        rev.isSummary ? 'text-white' : 'text-amber-accent'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className={`font-sans text-sm md:text-base italic leading-relaxed mb-8 ${
                  rev.isSummary ? 'font-semibold not-italic' : 'text-zinc-300'
                }`}>
                  "{rev.text}"
                </blockquote>
              </div>

              {/* Reviewer / Source Info */}
              <div className="border-t border-zinc-800 pt-4 flex justify-between items-center mt-auto">
                <span className={`font-sans text-xs uppercase tracking-widest font-extrabold ${
                  rev.isSummary ? 'text-white' : 'text-zinc-400'
                }`}>
                  {rev.author}
                </span>
                
                {/* Verified tag */}
                {!rev.isSummary && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#e07b00]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Google
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
