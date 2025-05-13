/**
 * Search.js
 *
 * Компонент полноэкранного поиска по товарам.
 *
 * Использует:
 * - `SearchContext` — для управления состоянием поиска (`isSearchOpen`, `query`, `setQuery`, `setIsSearchOpen`)
 * - `ProductContext` — для доступа ко всем товарам
 *
 * Основной функционал:
 * - При открытии блокирует прокрутку страницы (`body-no-scroll`)
 * - Автоматически фокусирует поле ввода при открытии
 * - Закрывается по клику вне блока поиска или при нажатии Escape
 * - Фильтрует товары по названию (по полю `title`) в реальном времени
 *
 * Адаптивность:
 * - На `sm` экранах (мобильных) поиск отображается как отдельная страница
 * - На `md+` экранах — всплывающее окно по центру экрана с полупрозрачным фоном
 *
 * Результаты отображаются в виде сетки карточек <Product />, или сообщение «Товары не найдены».
 */

import React, { useContext, useEffect, useRef, useState } from "react";

import { SearchContext } from "../contexts/SearchContext";
import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import { FiSearch } from "react-icons/fi";

const Search = () => {
  const { isSearchOpen, setIsSearchOpen, query, setQuery } =
    useContext(SearchContext);
  const { products } = useContext(ProductContext);

  const [filtered, setFiltered] = useState([]);

  const overlayRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (query.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filteredProducts);
    } else {
      setFiltered([]);
    }
  }, [query, products]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setIsSearchOpen, setQuery]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
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
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-30"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          setIsSearchOpen(false);
          setQuery("");
        }
      }}
    >
      {/* --- Верстка для sm --- */}
      <div className="block md:hidden h-full w-full bg-white flex flex-col px-4 animate-slide-in-up">
        {/* Поле поиска */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300">
          <FiSearch className="text-2xl text-pinkaccent" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Введите название товара..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 focus:outline-none text-lg"
          />
        </div>

        {/* Результаты */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {query && (
            <div className="grid grid-cols-1 gap-6">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <div
                    key={product._id + query}
                    className="h-full animate-slide-in-up transition-all duration-300"
                  >
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Товары не найдены</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Верстка для md+ --- */}
      <div className="hidden md:flex items-start justify-center w-full h-full">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => {
            setIsSearchOpen(false);
            setQuery("");
          }}
        ></div>
        <div className="relative bg-white w-full max-w-5xl mt-20 px-4 py-6 rounded-3xl overflow-y-auto max-h-full mx-4 z-10 animate-slide-in-down">
          <div className="flex items-center gap-3 mb-6">
            <FiSearch className="text-2xl text-pinkaccent" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Введите название товара..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none text-lg"
            />
          </div>

          {query && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <div
                    key={product._id + query}
                    className="h-full animate-slide-in-right transition-all duration-300"
                  >
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Товары не найдены</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
