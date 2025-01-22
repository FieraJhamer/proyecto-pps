import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import usuarios from "./usuarios/usuarios.js";
import router,{ authConfig } from "./usuarios/auth.js";
import { proyectosRouter } from "./proyectos/proyectos.js";

const app = express();
const port = 3000;

conectarDB();

app.use(express.json());
app.use(cors());
authConfig();

app.use("/", usuarios);
app.use("/", router);
app.use("/", proyectosRouter);

// app.get("/usuarios", async (req, res) => {
//   const [usuarios] = await db.execute("select * from usuarios");
//   res.send({ usuarios });
//   });

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
