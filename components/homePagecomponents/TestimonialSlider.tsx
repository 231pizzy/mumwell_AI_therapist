"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string | number;
  text: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  heading?: string;
  settings?: Settings;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials = [],
  heading,
  settings: customSettings = {},
}) => {
  // Custom arrow components
  const CustomPrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 text-white transition"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );

  const CustomNextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 text-white transition"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );

  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // auto-slide enabled
    autoplaySpeed: 5000,  // 5s per slide
    pauseOnHover: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    fade: true,           // smooth fade transition
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  const sliderSettings: Settings = { ...defaultSettings, ...customSettings };

  return (
    <div className="bg-background py-16 relative text-foreground">
      <div className="max-w-4xl mx-auto px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">
            {heading}
          </h2>
        )}

        <Slider {...sliderSettings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg min-h-[200px] flex items-center justify-center">
                <p className="text-lg md:text-xl leading-relaxed text-center">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </Slider>

        <style jsx>{`
          .slick-dots {
            bottom: -30px;
            display: flex !important;
            justify-content: center;
          }
          .slick-dots li button:before {
            color: rgba(255, 255, 255, 0.5);
            font-size: 10px;
          }
          .slick-dots li.slick-active button:before {
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
};
