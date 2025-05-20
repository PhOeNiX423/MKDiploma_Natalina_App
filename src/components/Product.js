/**
 * Product.js
 *
 * Компонент карточки товара для отображения в каталоге, на главной странице и в результатах поиска.
 *
 * Принимает:
 * - `product` — объект с данными о товаре (id, название, изображения, цена, рейтинг и т.д.)
 *
 * Использует:
 * - `CartContext` — для добавления товара в корзину
 * - `react-icons` — для отображения значков корзины, избранного и рейтинга
 *
 * Функциональность:
 * - Отображает:
 *   - Главное изображение товара
 *   - Название, линейку, рейтинг, цену, описание
 * - Клик по карточке ведёт на страницу товара (`/product/:id`)
 * - Иконка корзины добавляет товар с количеством 1
 * - Иконка "избранное" переключает локальное состояние (визуальный эффект)
 *
 * Особенности:
 * - При отсутствии изображения отображается плейсхолдер
 * - Описание обрезается на 3 строки (через `line-clamp-3`)
 * - Все клики по иконкам не мешают переходу по ссылке
 */

import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";
import { FavoritesContext } from "../contexts/FavoritesContext";

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const {
    _id,
    images,
    product_line,
    title,
    description,
    price,
    average_rating,
  } = product;

  // Функция для переключения состояния избранного
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="relative h-full rounded-3xl shadow-md bg-white p-4 flex flex-col">
      <Link to={`/product/${_id}`} className="block flex flex-col h-full">
        {/* Картинка товара */}
        <div className="h-[250px] mb-4 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full h-full relative">
              <img
                src={
                  images && images.length > 0
                    ? images[0]
                    : "/images/placeholders/product_placeholder.webp"
                }
                alt={title}
                className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Категория, название, цена, описание */}
        <div className="flex flex-col flex-grow gap-2">
          <div className="flex justify-between items-start gap-2">
            <h2 className="font-semibold text-left leading-tight">
              {title} {product_line}
            </h2>
            <div className="flex items-center gap-1 font-semibold">
              <span>{average_rating.toFixed(1)}</span>
              <FaStar className="text-yellowmedium text-sm" />
            </div>
          </div>
          <p className="text-secondary text-sm line-clamp-3 mb-4">
            {description}
          </p>
        </div>
      </Link>

      {/* Рейтинг и корзина */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 font-semibold text-lg">
          <span>{price.toLocaleString("ru-RU")}</span>
          <span>₽</span>
        </div>
        <button
          onClick={() =>
            addToCart({
              _id,
              title,
              price,
              product_line,
              image: images?.[0] ?? "",
              quantity: 1,
            })
          }
          className="flex items-center justify-center w-10 h-10 bg-pinkaccent rounded-full text-white transition-all duration-300 hover:bg-pinkaccent/80 active:bg-pinkaccent/60"
        >
          <AiOutlineShopping className="text-2xl text-white" />
        </button>
      </div>

      {/* Кнопка избранного */}
      <div className="absolute top-2 right-2 p-1 z-10">
        <button onClick={handleFavoriteClick}>
          <div className="flex justify-center items-center w-10 h-10 transition-all duration-300">
            {isFavorite(_id) ? (
              <MdFavorite className="text-3xl text-pinkaccent" />
            ) : (
              <MdFavoriteBorder className="text-3xl text-pinkaccent" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Product;
