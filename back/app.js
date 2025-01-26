import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import usuarios from "./usuarios/usuarios.js";
import router, { authConfig } from "./usuarios/auth.js";
import proyectos from "./proyectos/proyectos.js";

const app = express();
const port = 3000;

conectarDB();

app.use(express.json());
app.use(cors());
authConfig();

app.use("/", usuarios);
app.use("/", router);
app.use("/", proyectos);

app.get("/", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM alumnos");
    console.log(result)
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error al consultar la base de datos" });
  }
});


// app.get("/usuarios", async (req, res) => {
//   const [usuarios] = await db.execute("select * from usuarios");
//   res.send({ usuarios });
//   });

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
