import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.jsx";
import { PerfilPage } from "./components/Perfil/PerfilPage.jsx";
import { LoginPage } from "./components/LoginPage/LoginPage.jsx";
import { SinRuta } from "./components/SinRuta/SinRuta.jsx";
import { Info } from "./components/Info/Info.jsx";
import { AuthPage } from "./Auth";
import RegistroUsuarios from "./components/RegistroUsuarios/RegistroUsuarios.jsx"
import Busqueda from "./components/Busqueda/Busqueda.jsx"

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AuthPage>
                <PerfilPage/>
              </AuthPage>
            }
          />
          <Route
            path="/perfil"
            element={
              <AuthPage>
                <PerfilPage />
              </AuthPage>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AuthPage>
                <RegistroUsuarios/>
              </AuthPage>
            }
          /> 
          <Route
            path="/home"
            element={
              <AuthPage>
                <Busqueda/>
              </AuthPage>
            }
          />
          <Route
            path="/info"
            element={
                <Info/>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<SinRuta />} />
        </Route>
          
      </Routes>
    </>
  );

}

export default App;
