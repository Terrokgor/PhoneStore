import { memo, useRef, useState, useEffect } from "react";
import { SimilarCard } from "./SimilarCard";
import type { Phone } from "../types/phone";
import "./SimilarCarousel.css";

interface SimilarCarouselProps {
  phones: Phone[];
}

export const SimilarCarousel = memo(({ phones }: SimilarCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(phones.length > 1);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 280; // SimilarCard width + gap
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Update button states after scroll animation
    setTimeout(checkScrollButtons, 300);
  };

  // Update scroll buttons on mount and when phones change
  useEffect(() => {
    setTimeout(checkScrollButtons, 100);
  }, [phones.length]);

  if (phones.length === 0) return null;

  return (
    <div className="similar-carousel-container">
      <div className="similar-carousel-wrapper">
        <div
          className="similar-carousel"
          ref={scrollRef}
          onScroll={checkScrollButtons}
        >
          {phones.map((phone) => (
            <div key={phone.id} className="similar-carousel-item">
              <SimilarCard phone={phone} />
            </div>
          ))}
        </div>

        {phones.length > 1 && (
          <>
            {canScrollLeft && (
              <button
                className="carousel-nav carousel-nav-left"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button
                className="carousel-nav carousel-nav-right"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                ›
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
});