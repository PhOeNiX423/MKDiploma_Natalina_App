import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-full bg-pinkaccent py-20 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Новый взгляд на косметику
        </h1>
        <p className="text-base md:text-lg font-light mb-8">
          Современные решения, стильный дизайн и забота
          о вас в каждой детали. {" "}
          <br/>
          Создаём продукт, который вдохновляет.
        </p>
        <Link
          to="/catalog"
          className="inline-block px-6 py-3 text-white border border-white rounded-full transition duration-300 hover:bg-white hover:text-pinksecondary"
        >
          Перейти в каталог →
        </Link>
      </div>
    </section>
  );
};

export default Banner;
