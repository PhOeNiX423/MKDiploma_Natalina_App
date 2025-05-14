import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    handleRemove,
    getTotal,
  } = useContext(CartContext);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Корзина</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Ваша корзина пуста.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6 mb-10">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.product_line}</p>
                  <div className="flex items-center mt-2 gap-3">
                    <button
                      className="text-xl px-2 py-1 border rounded"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-xl px-2 py-1 border rounded"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500 text-sm underline"
                      onClick={() => handleRemove(item._id)}
                    >
                      удалить
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {(item.price * item.quantity).toLocaleString("ru-RU", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ₽
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-6">
            <span className="text-lg font-semibold">Итого:</span>
            <span className="text-lg font-bold">
              {getTotal().toLocaleString("ru-RU", {
                minimumFractionDigits: 2,
              })}{" "}
              ₽
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 inline-block w-full text-center bg-pinkaccent text-white py-3 rounded-lg text-sm uppercase font-medium hover:bg-pinkaccent/90 transition"
          >
            Перейти к оформлению
          </Link>
        </>
      )}
    </div>
  );
};

export default Checkout;
