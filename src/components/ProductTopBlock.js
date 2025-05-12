/**
 * ProductTopBlock.js
 * 
 * Компонент отображает верхний блок страницы товара:
 * - Галерея изображений (с выбором активного изображения)
 * - Название, категория, рейтинг, цена, описание и артикул товара
 * - Количество и кнопка «Добавить в корзину»
 * - Кнопка «Добавить в избранное» (визуальная, без сохранения)
 * 
 * Использует:
 * - `CartContext` — для добавления товара в корзину
 * - React Icons — для отображения звезды, иконки WhatsApp и избранного
 * 
 * Взаимодействие:
 * - Пользователь может выбрать изображение товара
 * - Отрегулировать количество (мин. 1)
 * - Добавить товар с текущим количеством и выбранным изображением в корзину
 * - Отметить товар как избранный (только в UI)
 * 
 * Дизайн:
 * - Адаптивная сетка: изображения слева, текст справа на больших экранах
 * - Цена отображается со скидкой 25% (зачёркнутая цена)
 */

import React, { useState, useContext } from 'react';

import {
  FaStar,
  FaWhatsapp,
} from 'react-icons/fa';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { CartContext } from '../contexts/CartContext';

const ProductTopBlock = ({ product }) => {
  const {
    title,
    item_code,
    price,
    description,
    category,
    images,
    average_rating,
    ratings_count,
  } = product;

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToCart } = useContext(CartContext);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
  const productToAdd = {
    _id: product._id,
    title: product.title,
    price: product.price,
    image: selectedImage ?? (product.images?.[0] ?? ''),
    quantity: quantity,
  };
  addToCart(productToAdd);
};

  return (
    <div className="container mx-auto pt-10 font-primary px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Блок с изображениями */}
        <div className="flex flex-col">
          <div className="mb-4 rounded-xl shadow-lg bg-white flex items-center justify-center h-[500px]">
            <img
              src={selectedImage}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? 'border-pinkaccent' : 'border-transparent'
                }`}
                alt={`preview-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Блок с текстом и действиями */}
        <div className="space-y-6 text-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-secondary pb-3">{category}</p>
              <h1 className="text-3xl font-bold leading-tight">{title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <FaStar className="text-yellowmedium" />
                <span className="text-sm font-semibold">{average_rating.toFixed(1)}</span>
                <span className="text-sm text-secondary">({ratings_count} отзывов)</span>
                <span className="ml-2 text-xs font-medium bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  В наличии
                </span>
              </div>
            </div>
            <button onClick={handleFavoriteClick} className="mt-1">
              {isFavorite ? (
                <MdFavorite className="text-3xl text-pinkaccent" />
              ) : (
                <MdFavoriteBorder className="text-3xl text-pinkaccent" />
              )}
            </button>
          </div>

          {/* Цена */}
          <div>
            <span className="text-2xl font-bold text-pinkaccent">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            <span className="ml-2 text-lg line-through text-secondary">
              {(price * 1.25).toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Описание */}
          <p className="text-secondary">{description}</p>

          {/* Кол-во и кнопки */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-secondary rounded-full overflow-hidden w-max">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-lg font-semibold text-primary hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4 py-1.5 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-lg font-semibold text-primary hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-pinkaccent hover:bg-pinkaccent/80 text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
            >
              Добавить в корзину
            </button>
          </div>

          {/* Артикул */}
          <div className="text-sm text-secondary mt-2">
            <p>Артикул: {item_code}</p>
          </div>

          {/* Соцсети */}
          <div className="flex gap-4 text-secondary mt-2">
            <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTopBlock;
