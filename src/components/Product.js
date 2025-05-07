import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

// Значки
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { _id, images, title, description, price, rating, f_category } =
    product;

  // Локальное состояние: избран ли товар
  const [isFavorite, setIsFavorite] = useState(false);

  // Функция для переключения состояния избранного
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // чтобы клик по сердечку не переходил по ссылке
    setIsFavorite(!isFavorite);
  };

  // Функция для обработки клика по корзинке
  const handleBasketClick = (e) => {
    e.stopPropagation(); // чтобы клик по корзинке тоже не переходил по ссылке
    // console.log("Товар добавлен в корзину:", _id);
    // Здесь потом добавить добавление в корзину
  };

  return (
    <div className="relative rounded-3xl shadow-md bg-white p-4 flex flex-col">
    {/* <div className="relative rounded-3xl shadow-md bg-white p-4 flex flex-col"> */}
      <Link to={`/product/${_id}`} className="block flex flex-col h-full">
        {/* Картинка товара */}
        <div className="h-[300px] mb-4 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[200px] mx-auto flex justify-center items-center relative">
              <img
                src={
                  images && images.length > 0
                    ? images[0]
                    : "/images/placeholders/product_placeholder.webp"
                }
                alt={title}
                className="max-h-[300px] object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Категория, название, цена, описание */}
        <div className="flex flex-col flex-grow gap-2">
          {/* <div className="text-xs text-secondary font-light mb-1">
            {f_category}
          </div> */}
          <div className="flex justify-between items-start gap-2">
            <h2 className="font-semibold text-left leading-tight">{title}</h2>
            <div className="flex items-center gap-1 font-semibold">
              <span>{rating.toFixed(1)}</span>
              <FaStar className="text-yellowmedium text-sm" />
            </div>
            {/* <div className="flex items-center gap-1 font-semibold">
            <span>{price.toLocaleString('ru-RU')}</span>
            <span>₽</span>
            </div> */}
          </div>
          <p className="text-secondary text-sm line-clamp-3 mb-4">
            {description}
          </p>
        </div>
      </Link>

      {/* Рейтинг и корзина */}
      <div className="flex items-center justify-between mt-2">
        {/* <span>{rating.toFixed(1)}</span>
          <FaStar className="text-yellowmedium text-sm" /> */}
        <div className="flex items-center gap-1 font-semibold text-lg">
          <span>{price.toLocaleString("ru-RU")}</span>
          <span>₽</span>
        </div>
        <button
          // onClick={handleBasketClick}
          onClick={()=> addToCart(product)}
          className="flex items-center justify-center w-10 h-10 bg-pinkaccent rounded-full text-white transition-all duration-300 hover:bg-pinkaccent/80 active:bg-pinkaccent/60"
        >
          <AiOutlineShopping className="text-2xl text-white" />
        </button>
      </div>

      {/* Кнопка избранного */}
      <div className="absolute top-2 right-2 p-1 z-10">
        <button onClick={handleFavoriteClick}>
          <div className="flex justify-center items-center w-10 h-10 transition-all duration-300">
            {isFavorite ? (
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
