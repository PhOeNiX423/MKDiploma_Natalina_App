/**
 * Sidebar.js
 *
 * Компонент боковой панели (корзины), открывающейся поверх страницы.
 *
 * - Использует контексты:
 *   - `SidebarContext` — для управления открытием/закрытием панели.
 *   - `CartContext` — для доступа к корзине, её содержимому и сумме.
 *
 * Функциональность:
 * - При открытии затемняет фон (с возможностью закрытия по клику).
 * - Отображает список добавленных товаров с помощью компонента <CartItem />.
 * - Показывает общую сумму заказа.
 * - Включает кнопки:
 *   - «Посмотреть корзину» (переход на /cart)
 *   - «Перейти к оформлению» (переход на /checkout)
 *
 * Адаптивно отображается: занимает всю ширину на мобильных, ~30–45% на десктопах.
 */

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoCloseOutline } from "react-icons/io5";

import CartItem from "../components/CartItem";

import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, getTotal } = useContext(CartContext);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  return (
    <>
      {/* Затемнение фона */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-20 ${
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      ></div>

      {/* Сайдбар */}
      <div
        className={`fixed top-0 h-full bg-white shadow-2xl transition-all duration-300 z-30 w-full md:w-[45vw] xl:max-w-[30vw] px-4 lg:px-6 pb-20 md:pb-0 ${
          isOpen ? "right-0" : "-right-full"
        } flex flex-col`}
      >
        {/* Верх */}
        <div className="flex justify-between py-6">
          <h2 className="text-xl font-semibold">Товары в корзине</h2>
          <button onClick={handleClose}>
            <span className="text-sm text-secondary tracking-wide">
              <IoCloseOutline className="text-2xl" />
            </span>
          </button>
        </div>

        {/* Заголовки колонок */}
        <div className="flex justify-between items-center text-xs text-secondary uppercase tracking-wider px-1 pt-2 pb-2 border-b border-gray-200">
          <span>продукт</span>
          <span>стоимость</span>
        </div>

        {/* Список товаров */}
        <div className="flex-1 overflow-y-auto py-6 border-b border-gray-200">
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Подвал */}
        <div className="py-6 flex flex-col gap-4">
          <div className="flex justify-between items-center font-semibold text-base">
            <span>Итого:</span>
            <span>
              {getTotal().toLocaleString("ru-RU", { minimumFractionDigits: 2 })}{" "}
              ₽
            </span>
          </div>

          {/* <Link
            to="/cart"
            className="w-full text-sm text-pinksecondary font-medium border border-pinksecondary py-3 text-center rounded-lg uppercase hover:text-white hover:bg-pinkaccent/80 active:bg-pinkaccent/60 transition"
          >
            посмотреть корзину
          </Link> */}

          <Link
            to="/checkout"
            className="w-full text-sm font-medium bg-pinkaccent text-white py-3 text-center uppercase rounded-lg hover:bg-gray-800 transition"
            onClick={handleClose}
          >
            перейти к оформлению
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
