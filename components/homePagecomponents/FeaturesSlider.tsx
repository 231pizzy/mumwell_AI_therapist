"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mumWellFeatures = [
  {
    title: "EPDS SCREENING",
    image: "/ai-screening.png",
    description:
      "Early detection of postpartum depression using validated EPDS questionnaire.",
    featured: true,
  },
  {
    title: "AI CHATBOT",
    image: "/ai-chatbot.png",
    description:
      "24/7 empathetic support for mothers, answering questions and providing guidance.",
    featured: true,
  },
  {
    title: "COUNSELING",
    image: "/counseling.png",
    description:
      "Connect with professional counselors for personalized tele-counseling sessions.",
    featured: true,
  },
  {
    title: "RESOURCES",
    image: "/resources.png",
    description:
      "Access articles, videos, tips, and exercises to support maternal well-being.",
    featured: true,
  },
];

export default function FeaturesCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slidesToShow, setSlidesToShow] = useState<number>(4);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Match breakpoints to your design: mobile 1, tablet 2, small-desktop 3, desktop 4
  const calcSlidesToShow = (w: number) => {
    if (w < 768) return 1;
    if (w < 1024) return 2;
    if (w < 1280) return 3;
    return 4;
  };

  // Update slidesToShow on mount and when window resizes
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      setSlidesToShow(calcSlidesToShow(w));
      // clamp currentIndex to available pages
      requestAnimationFrame(() => {
        snapToIndex(currentIndex, calcSlidesToShow(w));
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute number of pages (for dots)
  const pages = Math.max(
    1,
    Math.ceil(mumWellFeatures.length / Math.max(1, slidesToShow))
  );

  // Scroll helper: scrolls container so that given page index is visible.
  const snapToIndex = (index: number, overrideSlidesToShow?: number) => {
    const el = containerRef.current;
    if (!el) return;
    const sts = overrideSlidesToShow ?? slidesToShow;
    const itemWidth = el.clientWidth / sts;
    // clamp index
    const maxIndex = Math.max(0, mumWellFeatures.length - sts);
    const clamped = Math.min(Math.max(0, index), maxIndex);
    el.scrollTo({
      left: Math.round(clamped * itemWidth),
      behavior: "smooth",
    });
    setCurrentIndex(clamped);
  };

  const handlePrev = () => {
    snapToIndex(currentIndex - 1);
  };
  const handleNext = () => {
    snapToIndex(currentIndex + 1);
  };

  // Update currentIndex while user scrolls (so dots / nav stay in sync)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (!el) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const itemWidth = el.clientWidth / Math.max(1, slidesToShow);
          const idx = Math.round(el.scrollLeft / itemWidth);
          setCurrentIndex(idx);
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slidesToShow]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section className="bg-background py-8 sm:py-12 md:py-16 font-din-condensed w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            MUMWELL FEATURES
          </h2>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow text-[#1b3a68] hover:bg-[#1b3a68] hover:text-white transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow text-[#1b3a68] hover:bg-[#1b3a68] hover:text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll-snap container */}
        <div
          ref={containerRef}
          className="carousel-container overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-2 px-2 no-scrollbar"
          role="region"
          aria-roledescription="carousel"
          aria-label="Features carousel"
          tabIndex={0}
          style={{
            // hide native scrollbar but keep scrollable (you can keep or remove)
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-4">
            {mumWellFeatures.map((feature, i) => (
              <article
                key={i}
                className="carousel-item snap-start bg-card rounded-lg overflow-hidden shadow flex-shrink-0"
                // width handled below via inline style: calc(100% / slidesToShow)
                style={{ width: `calc(100% / ${slidesToShow})` }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${mumWellFeatures.length}`}
              >
                <div className="relative h-64">
                  {/* Using Image with layout fill via className + parent relative */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-1 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots / pagination */}
        <div className="mt-4 flex justify-center items-center gap-2">
          {Array.from({ length: pages }).map((_, pageIdx) => {
            // compute whether this dot is active by comparing page start index vs currentIndex
            const pageStart = pageIdx * slidesToShow;
            const isActive =
              currentIndex >= pageStart &&
              currentIndex < pageStart + slidesToShow;
            return (
              <button
                key={pageIdx}
                onClick={() => snapToIndex(pageStart)}
                aria-label={`Go to page ${pageIdx + 1}`}
                className={`w-3 h-3 rounded-full transition-transform transform ${
                  isActive ? "scale-110 bg-foreground" : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* optional: hide scrollbar for modern browsers while still enabling scroll */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ensure each snap child aligns at start */
        .carousel-item {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
}
