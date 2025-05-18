import { useAuth } from "../context/AuthContext";

const User = () => {
  const { logout } = useAuth();
  return (
    <>
      <h2>Добро пожаловать!</h2>
      <button onClick={logout}>Выйти</button>
    </>
  );
};