import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const cities = ["Москва"];
const districts = ["Южный"];
const metros = ["Тульская", "Нагатинская", "Нагорная"];

export default function Checkout() {
  const { user } = useAuth();
  const { cart, getTotal, clearCart } = React.useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: "",
    district: "",
    metro: "",
    comment: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 💡 сбрасываем старые состояния
    setError("");
    setSuccess(false);

    if (!form.city || !form.district || !form.metro || cart.length === 0) {
      setError(
        "Заполните все обязательные поля и убедитесь, что корзина не пуста."
      );
      return;
    }

    const cleanPhone = "+7" + form.phone.replace(/\D/g, "").slice(-10);

    const orderData = {
      user_id: user?._id || null,
      name: form.name,
      phone: cleanPhone,
      products: cart.map((p) => ({
        product_id: p._id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
      total_amount: getTotal(),
      status: "передан в офис",
      city: form.city,
      district: form.district,
      metro: form.metro,
      comment: form.comment,
    };

    try {
      if (!user) {
        try {
          const checkRes = await fetch(
            `${process.env.REACT_APP_DB_URL_USERS}/check-phone`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phone: cleanPhone, name: form.name }),
            }
          );

          if (checkRes.status === 409) {
            const data = await checkRes.json();
            setError(data.message);
            return;
          }
        } catch (err) {
          console.warn("Ошибка при проверке номера", err);
        }
      }
      const res = await fetch(`${process.env.REACT_APP_DB_URL_ORDERS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.status === 201) {
        setSuccess(true);
        setError(""); // ещё раз сбрасываем ошибку
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Не удалось оформить заказ.");
      }
    } catch (err) {
      setError("Не удалось оформить заказ.");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* Заголовок страницы */}
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
          Оформление заказа
        </h1>
        <p className="text-pinksecondary text-lg">
          Всего пара шагов до завершения покупки!
        </p>
      </div>

      {/* Сообщения */}
      <div className="mt-6 space-y-4">
        {/* Показываем ошибку только если НЕТ успеха */}
        {!success && error && (
          <div className="w-full text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-center">
            {error}
          </div>
        )}

        {/* Показываем успех, если success === true */}
        {success && (
          <div className="w-full text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-center">
            Заказ успешно отправлен!
          </div>
        )}
      </div>

      {/* Форма */}
      <div className="mt-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-2"
            required
            disabled={!!user}
          />

          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={form.phone}
            unmask={false}
            onAccept={(value) => setForm({ ...form, phone: value })}
            className="border rounded p-2"
            placeholder="+7 (___) ___-__-__"
            name="phone"
            required
            disabled={!!user}
          />

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Выберите город</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Выберите район</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="metro"
            value={form.metro}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Выберите метро</option>
            {metros.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Комментарий к заказу"
            className="border rounded p-2"
          />

          <button
            type="submit"
            className="bg-pinkaccent text-white py-2 px-4 rounded hover:bg-pink-700 transition"
          >
            Отправить заказ
          </button>
        </form>
      </div>
    </div>
  );
}
