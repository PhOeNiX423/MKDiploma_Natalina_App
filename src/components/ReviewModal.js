import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const ReviewModal = ({ product, userId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  // Отключение прокрутки при открытом модальном окне
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.product_id,
          user_id: userId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          setError(data.message || "Вы уже оставили отзыв для этого товара.");
        } else {
          setError("Произошла ошибка при отправке отзыва.");
        }
        return;
      }

      onClose();
      window.location.reload();
    } catch (err) {
      setError("Ошибка соединения с сервером.");
    }
  };

  return (
    <>
      {/* Затемнение фона */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      ></div>

      {/* Модальное окно */}
      <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <div
          className="bg-white p-6 rounded-lg w-full max-w-md relative pointer-events-auto shadow-lg mx-[30px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-secondary hover:text-black transition"
            aria-label="Закрыть"
          >
            <IoCloseOutline className="text-2xl" />
          </button>

          {/* Заголовок и линейка */}
          <h2 className="text-lg font-bold mt-4 mb-1">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{product.product_line}</p>

          {/* Оценка */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setRating(i)}
                className={`text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Текст отзыва */}
          <textarea
            className="w-full border rounded p-2"
            placeholder="Оставьте отзыв..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Ошибка */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Кнопки */}
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-gray-600">
              Отмена
            </button>
            <button
              onClick={handleSubmit}
              className="bg-pinkaccent text-white px-4 py-2 rounded"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;