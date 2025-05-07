import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { title: "Декоративная косметика", img: "/images/categories/decorative.png", link: "#" },
  { title: "Уходовая косметика", img: "/images/categories/skincare.png", link: "#" },
  { title: "Парфюмерия", img: "/images/categories/perfume.png", link: "#" },
  { title: "Подарочные наборы", img: "/images/categories/gifts.png", link: "#" },
];

const Categories = () => {
  return (
    <section className="">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {categories.map((cat, index) => (
            <Link to={cat.link} key={index} className="flex flex-col items-center gap-2 group">
              <div className="sm:w-30 sm:h-30 md:w-32 md:h-32 overflow-hidden flex items-center justify-center rounded-full">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="object-contain w-full h-full scale-75 group-hover:scale-[0.85] transition-transform duration-300"
                />
              </div>
              <p className="text-sm md:text-base font-medium">{cat.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
