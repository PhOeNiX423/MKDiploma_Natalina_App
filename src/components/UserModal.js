import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IMaskInput } from "react-imask";

const UserModal = ({
  onClose,
  onSave,
  initialData = null,
  restrictToUserOnly = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "" });
    }

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [initialData]);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || (!initialData && !form.password)) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const success = await onSave(form);
    if (!success) {
      setError("Ошибка при сохранении пользователя.");
      return;
    }

    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>

      <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <div
          className="bg-white p-6 rounded-lg w-full max-w-md relative pointer-events-auto shadow-lg mx-[30px]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-secondary hover:text-black transition"
            aria-label="Закрыть"
          >
            <IoCloseOutline className="text-2xl" />
          </button>

          <h2 className="text-xl font-bold mt-4 mb-4">
            {initialData
              ? "Редактировать пользователя"
              : "Добавить пользователя"}
          </h2>

          <input
            className="w-full border rounded px-3 py-2 mb-3"
            placeholder="Имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={form.phone}
            unmask={false}
            onAccept={(value, maskRef) => {
              const raw = "+7" + maskRef.unmaskedValue;
              setForm({ ...form, phone: raw });
            }}
            className="w-full border rounded px-3 py-2 mb-3"
            placeholder="+7 (___) ___-__-__"
            name="phone"
            required
          />

          <input
            type="password"
            className="w-full border rounded px-3 py-2 mb-3"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!initialData}
          />

          {restrictToUserOnly ? (
            <input
              type="text"
              value="Клиент"
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
            />
          ) : (
            <select
              className="w-full border rounded px-3 py-2"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">Клиент</option>
              <option value="admin">Администратор</option>
              <option value="consultant">Консультант</option>
            </select>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-gray-600">
              Отмена
            </button>
            <button
              onClick={handleSubmit}
              className="bg-pinkaccent text-white px-4 py-2 rounded hover:bg-[#F87DA8] transition"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
