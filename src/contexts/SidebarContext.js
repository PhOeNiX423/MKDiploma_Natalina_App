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
