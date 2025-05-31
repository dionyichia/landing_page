import { useState } from "react";
import ExperienceGrid from "./experince_grid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ExperienceData } from "@/sections/Experience";

interface GridSliderProps {
  experiences: ExperienceData[];
}

const GridSlider = ({ experiences }: GridSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (experiences.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No experiences to display
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Sliding Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {experiences.map((experience, index) => (
          <div key={index} className="flex-shrink-0 w-full mb-2">
            <ExperienceGrid experience={experience} />
          </div>
        ))}
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
  );
};

export default GridSlider;
