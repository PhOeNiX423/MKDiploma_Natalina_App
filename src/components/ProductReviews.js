/**
 * ProductReviews.js
 * 
 * Компонент отображает список отзывов к товару.
 * 
 * Функциональность:
 * - Получает список отзывов по `productId` из API (`REACT_APP_DB_URL_REVIEWS`)
 * - Получает список пользователей (`REACT_APP_DB_URL_USERS`) для отображения имени и аватара
 * - Отображает:
 *   - Имя пользователя (или «Аноним»)
 *   - Аватар (если есть) или плейсхолдер
 *   - Дату создания отзыва
 *   - Оценку (в виде звёзд)
 *   - Комментарий пользователя
 * 
 * Особенности:
 * - Каждому отзыву сопоставляется пользователь по `user_id`
 * - Формат даты: день месяц год (локаль: `ru-RU`)
 * - Если у пользователя нет аватара, отображается плейсхолдер
 * - Адаптивная верстка: на `md+` раскладка горизонтальная, на мобилках — вертикальная
 */

import React, { useEffect, useState } from 'react';

import { FaStar } from 'react-icons/fa';

const placeholderAvatar = '/images/placeholders/user_placeholder.png'; // временный аватар

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, usersRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}/${productId}`),
          fetch(`${process.env.REACT_APP_DB_URL_USERS}`)
        ]);

        const [reviewsData, usersData] = await Promise.all([
          reviewsRes.json(),
          usersRes.json()
        ]);

        setReviews(reviewsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов или пользователей:', error);
      }
    };

    if (productId) fetchData();
  }, [productId]);

  const getUser = (userId) => users.find((user) => user._id === userId);

  return (
    <div className="space-y-10 mt-10">
      {reviews.map((review) => {
        const user = getUser(review.user_id);
        const userName = user?.name || 'Аноним';
        const createdAt = new Date(review.created_at).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return (
          <div key={review._id} className="flex flex-col md:flex-row gap-4 border-b pb-6">
            {/* Аватар и имя */}
            <div className="flex-shrink-0">
              <img
                src={user?.avatar || placeholderAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">{userName}</p>
                  <p className="text-xs text-gray-400">{createdAt}</p>
                </div>
                <div className="flex items-center gap-1 text-yellowmedium">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                  <span className="ml-1 text-xs text-gray-600">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{review.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductReviews;