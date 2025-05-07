import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src="/images/logos/mk-logo-pink.svg"
        alt="Mary Kay"
        className="h-10 mb-10 mx-auto"
      />
      <h1 className="text-6xl font-bold text-pinkaccent mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Страница не найдена</h2>
      <p className="text-gray-600 mb-6">
        Возможно, вы ошиблись в адресе или страница была удалена.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-pinkaccent text-white font-medium hover:bg-pink-700 transition"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
