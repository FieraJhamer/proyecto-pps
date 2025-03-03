import { Link, Outlet } from "react-router-dom";
import { AuthRol } from "../../Auth";
import "../Layout/Layout.css";
import "./Menu.css"

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

          <li>
            <Link to="/info" className="nav-button">
              <img src="./assets/utn.svg" alt="Info" className="utn-info-svg"/>
            </Link>
          </li>

        </ul>
      </nav>
      <div className="content">
        {/* <AuthStatus /> */}
        <Outlet />
      </div>
    </>
  );
};
