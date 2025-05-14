import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:flex-row md:min-h-[70vh] overflow-hidden">
      {/* Левая колонка */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6 py-16">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="font-mbrody text-5xl font-bold leading-tight text-pinkaccent">
            Будь собой. <br/> Будь сияющей.
          </h1>
          <p className="text-sm sm:text-base text-secondary pb-6">
            Открой для себя косметику, которая подчеркнет <br className="hidden md:block" />твою индивидуальность.
          </p>
          <Link
            to="/catalog"
            className="inline-block border border-pinkaccent border-1 text-pinkaccent font-bold px-6 py-3 rounded-full transition hover:bg-pinksecondary"
          >
            Перейти в каталог →
          </Link>
        </div>
      </div>

      {/* Правая колонка — скрыта на мобилках */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero_section/hero2.jpg')" }}
      ></div>
    </section>



  );
};

export default Hero;
