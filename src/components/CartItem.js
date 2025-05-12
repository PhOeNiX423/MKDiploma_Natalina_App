/**
 * CartItem.js
 * 
 * Компонент отображает один товар в корзине.
 * 
 * Принимает:
 * - `item` — объект товара в корзине, включающий:
 *   - `_id`, `image`, `title`, `price`, `quantity`
 * 
 * Использует:
 * - `CartContext` — для управления действиями с корзиной:
 *   - `increaseQuantity(_id)` — увеличить количество товара
 *   - `decreaseQuantity(_id)` — уменьшить количество (удаляется при 0)
 *   - `handleRemove(_id)` — полностью удалить товар
 * 
 * Структура:
 * - Слева — изображение товара (с плейсхолдером по умолчанию)
 * - Справа — название, кнопка удаления, управление количеством и итоговая цена
 * 
 * Поведение:
 * - Плюс/минус меняют количество товара
 * - При нажатии на крестик товар удаляется из корзины
 * - Итоговая цена пересчитывается в зависимости от количества
 * 
 * Особенности:
 * - Адаптивный внешний вид
 * - Поддержка дробных цен с двумя знаками после запятой (`toLocaleString`)
 */

import React, { useContext } from "react";

import { CartContext } from "../contexts/CartContext";

import { IoCloseOutline } from "react-icons/io5";

const CartItem = ({ item }) => {
  const { _id, image, title, price, quantity = 1 } = item;
  const { increaseQuantity, decreaseQuantity, handleRemove } =
    useContext(CartContext);

  return (
    <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
      {/* Картинка */}
      <div className="w-[80px] h-[80px] shrink-0 overflow-hidden rounded-xl bg-white">
        <img
          src={image || "/images/placeholders/product_placeholder.webp"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Центр: название, кнопки и цена */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <span className="font-medium text-sm text-black max-w-[50vh]">
            {title}
          </span>
          <button
            onClick={() => handleRemove(_id)}
            className="text-gray-400 hover:text-pinkaccent ml-2"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Кнопки +/– и цена */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(_id)}
              className="px-2 py-1 border rounded text-sm text-gray-600 hover:text-black"
            >
              −
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={() => increaseQuantity(_id)}
              className="px-2 py-1 border rounded text-sm text-gray-600 hover:text-black"
            >
              +
            </button>
          </div>

          <span className="text-sm font-semibold text-pinkaccent whitespace-nowrap">
            {(price * quantity).toLocaleString("ru-RU", {
              minimumFractionDigits: 2,
            })}{" "}
            ₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
