/**
 * Categories.js
 *
 * Компонент отображает основные категории товаров в виде иконок, с переходом в каталог.
 *
 * Поведение:
 * - При клике на категорию выполняется переход на /catalog
 * - Одновременно в состояние передаётся нужная категория, чтобы отфильтровать товары
 * - Использует `useNavigate` из react-router для программного перехода
 *
 * Используется на главной странице для быстрого доступа к популярным категориям каталога.
 */

import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Декоративная косметика",
    img: "/images/categories/decorative.png",
    category: "декоративная косметика",
  },
  {
    title: "Уходовая косметика",
    img: "/images/categories/skincare.png",
    category: "уходовая косметика",
  },
  {
    title: "Бьюти-системы",
    img: "/images/categories/beauty_system.png",
    category: "бьюти-система",
  },
  {
    title: "Для мужчин",
    img: "/images/categories/for_men.png",
    category: "для мужчин",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate("/catalog", { state: { category } });
  };

  return (
    <section className="py-12">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-pinkaccent mb-10">
          Популярные категории
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleClick(cat.category)}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:bg-pink-50"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border border-pinkaccent border-1 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="object-contain w-full h-full scale-75 group-hover:scale-90 transition-transform duration-300"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-center text-gray-800 group-hover:text-pinkaccent">
                {cat.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
