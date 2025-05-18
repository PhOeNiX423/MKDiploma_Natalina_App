import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginInput, password);
    if (result.success) {
      navigate(result.role === "admin" ? "/admin" : "/user");
    } else {
      alert(result.message || "Ошибка входа");
    }
  };

  return (
    <div className="auth-page">
      <h2>Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          placeholder="Логин"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
