/**
 * ProductDetails.js
 * 
 * Компонент страницы с подробной информацией о товаре.
 * 
 * - Получает ID товара из URL с помощью useParams (React Router).
 * - Извлекает список товаров из контекста ProductContext.
 * - Ищет нужный товар по ID.
 * - Если товар найден, отображает:
 *   - ProductTopBlock — верхний блок с изображением, ценой, описанием и кнопками.
 *   - ProductTabs — вкладки с описанием, характеристиками и отзывами.
 * - При отсутствии данных выводит сообщение о загрузке.
 */

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductTopBlock from '../components/ProductTopBlock';
import ProductTabs from '../components/ProductTabs';

import ProductContext from '../contexts/ProductContext';


const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return <div className="text-center py-10">Загрузка товара...</div>;
  }

  return (
    <div>
      <ProductTopBlock product={product} />
      <ProductTabs product={product} />
    </div>
  );
};

export default ProductDetails;

