import React, {createContext, useState, useEffect} from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DB_URL}`);
        const data = await response.json();
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке товаров: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
