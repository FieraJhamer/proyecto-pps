import { AuthRol, useAuth } from "../../Auth";
import { useNavigate } from "react-router-dom";
import "./PerfilPage.css"

export const PerfilPage = () => {
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/"));
  };
  return (
    <>
    <div className="Contenedor-Perfil">
      <h1 className="Perfil-Usuario">Perfil de Usuario 👤</h1>
      <p className="Perfil-Nombre">Nombre: {sesion?.nombre}</p>
      <AuthRol superusuario={1}>
        <p className="Admin">Es administrador</p>
      </AuthRol>
      <AuthRol superusuario={0} >
        <p className="Usuario">Es usuario</p>
      </AuthRol>
      <button onClick={handleLogout} className="Boton-Salir">Salir</button>
    </div>
    </>
  );
};
