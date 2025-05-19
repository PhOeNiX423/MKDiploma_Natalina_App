import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Auth() {
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginInput, password);
    if (result.success) {
      navigate(result.role === "admin" ? "/admin" : "/user");
    } else {
      setErrorMessage(result.message || "Неверный логин или пароль");
    }
  };

  // Убираем ошибку через 5 секунд
  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:min-h-[80vh]">
      {/* Левая часть — изображение */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white">
        <img
          src="/images/auth/marykay-login.png"
          alt="Mary Kay"
          className="w-full h-auto object-contain max-w-[600px] p-6"
        />
      </div>

      {/* Правая часть — форма */}
      <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[90vh] md:min-h-[80vh] p-6 bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <div className="flex justify-center mb-4">
            <img
              src="/images/logos/mk-logo-pink.svg"
              alt="Mary Kay"
              className="h-6 object-contain"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">
              введите ваш персональный номер:
            </label>
            <input
              type="text"
              autoComplete="username"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="000000000"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">
              введите ваш пароль:
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="пароль"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pinksecondary transition"
            />
          </div>

          <button
            type="submit"
            className="bg-pinkaccent hover:bg-pinkaccent/80 active:bg-pinkaccent/60 text-white font-medium py-2 rounded-lg transition"
          >
            войти
          </button>

          <div className="h-10 flex items-center justify-center">
            {errorMessage && (
              <div className="w-full text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
