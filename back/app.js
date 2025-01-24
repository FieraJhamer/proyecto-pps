import express, { Router } from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import usuarios from "./usuarios/usuarios.js";
import proyectos from "./proyectos/proyectos.js";
import router, { authConfig } from "./usuarios/auth.js";
import { validarJwt, validarSuperUsuario } from "./validaciones/validaciones.js";

const app = express();
const port = 3000;

conectarDB();

app.use(express.json());
app.use(cors());
authConfig()


app.use("/", usuarios);
app.use("/",router)
app.use("/", proyectos);


app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
