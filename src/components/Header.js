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

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsCart2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";

import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { SearchContext } from "../contexts/SearchContext";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { getItemCount } = useContext(CartContext);
  const itemCount = getItemCount();
  const { setIsSearchOpen, setQuery } = useContext(SearchContext);

  return (
    <>
      <header className="py-4 sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Блок: логотип + меню */}
          <div className="flex justify-center md:justify-start items-center gap-14 w-full md:w-auto">
            <Link to="/" className="block">
              <img
                src="/images/logos/mk-logo-pink.svg"
                alt="Mary Kay"
                className="h-6"
              />
            </Link>

            {/* Меню (только на md+) */}
            <div className="hidden md:flex text-sm text-black gap-8">
              <Link to="/catalog">
                <p>каталог</p>
              </Link>
              <Link to="/">
                <p>бьюти-школа</p>
              </Link>
            </div>
          </div>

          {/* Иконки справа (только на md+) */}
          <div className="hidden md:flex items-center gap-5 text-xl text-black">
            <button onClick={() => setIsSearchOpen(true)}>
              <FiSearch />
            </button>
            <button>
              <MdFavoriteBorder />
            </button>
            <button>
              <CgProfile />
            </button>
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

      {/* Хедер на sm экранах */}
      <div className="md:hidden fixed bottom-4 left-0 w-full px-4 z-40">
        <div className="grid grid-cols-5 bg-white rounded-full shadow-md border border-gray-200 max-w-md mx-auto py-3 px-4 items-center">
          {/* Домой */}
          <Link
            to="/"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
            }}
            className="flex justify-center"
          >
            <AiOutlineHome className="w-6 h-6 text-gray-500" />
          </Link>

          {/* Избранное */}
          <Link
            to="/favorites"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
            }}
            className="flex justify-center"
          >
            <MdFavoriteBorder className="w-6 h-6 text-gray-500" />
          </Link>

          {/* Корзина — по центру, выше и яркая */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsSearchOpen(false);
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

          {/* Поиск */}
          {/* <Link
            to="/search"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(true);
            }}
            className="flex justify-center"
          >
            <FiSearch className="w-6 h-6 text-gray-500" />
          </Link> */}
          <button
            onClick={() => {
              setIsOpen(false);
              setQuery("");
              setIsSearchOpen(prev => !prev);
            }}
            className="flex justify-center"
          >
            <FiSearch className="w-6 h-6 text-gray-500" />
          </button>

          {/* Профиль */}
          <Link
            to="/profile"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
            }}
            className="flex justify-center"
          >
            <CgProfile className="w-6 h-6 text-gray-500" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
