import { db } from "../db.js";
import {client} from "../client.js"
import {ListObjectsCommand} from '@aws-sdk/client-s3'

const obtenerProyecto = async (req, res) => {
  const [proyectos] = await db.execute(`
        SELECT

        p.id_proyecto, p.nombre_proyecto, 
        
        GROUP_CONCAT(CONCAT(a.nombre_alumno, ' ', a.apellido_alumno) SEPARATOR ', ') AS integrantes,
        c.nombre_carrera as carreras
                    
        FROM proyectos p 
        JOIN alumnos a ON p.id_grupo = a.id_grupo
    
        JOIN grupos g ON p.id_grupo = g.id_grupo
    
        JOIN carreras c ON c.id_carrera=g.id_carrera

        GROUP BY p.id_proyecto,p.nombre_proyecto, c.nombre_carrera`);
  res.send(proyectos);
};

export const obtenerProyectoPorId = async (req, res) => {
  const { id } = req.params;
  try {
      const [[proyecto]] = await db.query(
          `SELECT id_proyecto, nombre_proyecto, id_documentos FROM proyectos WHERE id_proyecto = ?`,
          [id]
      );
      const [carrera] = await db.query(`SELECT c.id_carrera, c.nombre_carrera
        FROM proyectos p
        JOIN grupos g ON p.id_grupo = g.id_grupo
        JOIN carreras c ON g.id_carrera = c.id_carrera
        WHERE p.id_proyecto = ?`, [id]);
        

      if (!proyecto) {
          return res.status(404).send("Proyecto no encontrado");
      }

      const [integrantes] = await db.query(
          `SELECT nombre_alumno, apellido_alumno, legajo_alumno
           FROM alumnos
           WHERE id_grupo = (SELECT id_grupo FROM proyectos WHERE id_proyecto = ?)`,
          [id]
      );

      const [fechas] = await db.query(
          `SELECT id_tipo_fecha, fecha AS fecha_valor
           FROM fechas
           WHERE id_proyecto = ?`,
          [id]
      );

      const [etapas] = await db.query(
          `SELECT id_tipo_etapa, completa
           FROM etapas
           WHERE id_proyecto = ?`,
          [id]
      );

      const [extensiones] = await db.query(
          `SELECT id_tipo_extension
           FROM extensiones
           WHERE id_proyecto = ?`,
          [id]
      );

      const [tribunales] = await db.query(
        `SELECT id_tribunal, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3
        FROM tribunales
        WHERE id_proyecto = ?`
        , [id]
        );

        const [documentos] = await db.query(
            `SELECT doc_propuesta_proyecto, doc_nota_tutor, doc_cv_tutor, doc_proyecto, doc_resolucion_tribunal
             FROM documentos
             WHERE id_documentos = ?`,
            [proyecto.id_documentos]
        );  

      const proyectoCompleto = {
          id_proyecto: proyecto.id_proyecto,
          nombre_proyecto: proyecto.nombre_proyecto,
          integrantes,
          fechas,
          etapas,
          extensiones,
          carrera,
          tribunales,
          documentos
      };

      res.status(200).json(proyectoCompleto);
  } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener el proyecto");
  }
};

export const obtenerFechas = async (req,res)=>{
    const {id} = req.params
    try{
        const [ListadoFechas] = await db.query('select fecha from fechas where id_proyecto=?',[id])
        res.send(ListadoFechas)
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error al obtener fechas")
    }
}

export const obtenerDocumentos = async (req,res)=>{
    const {id}=req.params
    try{
        const [ListaDocumentos]= await db.query(
            `select doc_propuesta_proyecto,doc_nota_tutor,doc_cv_tutor,doc_proyecto from documentos d 
            join proyectos p on d.id_documentos=p.id_documentos
            where p.id_proyecto=?`
        ,[id])
        res.send(ListaDocumentos)
        console.log(ListaDocumentos)
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error al obtener documentos")
    }
}

export const getFiles= async(req,res)=>{
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
    const response = await client.send(command)
    res.send(response)
}


export default obtenerProyecto;