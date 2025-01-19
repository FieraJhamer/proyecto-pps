import { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

// Hook con sesion
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente principal
export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState(() => {
    const tokenGuardado = sessionStorage.getItem("token");
    return tokenGuardado ? JSON.parse(tokenGuardado) : null;
  });

  const login = async (nombre, password, ok, error) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password }),
    });

    if (!response.ok) {
      error();
      return;
    }

    const sesion = await response.json();
    setSesion(sesion);

    sessionStorage.setItem("token", JSON.stringify(sesion));

    ok();
  };

  const logout = (ok) => {
    setSesion(null);

    sessionStorage.removeItem("token");

    ok();
  };

  const value = { sesion, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// Autorizar pagina
export const AuthPage = ({ children }) => {
  const { sesion } = useAuth();
  const location = useLocation();

  if (!sesion) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Autorizar superusuario
export const AuthRol = ({ superusuario, children }) => {
  const { sesion } = useAuth();
  if (!sesion || sesion.superusuario !== superusuario) {
    return null;
  }

  return children;
};

// Estado de autorizacion
// export const AuthStatus = () => {
//   const { sesion, logout } = useAuth();
//   const navigate = useNavigate();

//   if (!sesion) {
//     return <p>No esta conectado</p>;
//   }

//   return (
//     <>
//       {/* <p>{sesion.nombre}</p>
//       <button onClick={() => logout(() => navigate("/"))}>Salir</button> */}
//     </>
//   );
// };
