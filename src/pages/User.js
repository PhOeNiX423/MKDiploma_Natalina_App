import React from "react";
import { useAuth } from "../contexts/AuthContext";
import PurchaseList from "../components/PurchaseList";

import { IoExitOutline } from "react-icons/io5";

export default function User() {
  const { user, logout } = useAuth();

  return (
    <div className="py-8">
      {/* Заголовок страницы */}
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
          Личный кабинет
        </h1>
        <p className="text-pinksecondary text-lg">
          Добро пожаловать, {user?.name || "гость"}!
        </p>
      </div>

      <div className="flex items-center justify-end mt-6">
        <button onClick={logout} className="text-pinkaccent items-center flex flex-row text-2xl">
          <div className="text-lg mr-2 font-medium">
          Выйти
        </div>
          <IoExitOutline />
        </button>
      </div>

      {/* Покупки и отзывы */}
      {user?._id && <PurchaseList userId={user._id} />}
    </div>
  );
}
