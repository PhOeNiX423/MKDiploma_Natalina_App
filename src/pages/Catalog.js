/**
 * Catalog.js
 * 
 * Страница каталога товаров с фильтрацией и сортировкой.
 * 
 * - Получает данные из CatalogContext:
 *   - Список всех категорий
 *   - Отфильтрованные товары
 *   - Активную категорию
 *   - Текущий способ сортировки
 *   - Функции для применения фильтра и сортировки
 * 
 * - Состоит из двух колонок:
 *   - Сайдбар с категориями, которые можно выбрать
 *   - Основная секция с сортировкой и сеткой карточек товаров
 * 
 * - Использует компонент <Product /> для отображения каждого товара.
 */

import React, { useContext } from 'react';

import { CatalogContext } from '../contexts/CatalogContext';

import Product from '../components/Product';

const Catalog = () => {
  const {
    categories,
    filteredProducts,
    activeCategory,
    sortOrder,
    handleCategoryFilter,
    handleSortChange,
  } = useContext(CatalogContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Каталог продукции</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Сайдбар фильтров */}
        <aside className="space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Категории</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryFilter('Все')}
                  className={`hover:underline ${
                    activeCategory === 'Все' ? 'font-bold text-pinkaccent' : ''
                  }`}
                >
                  Все
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryFilter(cat)}
                    className={`hover:underline ${
                      activeCategory === cat ? 'font-bold text-pinkaccent' : ''
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Основная часть */}
        <main className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Найдено: {filteredProducts.length} товаров
            </span>
            <select
              className="border px-2 py-1 text-sm rounded"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default">По популярности</option>
              <option value="asc">По цене (возрастание)</option>
              <option value="desc">По цене (убывание)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;