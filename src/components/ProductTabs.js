/**
 * ProductTabs.js
 *
 * Компонент с вкладками для отображения информации о товаре:
 * - Описание
 * - Детали (категория, линейка, состав, артикул и т.п.)
 * - Отзывы
 *
 * Использует:
 * - `ProductReviews` — для отображения списка отзывов
 * - `react-icons` (FaStar) — для вывода звёзд рейтинга
 *
 * Функциональность:
 * - Вкладки управляются через локальное состояние `activeTab`
 * - Отзывы подгружаются через `fetch` из API (`REACT_APP_DB_URL_REVIEWS`) по ID товара
 * - Вычисляется средняя оценка и статистика по звёздам (5★–1★)
 * - Вкладка отзывов показывает графику оценок + компонент `ProductReviews`
 *
 * Особенности:
 * - Рейтинг округляется до 1 знака после запятой
 * - Каждая вкладка отображает соответствующий контент
 * - `ProductReviews` отображается только при активной вкладке «Отзывы»
 */

import React, { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import ProductReviews from "./ProductReviews";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("Отзывы");
  const [reviews, setReviews] = useState([]);

  const {
    _id: productId,
    description,
    ingredients,
    target_area,
    category,
    product_line,
    item_code,
  } = product;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_DB_URL_REVIEWS}/${productId}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Ошибка при получении отзывов:", err);
      }
    };
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const publishedReviews = reviews.filter((r) => r.status === "опубликован");

  const totalReviews = publishedReviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          publishedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const reviewsBreakdown = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = publishedReviews.filter((r) => r.rating === star).length;
    return acc;
  }, {});

  const getPercent = (count) => {
    return totalReviews ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-10 font-primary">
      {/* Вкладки */}
      <div className="flex flex-wrap gap-6 border-b border-gray-200 text-sm md:text-base">
        {["Описание", "Детали", "Отзывы"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 border-b-2 transition-all ${
              activeTab === tab
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-secondary hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Контент */}
      <div className="mt-8">
        {activeTab === "Отзывы" && (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Средняя оценка */}
              <div className="md:w-1/3 text-center md:text-left">
                <div className="text-4xl font-bold text-primary">
                  {averageRating}
                </div>
                <div className="flex justify-center md:justify-start items-center gap-1 mt-2 text-yellowmedium">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-sm text-secondary mt-2">
                  ({totalReviews} отзывов)
                </p>
              </div>

              {/* Разбивка по звёздам */}
              <div className="flex-1 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-16 text-sm text-secondary">{star} ★</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellowmedium h-2 rounded-full"
                        style={{
                          width: `${getPercent(reviewsBreakdown[star])}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProductReviews
              productId={product._id}
              visible={activeTab === "Review"}
            />
          </>
        )}

        {activeTab === "Описание" && (
          <div className="text-secondary mt-4 space-y-4">
            {description && <p>{description}</p>}
          </div>
        )}

        {activeTab === "Детали" && (
          <div className="text-secondary mt-4 space-y-2">
            {product_line && (
              <p>
                <span className="font-semibold text-primary">Линейка: </span>
                {product_line}
              </p>
            )}
            {category && (
              <p>
                <span className="font-semibold text-primary">Категория: </span>
                {category}
              </p>
            )}
            {target_area && (
              <p>
                <span className="font-semibold text-primary">
                  Зона применения:{" "}
                </span>
                {target_area}
              </p>
            )}
            {item_code && (
              <p>
                <span className="font-semibold text-primary">Артикул: </span>
                {item_code}
              </p>
            )}
            {ingredients && (
              <p>
                <span className="font-semibold text-primary">Состав: </span>
                {ingredients}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
