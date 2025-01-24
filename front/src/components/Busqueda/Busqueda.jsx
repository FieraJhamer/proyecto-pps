import { useEffect, useState } from "react";
import "./Busqueda.css";

export default function Busqueda() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [carreraFiltro, setCarreraFiltro] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);

  const getProyectos = async () => {
    try {
      const response = await fetch("http://localhost:3000/proyectos", {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };
  

  useEffect(() => {
    getProyectos();
  }, []);

  const filtrarProyectos = () => {
    return proyectos.filter((proyecto) => {
      const coincideTexto =
        textoBusqueda === "" ||
        proyecto.integrantes
          .toLowerCase()
          .includes(textoBusqueda.toLowerCase());
      const coincideCarrera =
        carreraFiltro === "" || proyecto.carreras === carreraFiltro;

      return coincideTexto && coincideCarrera;
    });
  };

  const proyectosFiltrados = filtrarProyectos();

  return (
    <div className="Busqueda-container">
      <div className="input-busqueda">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder="Nombre del alumno o legajo"
          type="search"
          className="input"
          onChange={(e) => setTextoBusqueda(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setCarreraFiltro("")}
          disabled={carreraFiltro == ""}
        >
          Todos
        </button>
        <button
          onClick={() => setCarreraFiltro("Programacion")}
          disabled={carreraFiltro == "Programacion"}
        >
          A
        </button>
        <button
          onClick={() => setCarreraFiltro("Medicina")}
          disabled={carreraFiltro == "Medicina"}
        >
          B
        </button>
      </div>

      <div className="resultados-busqueda">
        {proyectosFiltrados.map((proyecto) => (
          <div key={proyecto.id_carrera} className="card">
            <div className="card-details">
              <p className="text-title">{proyecto.nombre_proyecto}</p>
              <p className="text-body">Integrantes: {proyecto.integrantes}</p>
              <p className="text-body">Carrera: {proyecto.carreras}</p>
            </div>
            <button
              className="card-button card-button-editar"
              onClick={openModal}
            >
              Editar
            </button>
            <button className="card-button" onClick={openViewModal}>
              Ver
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
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
                    />
                  </span>

                  <span>
                    Fecha de carga
                    <input type="date"></input>
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
                    CV del tutor: <input type="file" accept="application/pdf" />
                  </span>

                  <span className="span-switch">
                    Etapa 1 - Aprobada
                    <label className="switch">
                      <input type="checkbox"></input>
                      <span className="slider span-switch"></span>
                    </label>
                  </span>
                </div>
              </div>

              <div className="fase2-container">
                <span>
                  Fecha de carga
                  <input type="date"></input>
                </span>

                <span>
                  Documento de la tesina:{" "}
                  <input type="file" accept="application/pdf" />
                </span>

                <span className="span-switch">
                  Etapa 2 - Aprobada
                  <label className="switch">
                    <input type="checkbox"></input>
                    <span className="slider span-switch-2 fase2-switch"></span>
                  </label>
                </span>
              </div>

              <div className="fase3-container">
                <span>
                  Fecha de designación del tribunal
                  <input type="date"></input>
                </span>

                <span className="miembros-tribunal">
                  Miembros del tribunal
                  <input type="text" placeholder="Primer miembro" />
                  <input type="text" placeholder="Segundo miembro" />
                  <input type="text" placeholder="Tercer miembro" />
                </span>

                <span className="span-switch">
                  Etapa 3 - Aprobada
                  <label className="switch">
                    <input type="checkbox"></input>
                    <span className="slider span-switch fase3-switch"></span>
                  </label>
                </span>
              </div>

              <div className="modal-buttons">
                <button type="button" className="modal-save-button">
                  Guardar
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

      {isViewModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="fase1-title">Detalles del Proyecto</h2>
            <div className="view-modal-details">
              <div className="modal-details-1">
                <p>
                  <strong>Título:</strong> Proyecto de Tesis: Ejemplo 1
                </p>

                <p>
                  <strong>Integrantes:</strong>
                </p>
                <ul>
                  <li>Gómez Alejandro (7630)</li>
                  <li>Torres Leonel (7642)</li>
                  <li>Sotomayor Ignacio (7636)</li>
                </ul>
              </div>

              <div className="modal-details-2">
                <p>
                  <strong>Archivos cargados:</strong>
                </p>
                <ul className="file-list">
                  <li>
                    <strong>Propuesta del proyecto: </strong>
                    <span className="file-name">propuesta_proyecto.pdf 📄</span>
                  </li>

                  <li>
                    <strong>Nota del tutor: </strong>
                    <span className="file-name">nota_tutor.pdf 📄</span>
                  </li>

                  <li>
                    <strong>CV del tutor: </strong>
                    <span className="file-name">cv_tutor.pdf 📄</span>
                  </li>

                  <li>
                    <strong>Documento de la tesina: </strong>
                    <span className="file-name">proyecto_tesina.pdf 📄</span>
                  </li>
                </ul>
              </div>

              <div className="modal-details-3">
                <p>
                  <strong>Estado del proyecto</strong>
                </p>
                <p>
                  <strong>
                    Etapa 1: <span style={{ color: "green" }}>Completa</span>
                  </strong>{" "}
                  Jue. 5 de Abril de 2024 - Lun. 5 de Mayo de 2024
                </p>
                <p>
                  <strong>
                    Etapa 2: <span style={{ color: "red" }}>En proceso</span>
                  </strong>{" "}
                  Vie. 22 de Marzo de 2025 - Entre Agosto de 2025 y Marzo de
                  2026 (Estimado)
                </p>
                <p>
                  <strong>
                    Etapa 3: <span style={{ color: "red" }}>No iniciada</span>
                  </strong>{" "}
                  Sin fecha
                </p>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                type="button"
                className="modal-close-button"
                onClick={closeViewModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
