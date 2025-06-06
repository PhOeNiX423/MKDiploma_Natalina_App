import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRefs = useRef([]);

  const toggleSection = (section) => {
    const isOpening = openSection !== section;
    setOpenSection(isOpening ? section : null);

    if (isOpening && sectionRefs.current[section]) {
      setTimeout(() => {
        sectionRefs.current[section].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // немного позже, чтобы успела анимация
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    {
      title: "Компания",
      links: ["О компании", "Разработка продукции", "Вакансии", "Пресс-центр"],
    },
    {
      title: "Покупателям",
      links: ["Гарантия качества", "Доставка и оплата", "Возврат товаров"],
    },
    {
      title: "Контакты",
      links: [
        "+7 495 500 00 00",
        <a href="mailto:info@marykay.ru" key="email">
          info@marykay.ru
        </a>,
        "142093, Москва, Ленинградское шоссе, д.16, стр.3",
      ],
    },
    {
      title: "Юридическая информация",
      links: [
        <Link
          to="/privacy-policy"
          className="hover:text-pinkaccent transition-colors duration-200"
        >
          Политика конфиденциальности
        </Link>,
        <Link
          to="/terms-of-use"
          className="hover:text-pinkaccent transition-colors duration-200"
        >
          Пользовательское соглашение
        </Link>,
        <Link
          to="/cookies-policy"
          className="hover:text-pinkaccent transition-colors duration-200"
        >
          Политика cookies
        </Link>,
      ],
    },
  ];

  return (
    <footer className="bg-white pt-10 border-t border-gray-100 text-sm text-gray-600">
      <div className="text-center md:text-center text-left">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/images/logos/mk-logo-pink.svg"
            alt="Mary Kay"
            className="h-6"
          />
          <p className="text-gray-500 max-w-md">
            Улучшаем жизни женщин и детей во всем мире!
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" target="_blank" rel="noreferrer">
              <img
                src="/images/social/youtube.svg"
                alt="YouTube"
                className="h-10 w-10"
              />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/vk.svg" alt="VK" className="h-10 w-10" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/ok.svg" alt="OK" className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full my-6 border-t border-white"></div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr] gap-6 md:gap-8 text-[13px] md:text-[12px] pb-10">
        {sections.map((section, index) => (
          <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
            <button
              className="text-pinkaccent font-bold mb-3 flex items-center md:justify-start justify-between w-full md:cursor-default"
              onClick={() => isMobile && toggleSection(index)}
            >
              <span className="text-xl md:text-xl text-left block leading-snug break-words">
                {section.title}
              </span>
              {isMobile && (
                <FaChevronDown
                  className={`transform transition-transform text-lg ${
                    openSection === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            <ul
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMobile
                  ? openSection === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  : "space-y-2"
              }`}
            >
              {section.links.map((item, i) => (
                <li
                  key={i}
                  className="pb-4 md:pb-0 hover:text-pinkaccent transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
