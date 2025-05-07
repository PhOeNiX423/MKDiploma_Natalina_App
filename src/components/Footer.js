import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="bg-white py-10 border-t border-gray-100 text-sm text-gray-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ЛОГО и соцсети */}
        <div className="flex flex-col items-start gap-4">
          <img src="/images/logos/mk-logo-pink.svg" alt="Mary Kay" className="h-6" />
          <p className="text-gray-500">Улучшаем жизни женщин и детей во всем мире!</p>
          <div className="flex gap-3 mt-2">
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/youtube.svg" alt="YouTube" className="h-45 w-45" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/vk.svg" alt="VK" className="h-45 w-45" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/ok.svg" alt="OK" className="h-45 w-45" />
            </a>
          </div>
        </div>

        {/* КОЛОНКИ */}
        {[
          {
            title: "Компания",
            links: ["О нас", "Вакансии"]
          },
          {
            title: "О нас",
            links: ["О компании", "Гарантия качества", "Разработка продукции", "Пресс-центр"]
          },
          {
            title: "Контакты",
            links: [
              "+7 495 500 00 00",
              <a href="mailto:info@marykay.ru" key="email">info@marykay.ru</a>,
              "142093, Москва, Ленинградское шоссе, д.16, стр.3"
            ]
          }
        ].map((section, index) => (
          <div key={index}>
            <button
              className="text-pinkaccent font-bold mb-3 flex items-center w-full md:cursor-default"
              onClick={() => isMobile && toggleSection(index)}
            >
              <span className="flex items-center gap-2 text-2xl">
                {section.title}
                {isMobile && <FaChevronDown className={`transform transition-transform text-lg ${openSection === index ? 'rotate-180' : ''}`} />}
              </span>
            </button>
            <ul
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMobile
                  ? openSection === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                  : 'space-y-2'
              }`}
            >
              {section.links.map((item, i) => (
                <li key={i} className="pb-4 md:pb-0 hover:text-pinkaccent transition-colors duration-200">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
