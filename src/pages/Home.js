import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Banner from "../components/Banner";

const Home = () => {
  const { products } = useContext(ProductContext);
  const filteredProducts = products.filter((item) => {
    return item.t_category && item.t_category.includes("новое");
  });

  return (
    <main>
      <section className="pb-8 md:pb-16">
        <div className="mx-auto">
          <Banner />
        </div>
      </section>

      {/* <section className="pb-8 md:pb-16">
        <div className="container mx-auto"> */}
          {/* <h2 className="text-3xl text-pinkaccent font-bold text-center pb-8">
            Популярные категории
          </h2> */}
          {/* <Categories /> */}
        {/* </div>
      </section> */}

      <section className="pb-8 md:pb-16">
        <h2 className="text-3xl text-pinkaccent font-bold text-center pb-8">
          Новинки
        </h2>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px] px-4 max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product._id} />;
            })}
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
