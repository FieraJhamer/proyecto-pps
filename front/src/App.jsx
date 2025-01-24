import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { PerfilPage } from "../src/Perfil/PerfilPage";
import { LoginPage } from "./LoginPage";
import { SinRuta } from "./SinRuta";
import { AuthPage } from "./Auth";
import RegistroUsuarios from "./RegistroUsuarios/RegistroUsuarios.jsx"
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<SinRuta />} />
        </Route>
          
      </Routes>
    </>
  );

}

export default App;
