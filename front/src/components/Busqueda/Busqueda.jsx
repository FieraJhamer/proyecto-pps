import { useEffect, useState } from "react";
import "./Busqueda.css";
import { useAuth } from "../../Auth";
import EditarProyectoModal from "./EditarProyectoModal";
import CrearProyectoButton from "./CrearProyectoButton";

export default function Busqueda() {
  const { sesion } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [carreraFiltro, setCarreraFiltro] = useState("");
  const [selectedProyectoId, setSelectedProyectoId] = useState(null);

  const openModal = (id_proyecto) => {
    setSelectedProyectoId(id_proyecto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProyectoId(null);
  };

  const getProyectos = async () => {
    try {
      const response = await fetch("http://localhost:3000/proyectos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
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
      <CrearProyectoButton></CrearProyectoButton>
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
          className={carreraFiltro === "" ? "Filtro-Block" : "Boton-Filtro"}
          onClick={() => setCarreraFiltro("")}
          disabled={carreraFiltro === ""}
        >
          Todos
        </button>
        <button
          className={
            carreraFiltro ===
            "Tecnicatura Universitaria en Higiene y Seguridad"
              ? "Filtro-Block"
              : "Boton-Filtro"
          }
          onClick={() =>
            setCarreraFiltro("Tecnicatura Universitaria en Higiene y Seguridad")
          }
          disabled={
            carreraFiltro ===
            "Tecnicatura Universitaria en Higiene y Seguridad"
          }
        >
          Tecnicatura Universitaria en Higiene y Seguridad
        </button>
        <button
          className={
            carreraFiltro === "Licenciatura en Tecnología Educativa"
              ? "Filtro-Block"
              : "Boton-Filtro"
          }
          onClick={() =>
            setCarreraFiltro("Licenciatura en Tecnología Educativa")
          }
          disabled={carreraFiltro === "Licenciatura en Tecnología Educativa"}
        >
          Licenciatura en Tecnología Educativa
        </button>
      </div>

      <div className="resultados-busqueda">
        {proyectosFiltrados.map((proyecto) => (
          <div key={proyecto.id_proyecto} className="card">
            <div className="card-details">
              <p className="text-title">{proyecto.nombre_proyecto}</p>
              <p className="text-body">Integrantes: {proyecto.integrantes}</p>
              <p className="text-body">Carrera: {proyecto.carreras}</p>
            </div>
            <button
              className="card-button card-button-editar"
              onClick={openModal(proyecto.id_proyecto)}
            >
              Editar
            </button>
            <button className="card-button">
              Ver
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && <EditarProyectoModal onClose={closeModal} proyectoId={selectedProyectoId} />}
    </div>
  );
}
