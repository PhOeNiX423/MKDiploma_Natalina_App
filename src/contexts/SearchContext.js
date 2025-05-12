/**
 * SearchContext.js
 * 
 * Контекст для управления состоянием поискового окна и текстом запроса.
 * 
 * - `isSearchOpen` — отвечает за открытие/закрытие панели поиска.
 * - `query` — хранит текст, введённый пользователем в строку поиска.
 * - Предоставляет функции:
 *   - `setIsSearchOpen` — открывает или закрывает окно поиска.
 *   - `setQuery` — обновляет текущий поисковый запрос.
 * 
 * Используется для глобального управления поиском на сайте, например, в хедере.
 */

import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  
  return (
    <SearchContext.Provider
      value={{ isSearchOpen, setIsSearchOpen, query, setQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
