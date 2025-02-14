import "../Layout/Layout.css";
import { Link, Outlet } from "react-router-dom";
import { AuthRol } from "../../Auth";

export const Menu = () => {
  return (
    <>
      <nav>
        <ul>

          <li>
            <Link to="/perfil" className="nav-button">
              <img src="./assets/perfil.svg" alt="Perfil" />
            </Link>
          </li>

          <li>
            <Link to="/home" className="nav-button">
              <img src="./assets/home.svg" alt="Home" />
            </Link>
          </li>

          <AuthRol superusuario={1}>
            <li>
              <Link to="/usuarios" className="nav-button">
                <img src="./assets/usuarios.svg" alt="Usuarios" />
              </Link>
            </li>
          </AuthRol>

        </ul>
      </nav>
      <div className="content">
        {/* <AuthStatus /> */}
        <Outlet />
      </div>
    </>
  );
};
