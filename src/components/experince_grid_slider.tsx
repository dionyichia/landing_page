import { useState, useRef, useEffect } from "react";
import ExperienceGrid from "./experince_grid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ExperienceData } from "@/sections/Experience";

interface GridSliderProps {
  experiences: ExperienceData[];
}

const GridSlider = ({ experiences }: GridSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const SWIPE_THRESHOLD = 50; // px

  const showPrevGrid = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const showNextGrid = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        showNextGrid(); // swipe left
      } else {
        showPrevGrid(); // swipe right
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        showPrevGrid();
      }
      if (e.key === "ArrowRight") {
        showNextGrid();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [experiences.length]);

  useEffect(() => {
    if (experiences.length === 0) return;

    const handleResize = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth);
      }
    };

      // Calculate initial width
      handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [experiences.length]);


  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Sliding Container */}
      {  experiences.length === 0 ? 

        <div className="text-center py-8 text-gray-500">
          No experiences to display
        </div>
        :
        <div>
          <div 
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}>
          
            <div
              className="flex transition-transform duration-500 ease-in-out pl-[3%] md:pl-[5%]" // pl-[1%] md:pl-[5%]
              style={{ 
                transform: `translateX(-${currentIndex * slideWidth}px)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              >
              { experiences.map((experience, index) => (
                  <div
                    key={index}
                    ref={index === 0 ? slideRef : null} // w-[99%] md:w-[95%] mb-2 px-[0.5%] md:px-8
                    className="
                      flex-shrink-0 w-[97%] px-[1%] md:w-[95%] md:px-[2%]
                      transition-opacity duration-300"
                    style={{ 
                      opacity: index === currentIndex ? 1 : 0.2,
                    }}
                  >
                    <ExperienceGrid experience={experience} />
                  </div>
                ))
              
              }
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={showPrevGrid}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={experiences.length <= 1}
              aria-label="Previous experience"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-stone-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={showNextGrid}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={experiences.length <= 1}
              aria-label="Next experience"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Experience Counter */}
          <div className="text-center mt-4 text-sm text-gray-500">
            {currentIndex + 1} of {experiences.length}
          </div>
        </div> 
      }
    </div>
  );
};

export default GridSlider;
