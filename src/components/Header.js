/**
 * Header.js
 *
 * Главный компонент шапки сайта, содержащий навигацию и иконки действий.
 *
 * Использует:
 * - `SidebarContext` — для открытия/закрытия корзины
 * - `CartContext` — для отображения количества товаров в корзине
 * - `SearchContext` — для открытия строки поиска и управления запросом
 *
 * Структура:
 * 1. Верхний sticky header (на md+ экранах):
 *    - Логотип
 *    - Горизонтальное меню (каталог, бьюти-школа)
 *    - Иконки действий: поиск, избранное, профиль, корзина с индикатором количества
 *
 * 2. Нижний mobile-навигационный блок (на sm экранах):
 *    - 5 иконок: Домой, Избранное, Корзина (центральная), Поиск, Профиль
 *    - Центральная корзина выделена визуально (больше, ярче, с индикатором)
 *
 * Особенности:
 * - Все клики автоматически закрывают другие панели (поиск, корзина)
 * - Количество товаров в корзине отображается как бейджик на иконке
 * - Компонент адаптирован под разные размеры экрана
 */

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsCart2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { SearchContext } from "../contexts/SearchContext";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { getItemCount } = useContext(CartContext);
  const itemCount = getItemCount();
  const { setIsSearchOpen, setQuery } = useContext(SearchContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Основной хедер */}
      <header className="py-4 sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto flex justify-between items-center">
          {/* Логотип + бургер */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link to="/" className="block">
              <img
                src="/images/logos/mk-logo-pink.svg"
                alt="Mary Kay"
                className="h-6"
              />
            </Link>

            {/* Бургер-меню на sm */}
            <button
              className="md:hidden text-2xl text-pinkaccent ml-auto"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IoMenu />
            </button>

            {/* Горизонтальное меню (только md+) */}
            <div className="hidden md:flex text-sm text-black gap-8 ml-14">
              <Link to="/catalog">
                <p>каталог</p>
              </Link>
              <Link to="/beauty_school">
                <p>бьюти-школа</p>
              </Link>
              {/* <Link to="/onboarding">
                <p>присоединяйся к нам</p>
              </Link> */}
            </div>
          </div>

          {/* Иконки справа на md+ */}
          <div className="hidden md:flex items-center gap-5 text-xl text-black">
            <button onClick={() => setIsSearchOpen(true)}>
              <FiSearch />
            </button>
            <Link to="/favorites">
              <MdFavoriteBorder />
            </Link>
            <Link to="/account">
              <CgProfile />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative bg-pinkaccent w-10 h-10 rounded-full flex items-center justify-center text-white"
            >
              <BsCart2 />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-pinkaccent text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню-перекрытие */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between items-center animate-slide-in-down">
          {/* Верх — кнопка закрытия */}
          <div className="w-full flex justify-end py-4"></div>

          {/* Меню-ссылки */}
          <div className="flex flex-col items-center gap-8 text-xl font-semibold text-pinkaccent">
            <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)}>
              Каталог
            </Link>
            <Link
              to="/beauty_school"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Бьюти-школа
            </Link>
          </div>

          {/* Кнопка корзины внизу */}
          <div className="w-full px-8 pb-8 flex justify-center">
            <button
              className="text-3xl text-pinkaccent animate-bounce"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IoIosArrowUp />
            </button>
          </div>
        </div>
      )}

      {/* Нижняя навигация (sm) */}
      <div className="md:hidden fixed bottom-4 left-0 w-full px-4 z-40">
        <div className="grid grid-cols-5 bg-white rounded-full shadow-md border border-gray-200 max-w-md mx-auto py-3 px-4 items-center">
          <Link
            to="/"
            className="flex justify-center"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
              setQuery("");
            }}
          >
            <AiOutlineHome className="w-6 h-6 text-gray-500" />
          </Link>
          <Link
            to="/favorites"
            className="flex justify-center"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
              setQuery("");
            }}
          >
            <MdFavoriteBorder className="w-6 h-6 text-gray-500" />
          </Link>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsSearchOpen(false);
              setQuery("");
            }}
            className="relative flex justify-center -mt-8"
          >
            <div className="bg-pinkaccent w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg">
              <BsCart2 className="text-2xl" />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-white text-pinkaccent text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen((prev) => !prev);
              setQuery("");
            }}
            className="flex justify-center"
          >
            <FiSearch className="w-6 h-6 text-gray-500" />
          </button>
          <Link
            to="/profile"
            className="flex justify-center"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
              setQuery("");
            }}
          >
            <CgProfile className="w-6 h-6 text-gray-500" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
