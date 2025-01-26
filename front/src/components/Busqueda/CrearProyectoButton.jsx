import { useState } from "react";
import "./Busqueda.css";

export default function CrearProyectoButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button className="crear-proyecto-button" onClick={openModal}>
        Crear Proyecto
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="fase1-title">Crear nuevo proyecto</h2>
            <form>
                <div className="fase1-container">
                  <div className="fase1-left">
                    <span>
                      Título del Proyecto
                      <input
                        type="text"
                        id="project-title"
                        placeholder="Título del proyecto"
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
                      Nota del tutor:{" "}
                      <input type="file" accept="application/pdf" />
                    </span>
                    <span>
                      CV del tutor:{" "}
                      <input type="file" accept="application/pdf" />
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
                  Crear
                </button>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
