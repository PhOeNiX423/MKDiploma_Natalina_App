import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";

const PurchaseList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`${process.env.REACT_APP_DB_URL_ORDERS}/${userId}`)
      .then((res) => res.json())
      .then(async (data) => {
        setOrders(data);

        const allProductIds = data
          .flatMap((order) => order.products)
          .map((p) => String(p.product_id));

        const productMap = {};
        await Promise.all(
          allProductIds.map(async (id) => {
            const res = await fetch(
              `${process.env.REACT_APP_DB_URL_PRODUCTS}/${id}`
            );
            if (res.ok) {
              const product = await res.json();
              productMap[id] = product;
            }
          })
        );

        setProductsMap(productMap);
      });

    fetch(`${process.env.REACT_APP_DB_URL_REVIEWS}/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, [userId]);

  const hasReview = (productId) => {
    const productIdStr = String(productId?.$oid || productId);
    return reviews.some((r) => {
      const reviewIdStr = String(r.product_id?.$oid || r.product_id);
      return reviewIdStr === productIdStr;
    });
  };

  const allProducts = orders.flatMap((order, index) => {
    if (!Array.isArray(order.products)) return [];
    return order.products.map((product) => {
      const id = String(product.product_id);
      const productData = productsMap[id] || {};
      return {
        product_id: id,
        title: productData.title || "Неизвестный товар",
        product_line: productData.product_line || "",
        quantity: product.quantity,
        price: product.price,
        image:
          productData.images && productData.images.length > 0
            ? productData.images[0]
            : null,
        purchasedAt: order.created_at,
      };
    });
  });

  return (
    <>
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pinkaccent">
          Мои покупки
        </h2>
        {allProducts.length === 0 && <p>Пока нет заказов.</p>}
        {allProducts.map((product) => (
          <div
            key={product.product_id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white rounded-xl shadow"
          >
            <div className="flex items-center gap-4">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
              )}
              <div>
                <h3 className="font-medium">
                  {product.title} {product.product_line}
                </h3>
                <p className="text-sm text-gray-500">
                  Цена: {product.price.toLocaleString("ru-RU")} ₽
                </p>
                <p className="text-sm text-gray-400">
                  Количество: {product.quantity}
                </p>
                {product.purchasedAt && (
                  <p className="text-sm text-gray-400">
                    Куплено:{" "}
                    {new Date(product.purchasedAt).toLocaleDateString("ru-RU")}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end">
              <button
                onClick={() => {
                  if (!hasReview(product.product_id)) {
                    setActiveProduct(product);
                  }
                }}
                disabled={hasReview(product.product_id)}
                className={`px-4 py-2 rounded-md w-full max-w-[180px] md:w-auto transition ${
                  hasReview(product.product_id)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pinkaccent text-white hover:bg-pink-600"
                }`}
              >
                {hasReview(product.product_id) ? "Оценено" : "Оценить"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно — вне обертки */}
      {activeProduct && (
        <ReviewModal
          product={activeProduct}
          userId={userId}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </>
  );
};

export default PurchaseList;
