import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (phone, password) => {
    try {
      const cleanPhone = "+7" + phone.replace(/\D/g, "").slice(-10);

      const res = await fetch(`${process.env.REACT_APP_DB_URL_USERS}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, password }),
      });

      const data = await res.json();

      if (res.ok && data._id) {
        localStorage.setItem("authUser", JSON.stringify(data));
        setUser(data);
        return { success: true, role: data.role };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Ошибка сервера" };
    }
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
