import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsCart2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { getItemCount } = useContext(CartContext);
  const itemCount = getItemCount();

  return (
    <>
      {/* Логотип всегда наверху */}
      <header className="py-4 sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex justify-center md:justify-between items-center px-4">
          {/* Логотип по центру на мобилках, слева на md+ */}
          <Link to="/" className="block">
            <img
              src="/images/logos/mk-logo-pink.svg"
              alt="Mary Kay"
              className="h-6 mx-auto md:mx-0"
            />
          </Link>

          {/* Иконки справа (только на md+) */}
          <div className="hidden md:flex items-center gap-5 text-xl text-black">
            <button>
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

      {/* Нижнее мобильное меню */}
      <div className="md:hidden fixed bottom-4 left-0 w-full px-4 z-40">
        <div className="grid grid-cols-5 bg-white rounded-full shadow-md border border-gray-200 max-w-md mx-auto py-3 px-4 items-center">
          {/* Домой */}
          <Link to="/" className="flex justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l9-9 9 9h-3v9H6v-9H3z" />
            </svg>
          </Link>

          {/* Избранное */}
          <Link to="/favorites" className="flex justify-center">
            <MdFavoriteBorder className="w-6 h-6 text-gray-500" />
          </Link>

          {/* Корзина — по центру, выше и яркая */}
          <button
            onClick={() => setIsOpen(!isOpen)}
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
          <Link to="/search" className="flex justify-center">
            <FiSearch className="w-6 h-6 text-gray-500" />
          </Link>

          {/* Профиль */}
          <Link to="/profile" className="flex justify-center">
            <CgProfile className="w-6 h-6 text-gray-500" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
