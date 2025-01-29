import "./Busqueda.css";
import { useState, useEffect } from "react";

export default function EditarProyectoModal({ onClose, proyectoId }) {
  const [proyecto, setProyecto] = useState({
    titulo: ""
  });
  
  useEffect(() => {
  const getProyecto = async () => {
    try {
      const response = await fetch(`/api/proyectos/${proyectoId}`);
      const data = await response.json();
      setProyecto({
        titulo: data.titulo
      });
    } catch (error) {
      console.error("Error al obtener el proyecto:", error);
    }
  };

  getProyecto();
}, [proyectoId]);

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
                  <input type="text" placeholder="Apellido y nombre" />
                  <input type="text" placeholder="N° de legajo" />
                </span>
                <span>
                  Segundo integrante
                  <input type="text" placeholder="Apellido y nombre" />
                  <input type="text" placeholder="N° de legajo" />
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
