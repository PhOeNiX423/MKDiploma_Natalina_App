import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (login, password) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_DB_URL_USERS}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.ok) {
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
