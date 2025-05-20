/**
 * Home.js
 *
 * Главная страница сайта.
 *
 * - Загружает товары из ProductContext и фильтрует их по соответствующим тегам.
 * - Отображает несколько секций:
 *   - <Banner /> — верхний баннер.
 *   - Блок новинок — отображаются товары с тегом "новое" в сетке.
 *   - <Newsletter /> — форма подписки на рассылку.
 * - Имеет закомментированную секцию категорий, которую можно включить позже.
 * - Использует компонент <Product /> для отображения карточек товаров.
 */

import React, { useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Categories from "../components/Categories";
import ProductSkeleton from "../components/ProductSkeleton";
import PromoSlider from "../components/PromoSlider";

const Home = () => {
  const { products } = useContext(ProductContext);
  const isLoading = products.length === 0;
  const filteredProducts = products.filter((item) => {
    return item.tags && item.tags.includes("новое");
  });

  return (
    <main>
      <section className="py-12 md:pb-16 md:pt-8">
        <PromoSlider />
      </section>

      <section className="pb-8 md:pb-16">
        <Categories />
      </section>

      <section className="pb-8 md:pb-16">
        <h2 className="text-3xl text-pinkaccent font-bold text-center pb-8">
          Новинки
        </h2>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : filteredProducts.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container max-w-3xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </main>
  );
};

export default Home;
