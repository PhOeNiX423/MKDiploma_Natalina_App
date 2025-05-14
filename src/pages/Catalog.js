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

import React, { useContext } from "react";

import { CatalogContext } from "../contexts/CatalogContext";

import Product from "../components/Product";

const Catalog = () => {
  const {
    categories,
    productLines,
    applications,
    filteredProducts,
    activeCategory,
    selectedProductLines,
    selectedApplications,
    sortOrder,
    handleCategoryFilter,
    toggleProductLine,
    toggleApplication,
    handleSortChange,
    resetFilters,
  } = useContext(CatalogContext);

  return (
    <div className="py-8">
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold mb-4 text-pinkaccent">Каталог продукции</h1>
        <p className="text-pinksecondary text-lg">Найдите свой идеальный продукт — легко и удобно</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-16">
        {/* Сайдбар фильтров */}
        <aside className="space-y-6">
          {/* Категории */}
          <div>
            <h2 className="font-semibold mb-2">Категории</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryFilter("Все")}
                  className={`hover:underline ${
                    activeCategory === "Все" ? "font-bold text-pinkaccent" : ""
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
                      activeCategory === cat ? "font-bold text-pinkaccent" : ""
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Линейка */}
          <div>
            <h2 className="font-semibold mb-2">Линейка</h2>
            <ul className="space-y-1 text-sm">
              {productLines.map((line) => (
                <li key={line}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProductLines.includes(line)}
                      onChange={() => toggleProductLine(line)}
                      className="accent-pinkaccent"
                    />
                    {line}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Область применения */}
          <div>
            <h2 className="font-semibold mb-2">Область применения</h2>
            <ul className="space-y-1 text-sm">
              {applications.map((app) => (
                <li key={app}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(app)}
                      onChange={() => toggleApplication(app)}
                      className="accent-pinkaccent"
                    />
                    {app}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {(activeCategory !== "Все" ||
            selectedProductLines.length > 0 ||
            selectedApplications.length > 0) && (
            <div>
              <button
                onClick={resetFilters}
                className="text-sm text-pinkaccent underline font-bold hover:no-underline"
              >
                Сбросить все
              </button>
            </div>
          )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
