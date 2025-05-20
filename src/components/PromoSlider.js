import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  { id: 1, image: "/images/promo/promo1.jpg", alt: "Акция 1" },
  { id: 2, image: "/images/promo/promo2.jpg", alt: "Акция 2" }
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden rounded-xl shadow-lg aspect-[3/1] sm:aspect-[4/2] md:aspect-[16/6]">
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.alt}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100 relative" : "opacity-0"
          }`}
        />
      ))}

      {/* Навигация — стрелки */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-2 text-primary shadow-md"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-90 rounded-full p-2 text-primary shadow-md"
      >
        <FaChevronRight />
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === current ? "bg-pinkaccent" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
