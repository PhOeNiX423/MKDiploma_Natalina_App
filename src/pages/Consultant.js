import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { SearchContext } from "../contexts/SearchContext";
import { IoExitOutline } from "react-icons/io5";
import UserModal from "../components/UserModal";

export default function Consultant() {
  const { user, logout } = useAuth();
  const { query, setQuery } = useContext(SearchContext);

  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [creatingPhone, setCreatingPhone] = useState("");
  const [updating, setUpdating] = useState(false);

  const USERS_URL = process.env.REACT_APP_DB_URL_USERS;
  const ORDERS_URL = process.env.REACT_APP_DB_URL_ORDERS;
  const PRODUCTS_URL = process.env.REACT_APP_DB_URL_PRODUCTS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Заказы
        const resOrders = await fetch(ORDERS_URL);
        const dataOrders = await resOrders.json();
        const filtered = dataOrders.filter(
          (o) => o.status === "в обработке консультантом"
        );
        setOrders(filtered);

        // Продукты
        const resProducts = await fetch(PRODUCTS_URL);
        const dataProducts = await resProducts.json();
        setAllProducts(dataProducts);

        const map = {};
        dataProducts.forEach((p) => (map[p._id] = p));
        setProductsMap(map);

        // Все пользователи
        const resUsers = await fetch(USERS_URL);
        const dataUsers = await resUsers.json();
        setAllUsers(dataUsers);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      }
    };

    fetchData();
  }, []);

  const updateQuantity = (orderIndex, productId, value) => {
    const newOrders = [...orders];
    const qty = Math.max(0, parseInt(value) || 0);
    newOrders[orderIndex].products = newOrders[orderIndex].products.map((p) =>
      p.product_id === productId ? { ...p, quantity: qty } : p
    );
    setOrders(newOrders);
  };

  const addProductToOrder = (orderIndex, product) => {
    const newOrders = [...orders];
    const order = newOrders[orderIndex];
    const exists = order.products.some((p) => p.product_id === product._id);
    if (exists) return;

    order.products.push({
      product_id: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });

    setOrders(newOrders);
    setQuery("");
  };

  const calculateTotal = (products) =>
    products.reduce((sum, p) => sum + (p.quantity || 0) * p.price, 0);

  const handleSubmit = async (orderId, updatedProducts) => {
    setUpdating(true);
    try {
      const total = calculateTotal(updatedProducts);
      const res = await fetch(`${ORDERS_URL}/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: updatedProducts,
          status: "завершен",
          total_amount: total,
        }),
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (err) {
      console.error("Ошибка при завершении заказа:", err);
    } finally {
      setUpdating(false);
    }
  };

  const userExists = (phone) => allUsers.some((u) => u.phone === phone);

  const openCreateUser = (phone, name) => {
    setCreatingPhone({ phone, name });
    setModalOpen(true);
  };

  const handleUserSave = async (formData) => {
    try {
      const res = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) return false;

      const newUser = await res.json();
      setAllUsers((prev) => [...prev, newUser]);

      const orderToUpdate = orders.find((o) => o.phone === newUser.phone);

      if (orderToUpdate) {
        await fetch(`${ORDERS_URL}/${orderToUpdate._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: newUser._id }),
        });

        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderToUpdate._id ? { ...o, user_id: newUser._id } : o
          )
        );
      }

      return true;
    } catch (err) {
      console.error("Ошибка при создании пользователя:", err);
      return false;
    }
  };

  return (
    <div className="py-8">
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
          Личный кабинет
        </h1>
        <p className="text-pinksecondary text-lg">
          Добро пожаловать, консультант {user?.name || ""}!
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

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-pinkaccent">
          Мои заказы
        </h2>
        {orders.length === 0 && (
          <p className="text-gray-500">Нет заказов в обработке.</p>
        )}

        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            <div className="text-lg font-semibold text-gray-800">
              Заказ от {order.name} ({order.phone})
            </div>

            {!userExists(order.phone) && (
              <div className="text-sm text-red-600">
                Пользователь не найден.{" "}
                <button
                  onClick={() => openCreateUser(order.phone, order.name)}
                  className="text-blue-600 hover:underline"
                >
                  Создать
                </button>
              </div>
            )}

            <div className="space-y-3">
              {order.products.map((p) => {
                const productData = productsMap[p.product_id] || {};
                return (
                  <div
                    key={p.product_id}
                    className="flex justify-between items-center gap-4"
                  >
                    <div>
                      <p>
                        {p.title}{" "}
                        <span className="text-sm italic text-gray-400">
                          {productData.product_line || ""}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">Цена: {p.price} ₽</p>
                    </div>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={p.quantity}
                      onChange={(e) =>
                        updateQuantity(index, p.product_id, e.target.value)
                      }
                      className="w-20 border rounded px-2 py-1 text-right"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Добавить товар..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {query.length > 1 && (
                <ul className="mt-2 border rounded bg-white shadow max-h-40 overflow-y-auto">
                  {allProducts
                    .filter(
                      (p) =>
                        p.title.toLowerCase().includes(query.toLowerCase()) &&
                        !order.products.some(
                          (prod) => prod.product_id === p._id
                        )
                    )
                    .map((p) => (
                      <li
                        key={p._id}
                        className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
                        onClick={() => addProductToOrder(index, p)}
                      >
                        {p.title} — {p.price} ₽
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="text-right text-lg font-semibold mt-4">
              Итого: {calculateTotal(order.products).toLocaleString("ru-RU")} ₽
            </div>

            <button
              disabled={updating}
              onClick={() => handleSubmit(order._id, order.products)}
              className="bg-pinkaccent hover:bg-pink-600 text-white px-4 py-2 rounded mt-4"
            >
              Завершить заказ
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          onSave={handleUserSave}
          initialData={{ phone: creatingPhone.phone, name: creatingPhone.name }}
          restrictToUserOnly={true}
        />
      )}
    </div>
  );
}
