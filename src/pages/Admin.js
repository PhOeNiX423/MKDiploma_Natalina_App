import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Admin() {
  
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
      <p>Добро пожаловать, администратор!</p>
      <button onClick={logout}>Выйти</button>
      {/* Здесь можно разместить управление товарами, заказами, пользователями и т.д. */}
    </div>
  );
}