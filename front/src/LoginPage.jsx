import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useState } from "react";
import "./LoginPage.css";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const nombre = formData.get("nombre");
    const password = formData.get("password");

    login(
      nombre,
      password,
      () => navigate(from, { replace: true }), // OK
      () => setError(true) // Error
    );

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="login-form">
        <h2>Iniciar sesión</h2>
        <input name="nombre" type="text" required placeholder="Nombre" />
        <input name="password" type="password" required placeholder="Contraseña"/>
        <button type="submit">Ingresar</button>
        {error && <p style={{color: "red"}}>Usuario o contraseña inválido</p>}
      </form>
    </>
  );
};
