/**
 * CatalogContext.js
 *
 * Контекст для управления состоянием и логикой страницы каталога товаров.
 *
 * Основной функционал:
 * - Загружает список товаров с сервера по адресу из переменной окружения `REACT_APP_DB_URL_PRODUCTS`.
 * - Автоматически формирует список уникальных категорий из полученных товаров.
 * - Поддерживает фильтрацию по категории (`activeCategory`) и сортировку по выбранному критерию (`sortOrder`).
 *
 * Поддерживаемые режимы сортировки:
 * - 'default' — по популярности (по убыванию `average_rating`)
 * - 'asc' — по возрастанию цены
 * - 'desc' — по убыванию цены
 *
 * Экспортируемые данные и методы:
 * - `products` — исходный список всех товаров
 * - `filteredProducts` — товары с применёнными фильтрами и сортировкой
 * - `categories` — список всех уникальных категорий
 * - `activeCategory` — выбранная пользователем категория
 * - `sortOrder` — текущий способ сортировки
 * - `handleCategoryFilter(category)` — применяет фильтр по категории
 * - `handleSortChange(value)` — изменяет тип сортировки
 *
 * Используется внутри компонента Catalog.js для отображения фильтрованного списка товаров.
 */

import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productLines, setProductLines] = useState([]);
  const [applications, setApplications] = useState([]);

  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProductLines, setSelectedProductLines] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.category) {
      handleCategoryFilter(location.state.category);
    }
  }, [location.state?.category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_DB_URL_PRODUCTS}`);
        const data = await res.json();
        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p) => p.category).filter(Boolean)),
        ];
        const uniqueProductLines = [
          ...new Set(data.map((p) => p.product_line).filter(Boolean)),
        ];
        const uniqueApplications = [
          ...new Set(data.map((p) => p.target_area).filter(Boolean)),
        ];

        setCategories(uniqueCategories);
        setProductLines(uniqueProductLines);
        setApplications(uniqueApplications);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeCategory !== "Все") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (selectedProductLines.length > 0) {
      result = result.filter((p) =>
        selectedProductLines.includes(p.product_line)
      );
    }

    if (selectedApplications.length > 0) {
      result = result.filter((p) =>
        selectedApplications.includes(p.target_area)
      );
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    }

    setFilteredProducts(result);
  }, [
    products,
    activeCategory,
    selectedProductLines,
    selectedApplications,
    sortOrder,
  ]);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const toggleProductLine = (line) => {
    setSelectedProductLines((prev) =>
      prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
    );
  };

  const toggleApplication = (app) => {
    setSelectedApplications((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const resetFilters = () => {
    setActiveCategory("Все");
    setSelectedProductLines([]);
    setSelectedApplications([]);
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        productLines,
        applications,
        activeCategory,
        selectedProductLines,
        selectedApplications,
        sortOrder,
        handleCategoryFilter,
        toggleProductLine,
        toggleApplication,
        handleSortChange,
        resetFilters,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogContext;
