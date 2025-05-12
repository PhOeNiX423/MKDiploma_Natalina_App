/**
 * SidebarContext.js
 * 
 * Контекст для управления состоянием боковой панели (sidebar) на сайте.
 * 
 * - Хранит состояние `isOpen` — открыта ли панель.
 * - Предоставляет методы:
 *   - `setIsOpen` — для ручного открытия/закрытия панели.
 *   - `handleClose` — для закрытия панели.
 * 
 * - При открытии панели отключает прокрутку страницы через добавление класса "body-no-scroll".
 * - При размонтировании компонента очищает этот класс.
 * 
 * Используется для управления, например, мобильным меню или корзиной сбоку.
 */

import React, { useState, useEffect, createContext } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpen]);

  return <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
    {children}
  </SidebarContext.Provider>;
};

export default SidebarProvider;
