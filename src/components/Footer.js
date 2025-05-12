/**
 * Footer.js
 * 
 * Компонент подвала сайта с адаптивной структурой.
 * 
 * Основная структура:
 * 1. Блок логотипа и миссии:
 *    - Логотип Mary Kay
 *    - Фраза о миссии бренда
 *    - Иконки социальных сетей (YouTube, VK, OK)
 * 
 * 2. Блок ссылок, разбитый на 4 секции:
 *    - «Компания»
 *    - «Покупателям»
 *    - «Контакты»
 *    - «Юридическая информация»
 * 
 * Адаптивность:
 * - На экранах шириной <768px (мобильные) используется аккордеон:
 *   - Каждая секция сворачивается/разворачивается по нажатию
 *   - Анимация раскрытия с помощью `max-height` и `opacity`
 * - На десктопах все секции открыты в виде 4 колонок
 * 
 * Поведение:
 * - Следит за изменением ширины окна с помощью `window.innerWidth`
 * - Использует `useEffect` для обновления флага `isMobile`
 * - Использует локальное состояние `openSection` для аккордеона на мобильных
 * 
 * Особенности:
 * - Контактная информация включает email-ссылку
 * - Юридические ссылки реализованы через <Link> из React Router
 */

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

  const sections = [
    {
      title: "Компания",
      links: ["О компании", "Разработка продукции", "Вакансии", "Пресс-центр"]
    },
    {
      title: "Покупателям",
      links: ["Гарантия качества", "Доставка и оплата", "Возврат товаров"]
    },
    {
      title: "Контакты",
      links: [
        "+7 495 500 00 00",
        <a href="mailto:info@marykay.ru" key="email">info@marykay.ru</a>,
        "142093, Москва, Ленинградское шоссе, д.16, стр.3"
      ]
    },
    {
      title: "Юридическая информация",
      links: [
        <Link to="/privacy-policy" className="hover:text-pinkaccent transition-colors duration-200">Политика конфиденциальности</Link>,
        <Link to="/terms-of-use" className="hover:text-pinkaccent transition-colors duration-200">Пользовательское соглашение</Link>,
        <Link to="/cookies-policy" className="hover:text-pinkaccent transition-colors duration-200">Политика cookies</Link>
      ]
    }
  ];

  return (
    <footer className="bg-white pt-10 border-t border-gray-100 text-sm text-gray-600">

      {/* Блок 1: логотип и миссия */}
      <div className="text-center md:text-center text-left">
        <div className="flex flex-col items-start md:items-center gap-4">
          <img src="/images/logos/mk-logo-pink.svg" alt="Mary Kay" className="h-6" />
          <p className="text-gray-500 max-w-md">
            Улучшаем жизни женщин и детей во всем мире!
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/images/social/youtube.svg" alt="YouTube" className="h-10 w-10" />
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

      {/* Разделительная линия */}
      <div className="w-full my-6 border-t border-white"></div>

      {/* Блок 2: колонки */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr] gap-6 md:gap-8 text-[13px] md:text-[12px] pb-10">
        {sections.map((section, index) => (
          <div key={index}>
            <button
              className="text-pinkaccent font-bold mb-3 flex items-center w-full md:cursor-default"
              onClick={() => isMobile && toggleSection(index)}
            >
              <span className="flex items-center gap-2 text-xl md:text-xl text-left">
                {section.title}
                {isMobile && (
                  <FaChevronDown
                    className={`transform transition-transform text-lg ${
                      openSection === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </span>
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
