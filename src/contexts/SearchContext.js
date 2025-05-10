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
