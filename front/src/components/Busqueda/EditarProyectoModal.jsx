import "./Busqueda.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

export default function EditarProyectoModal({ onClose, proyectoId }) {
  const { sesion } = useAuth();

  const [proyecto, setProyecto] = useState({
    titulo: "",
    alumnos: []
  });
  
  useEffect(() => {
  const getProyecto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/proyectos/${proyectoId}`,{method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        }});
      const data = await response.json();
      console.log(data)
      setProyecto({
        titulo: data.nombre_proyecto || "",
        alumnos: data.integrantes || []
      });
    } catch (error) {
      console.log(proyectoId)
      console.log(error)
      console.error("Error al obtener el proyecto:", error);
    }
  };

  getProyecto();
}, [proyectoId]);

const handleNombreYApellido = (e,i) => {
  const updatedProyecto = { ...proyecto };
  if (updatedProyecto.alumnos && updatedProyecto.alumnos[i]) {
    const [nombre, apellido] = e.target.value.split(' ');
    if (nombre === undefined || apellido === undefined) {
      return;
    }
    updatedProyecto.alumnos[i].nombre_alumno = nombre;
    updatedProyecto.alumnos[i].apellido_alumno = apellido;
  }
  setProyecto(updatedProyecto)

}
const handleLegajo = (e,i) => {
  const updatedProyecto = { ...proyecto };
  if (updatedProyecto.alumnos && updatedProyecto.alumnos[i]) {
    if (e.target.value === undefined) {
      return;
    }
    updatedProyecto.alumnos[i].legajo_alumno = e.target.value;
  }
  setProyecto(updatedProyecto)    
}

console.log(proyecto)

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="fase1-title">Editar proyecto</h2>
        <form>
            <div className="fase1-container">
              <div className="fase1-left">
                <span>
                  Título del Proyecto
                  <input
                    type="text"
                    id="project-title"
                    placeholder="Título del proyecto"
                    value={proyecto.titulo}
                    onChange={(e) => setProyecto({ ...proyecto, comentarios: e.target.value })}
                  />
                </span>
                <span>
                  Fecha de carga
                  <input type="date" />
                </span>
                <span>
                  Comentarios
                  <input type="text" placeholder="Comentario de ejemplo" />
                </span>
              </div>
              <div className="fase1-center">
                <span>
                  Primer integrante
                  <input value={proyecto.alumnos && proyecto.alumnos[0] ?  `${proyecto.alumnos[0].nombre_alumno} ${proyecto.alumnos[0].apellido_alumno}` :''}  
                         type="text" 
                         placeholder="Apellido y nombre"
                         onChange={(e)=>handleNombreYApellido(e,0)} />
                  <input value={proyecto.alumnos && proyecto.alumnos[0] ?  `${proyecto.alumnos[0].legajo_alumno}` :''}
                         type="text" 
                         placeholder="N° de legajo"
                         onChange={(e)=>handleLegajo(e,0)} />
                </span>
                <span>
                  Segundo integrante
                  <input value={proyecto.alumnos && proyecto.alumnos[1] ?  `${proyecto.alumnos[1].nombre_alumno} ${proyecto.alumnos[1].apellido_alumno}` :''}
                         type="text"
                         placeholder="Apellido y nombre"
                         onChange={(e)=>handleNombreYApellido(e,1)} />
                  <input value={proyecto.alumnos && proyecto.alumnos[1] ?  `${proyecto.alumnos[1].legajo_alumno}` :''}
                         type="text"
                         placeholder="N° de legajo"
                         onChange={(e)=>handleLegajo(e,1)} />
                </span>
                
                <span>
                  Tercer integrante
                  <input type="text" placeholder="Apellido y nombre" />
                  <input type="text" placeholder="N° de legajo" />
                </span>
              </div>
              <div className="fase1-right">
                <span>
                  Propuesta del proyecto:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
                <span>
                  Nota del tutor: <input type="file" accept="application/pdf" />
                </span>
                <span>
                  CV del tutor: <input type="file" accept="application/pdf" />
                </span>
                <span className="span-switch">
                  Etapa 1 - Aprobada
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider span-switch"></span>
                  </label>
                </span>
              </div>
            </div>

            <div className="fase2-container">
              <div className="fase2-left">
                <span>
                  Informe parcial:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
                <span>
                  Informe del tutor:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
                <span>
                  Nota del tribunal:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
              </div>
              <div className="fase2-right">
                <span className="span-switch">
                  Etapa 2 - Aprobada
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider span-switch"></span>
                  </label>
                </span>
              </div>
            </div>

            <div className="fase3-container">
              <div className="fase3-left">
                <span>
                  Informe final:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
                <span>
                  Acta de defensa:{" "}
                  <input type="file" accept="application/pdf" />
                </span>
              </div>
              <div className="fase3-right">
                <span className="span-switch">
                  Etapa 3 - Aprobada
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider span-switch"></span>
                  </label>
                </span>
              </div>
            </div>

          <div className="modal-buttons">
            <button type="button" className="modal-save-button">
              Guardar
            </button>
            <button
              type="button"
              className="modal-close-button"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
