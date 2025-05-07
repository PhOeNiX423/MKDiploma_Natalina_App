import React, { useState, useEffect, createContext } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    // Очистка при размонтировании компонента
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
    {children}
  </SidebarContext.Provider>;
};

export default SidebarProvider;
