import React, { useCallback, useEffect, useRef, useState } from 'react';

/* Verbatim excerpts from the shop's public Google reviews. */
const REVIEWS = [
  { text: 'Pinder is excellent. He really knows his work and is extremely reliable and trustworthy.', author: 'Motive Care customer', stars: 5 },
  { text: 'Pinder is the kind of person you hope to find when your car needs repairs. Him and his team really go above and beyond.', author: 'Simra Niz', stars: 5 },
  { text: 'I know Pinder for the last more than 15 years. My family and friends get auto service from his garage and is satisfactory and professional.', author: 'Suryakant Patel', stars: 5 },
  { text: 'I have not went to a more professional and caring mechanic in my life. He knows the ins and outs of all the old cars and new cars.', author: 'Ahmed Ghumman', stars: 5 },
  { text: 'I was referred by a friend to this mechanic shop. Overall, it is good.', author: 'Ozzy Ak', stars: 5 },
  { text: 'Always honest and reasonable. He will only commit to work that he can do and provide service on time.', author: 'Tanaksh Modi', stars: 5 },
  { text: 'Pinders been my guy for 15 years and have taken 5 cars and countless referrals to him.', author: 'G__therealest', stars: 5 },
  { text: "Pinder immediately found out what needed to be replaced to eliminate some noise coming from my car that other mechanics couldn't find.", author: 'Chahatpreet Singh Batth', stars: 5 },
  { text: "Very knowledgeable and accommodative. Very helpful and affordable prices. He won't charge you unnecessarily.", author: 'Nishit Dave', stars: 5 },
  { text: "Pinder is a great mechanic who offers genuine advice. If something doesn't need to be fixed, he'll tell you and won't try to up-sell.", author: 'Soumiel', stars: 5 },
  { text: 'I went there for Flat tire repair. Pinder is a good guy. He fixed it quickly and even changed back the spare wheel.', author: 'Syed Uzair Ahmed', stars: 5 },
];

/* Split across two rails that travel in opposite directions. */
const RAIL_ONE = REVIEWS.slice(0, 6);
const RAIL_TWO = REVIEWS.slice(6);

function Stars({ count, className = 'text-amber-accent' }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-base leading-none" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, onOpen, duplicate }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Read the full review from ${review.author}`}
      className="group/card mx-3 flex-none w-[300px] sm:w-[340px] text-left bg-[#1a1a1a] text-white p-7 border-b-4 border-amber-accent
                 flex flex-col justify-between cursor-pointer
                 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                 hover:-translate-y-1 hover:bg-[#232323] hover:border-white active:translate-y-0 active:scale-[0.985]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2ee]"
    >
      <div>
        <Stars count={review.stars} />
        <blockquote className="font-sans text-sm md:text-base leading-relaxed text-zinc-200 mt-5 line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-700 flex items-center justify-between gap-3">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.18em] font-extrabold text-zinc-400 truncate">
          {review.author}
        </span>
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.18em] font-extrabold text-amber-accent whitespace-nowrap flex items-center gap-1 group-hover/card:gap-1.5 transition-[gap] duration-200">
          Read full
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function Rail({ items, reverse, duration, onOpen }) {
  const animation = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  return (
    <div className="marquee-rail marquee-fade overflow-hidden py-3">
      <div className={`marquee ${animation}`} style={{ animationDuration: `${duration}s` }}>
        <div className="flex">
          {items.map((review) => (
            <ReviewCard key={review.author} review={review} onOpen={onOpen} />
          ))}
        </div>
        {/* Seamless-loop duplicate: hidden from assistive tech and untabbable. */}
        <div className="flex marquee-duplicate" aria-hidden="true">
          {items.map((review) => (
            <ReviewCard key={`dup-${review.author}`} review={review} onOpen={onOpen} duplicate />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewDialog({ review, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [shown, setShown] = useState(false);

  // Materialize on the next frame so the entry transition actually runs.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep focus inside the dialog while it is open.
      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-dialog-title"
    >
      {/* Dimming scrim: a modal task pushes the page back rather than sitting beside it. */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel: blur and scale animate together so it reads as a surface arriving. */}
      <div
        ref={panelRef}
        className={`relative w-full sm:max-w-xl bg-[#1a1a1a] text-white border-t-4 sm:border-t-0 sm:border-b-4 border-amber-accent
                    p-7 sm:p-10 shadow-2xl max-h-[88vh] overflow-y-auto
                    transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                    motion-reduce:transition-opacity motion-reduce:duration-200
                    ${shown
                      ? 'opacity-100 translate-y-0 sm:scale-100'
                      : 'opacity-0 translate-y-6 sm:translate-y-0 sm:scale-95'}`}
        style={{ paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <Stars count={review.stars} />
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-extrabold text-zinc-500 mt-3 block">
              Google review
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="w-11 h-11 -mr-2 -mt-2 flex items-center justify-center text-zinc-400 hover:text-white
                       transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent shrink-0"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <blockquote
          id="review-dialog-title"
          className="font-sans text-lg md:text-xl leading-relaxed text-white"
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>

        <p className="font-sans text-sm uppercase tracking-[0.18em] font-extrabold text-amber-accent mt-8">
          {review.author}
        </p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(null);
  const returnFocusRef = useRef(null);

  const handleOpen = useCallback((review) => {
    returnFocusRef.current = document.activeElement;
    setActive(review);
  }, []);

  const handleClose = useCallback(() => {
    setActive(null);
    // Send focus back where it came from, so the page does not lose the user's place.
    returnFocusRef.current?.focus?.();
  }, []);

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-[#f5f2ee] text-[#1a1a1a] overflow-hidden"
      aria-labelledby="reviews-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 border-b-2 border-[#1a1a1a] pb-8">
          <div className="text-left max-w-xl">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-accent font-extrabold block mb-3">
              Customer Feedback
            </span>
            <h2
              id="reviews-title"
              className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a] leading-none"
            >
              Public reviews people keep sharing.
            </h2>
            <p className="font-sans text-sm text-zinc-600 mt-4">
              Tap any review to read the whole thing. The strip pauses when you hover it.
            </p>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <span className="font-display text-6xl md:text-7xl text-amber-accent leading-none">4.7</span>
            <div className="flex flex-col">
              <Stars count={5} />
              <span className="font-sans text-xs uppercase tracking-[0.18em] font-extrabold text-zinc-600 mt-2">
                98 Google reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed rails: the strip should run past the container edges. */}
      <div className="flex flex-col gap-2">
        <Rail items={RAIL_ONE} duration={52} onOpen={handleOpen} />
        <Rail items={RAIL_TWO} duration={46} reverse onOpen={handleOpen} />
      </div>

      {active && <ReviewDialog review={active} onClose={handleClose} />}
    </section>
  );
}
