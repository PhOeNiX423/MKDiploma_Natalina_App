import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import Product from "../components/Product";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="py-8 max-w-6xl mx-auto space-y-16">
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold mb-4 text-pinkaccent">Избранное</h1>
        <p className="text-pinksecondary text-lg">Тут только любимое — и ничего лишнего</p>
      </div>
      {favorites.length === 0 ? (
        <p className="text-gray-500">У вас пока нет избранных товаров.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
