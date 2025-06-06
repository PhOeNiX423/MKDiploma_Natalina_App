import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IoExitOutline } from "react-icons/io5";
import UserModal from "../components/UserModal";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const API_URL = process.env.REACT_APP_DB_URL_USERS;
const ORDERS_URL = process.env.REACT_APP_DB_URL_ORDERS;

export default function Admin() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    // Загрузка пользователей
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setConsultants(data.filter((u) => u.role === "consultant"));
      })
      .catch(console.error);

    // Загрузка отзывов
    fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}`)
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter((r) => r.status === "на проверке");
        setPendingReviews(pending);
      })
      .catch(console.error);

    // Загрузка заказов
    fetch(ORDERS_URL)
      .then((res) => res.json())
      .then((data) =>
        setOrders(data.filter((o) => o.status === "передан в офис"))
      )
      .catch(console.error);
  }, []);

  if (isMobile) {
    return (
      <div className="p-6 text-center text-pinksecondary">
        <h1 className="text-2xl font-bold text-pinkaccent mb-4">
          Админ-панель
        </h1>
        <p className="text-lg">
          Для управления пользователями, пожалуйста, откройте эту страницу на
          компьютере.
        </p>
      </div>
    );
  }

  const formatPhone = (rawPhone) => {
    const digits = rawPhone.replace(/\D/g, ""); // оставить только цифры
    if (digits.length !== 11 || !digits.startsWith("7")) return rawPhone;

    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
      7,
      9
    )}-${digits.slice(9)}`;
  };

  const openModalToEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const openModalToAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) return false;

      const updatedUser = await res.json();
      setUsers((prev) =>
        editingUser
          ? prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
          : [...prev, updatedUser]
      );
      return true;
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этого пользователя?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const assignConsultant = async (orderId) => {
    const consultantId = selectedConsultants[orderId];
    if (!consultantId) return alert("Выберите консультанта");

    try {
      const res = await fetch(`${ORDERS_URL}/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultant_id: consultantId,
          status: "в обработке консультантом",
        }),
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setSelectedConsultants((prev) => {
          const newState = { ...prev };
          delete newState[orderId];
          return newState;
        });
      }
    } catch (err) {
      console.error("Ошибка при назначении консультанта:", err);
    }
  };

  const approveReview = async (id, productId) => {
    try {
      await fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "опубликован" }),
      });

      // Удаляем из списка
      setPendingReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Ошибка при одобрении отзыва:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}/${id}`, {
        method: "DELETE",
      });

      setPendingReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
          Личный кабинет
        </h1>
        <p className="text-pinksecondary text-lg">
          Добро пожаловать, администратор!
        </p>
      </div>

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={logout}
          className="text-pinkaccent items-center flex flex-row text-2xl"
        >
          <div className="text-lg mr-2 font-medium">Выйти</div>
          <IoExitOutline />
        </button>
      </div>

      <div className="mt-8 mb-4 text-right">
        <button
          onClick={openModalToAdd}
          className="bg-pinkaccent hover:bg-pink-600 text-white px-4 py-2 rounded shadow"
        >
          Добавить пользователя
        </button>
      </div>

      <div className="mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-pinkaccent">
          Список пользователей
        </h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-white border border-gray-200 p-5 rounded transition flex justify-between items-center"
            >
              <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  Телефон: {formatPhone(user.phone)}
                </p>
                <span className="text-xs font-medium inline-block mt-1 px-2 py-1 rounded bg-secondary text-white">
                  Роль: {user.role}
                </span>
              </div>
              <div className="space-x-2 flex-shrink-0">
                <button
                  onClick={() => openModalToEdit(user)}
                  className="text-white bg-pinksecondary hover:bg-[#F87DA8] px-4 py-2 rounded transition text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-pinkaccent">
          Заказы в обработке
        </h2>

        {orders.length === 0 && (
          <p className="text-gray-500">Нет заказов, ожидающих назначения.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {order.name}
              </p>
              <p className="text-sm text-gray-500">{order.phone}</p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                className="border px-3 py-2 rounded w-full md:w-auto"
                value={selectedConsultants[order._id] || ""}
                onChange={(e) =>
                  setSelectedConsultants((prev) => ({
                    ...prev,
                    [order._id]: e.target.value,
                  }))
                }
              >
                <option value="">Выбрать консультанта</option>
                {consultants.map((consultant) => (
                  <option key={consultant._id} value={consultant._id}>
                    {consultant.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => assignConsultant(order._id)}
                className="bg-pinkaccent hover:bg-pink-600 text-white px-4 py-2 rounded transition"
              >
                Назначить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-pinkaccent">
          Отзывы на модерации
        </h2>

        {pendingReviews.length === 0 && (
          <p className="text-gray-500">Нет отзывов, ожидающих модерации.</p>
        )}

        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 p-4 rounded flex flex-col gap-2"
            >
              <p className="text-sm text-gray-800">
                <strong>Комментарий:</strong> {review.comment}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Оценка:</strong> {review.rating} ★
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => approveReview(review._id, review.product_id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  <IoCheckmarkSharp />
                </button>
                <button
                  onClick={() => deleteReview(review._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingUser}
        />
      )}
    </div>
  );
}
