/**
 * CartContext.js
 * 
 * Контекст для управления корзиной покупок на сайте.
 * 
 * Состояние:
 * - `cart` — массив товаров, добавленных в корзину.
 * 
 * Основные функции:
 * - `addToCart(product)` — добавляет товар в корзину. Если он уже есть, увеличивает его количество.
 * - `increaseQuantity(id)` — увеличивает количество выбранного товара на 1.
 * - `decreaseQuantity(id)` — уменьшает количество товара на 1. Если количество становится 0, товар удаляется из корзины.
 * - `handleRemove(id)` — полностью удаляет товар из корзины.
 * - `getTotal()` — возвращает общую сумму всех товаров в корзине.
 * - `getItemCount()` — возвращает общее количество товаров (штучно).
 * 
 * Используется для глобального управления корзиной: отображения, расчёта итогов, удаления и изменения количества.
 */

import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (productToAdd) => {
  const existingItem = cart.find((item) => item._id === productToAdd._id);
  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item._id === productToAdd._id
        ? { ...item, quantity: item.quantity + productToAdd.quantity }
        : item
    );
    setCart(updatedCart);
  } else {
    setCart([...cart, productToAdd]);
  }
};

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // удаляем, если стало 0
    setCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, handleRemove, getTotal, getItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
