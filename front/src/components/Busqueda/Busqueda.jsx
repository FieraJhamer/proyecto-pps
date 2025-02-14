import { useEffect, useState } from "react";
import "./Busqueda.css";
import "./ViewModal.css"
import { useAuth } from "../../Auth";
import CrearProyectoButton from "../CrearProyectoButton/CrearProyectoButton";
import EditarProyecto from "../EditarProyectoButton/EditarProyecto";
import { useCloseOnEscape } from "../../utils/UseOnCloseEscape";



export default function Busqueda() {
  const { sesion } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ViewModal,setViewModal]=useState(false)

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [fechas,setFechas]=useState([])
  const [documentos,setDocumentos]=useState({
    doc_propuesta_proyecto: "",
    doc_nota_tutor: "",
    doc_cv_tutor: "",
    doc_proyecto: "",
  })
  const [carreraFiltro, setCarreraFiltro] = useState("");

  const [selectedProyectoId, setSelectedProyectoId] = useState(null);
  const [ProyectoSelect,setProyectoSelect] = useState(null);

  const openModal = (id_proyecto) => {
    setSelectedProyectoId(id_proyecto);
    setIsModalOpen(true);
  };
  const OpenView = (proyecto)=>{
    getDocumentos(proyecto.id_proyecto);
    setViewModal(true)
    setProyectoSelect(proyecto)

    getFechas(proyecto)
  }

  const closeView = ()=>{
    setViewModal(false)
    setProyectoSelect(null)
  }

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

  const getFechas = async (proyecto)=>{
    try{
      const response = await fetch(`http://localhost:3000/proyectos/${proyecto.id_proyecto}/fechas`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
      })

      if (!response.ok){
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json()
      setFechas(data)
    }
    catch(error){
      console.error("Error al cargar las fechas",error)
    }
  }

  const getDocumentos = async (id)=>{
    try{
      const response = await fetch(`http://localhost:3000/proyectos/${id}/documentos`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
      })

      if (!response.ok){
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json()
      setDocumentos({...data[0]})
      console.log(data)
    }
    catch(error){
      console.error("Error al cargar los documentos",error)
    }
  }

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

  useCloseOnEscape(isModalOpen ? closeModal : null);
  useCloseOnEscape(ViewModal ? closeView : null);

  return (
    <div className="Busqueda-container">
      <CrearProyectoButton getProyectos={getProyectos}></CrearProyectoButton>
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
              <p className="text-body">👤 Integrantes: {proyecto.integrantes}</p>
              <p className="text-body">📚 Carrera: {proyecto.carreras}</p>
            </div>
            <button
              className="card-button card-button-editar"
              onClick={()=>openModal(proyecto.id_proyecto)}
            >
              Editar
            </button>
            <button className="card-button"
            onClick={()=>OpenView(proyecto)}
            >
              Ver
            </button>
          </div>
        ))}
      </div>

      {ViewModal && (
        <div className="modal-view">
          <div className="modal-view-content">
            <h2>Detalles del proyecto</h2>

              <div className="modal-view-details">
                <p><strong>Nombre del proyecto:</strong> {ProyectoSelect.nombre_proyecto}</p>
                <p><strong>Integrantes:</strong> {ProyectoSelect.integrantes}</p>
              </div>

              <div className="modal-view-files">
                <p><strong>Archivos cargados:</strong></p>
                <ul className="file-list">
                  <li>
                    <strong>Propuesta:</strong> 
                      <span className="file-name">
                        {documentos.doc_propuesta_proyecto ? <a href={documentos.doc_propuesta_proyecto}>Link a la propuesta de proyecto</a>
                        :
                        <p>No se encontró el archivo</p>}
                        </span>
                  </li>

                  <li>
                    <strong>Nota del tutor: </strong> 
                      <span className="file-name">
                      {documentos.doc_nota_tutor ? <a href={documentos.doc_nota_tutor}>Link a la nota del tutor</a>
                      :
                      <p>No se encontró el archivo</p>}
                      </span>
                  </li>

                  <li>
                    <strong>CV del tutor: </strong> 
                      <span className="file-name">
                        {documentos.doc_cv_tutor ? <a href={documentos.doc_cv_tutor} >Link al CV del tutor</a> 
                        :
                        <p>No se encontró el archivo</p>}
                      </span>
                  </li>

                  <li>
                    <strong>Doc. de la tesina: </strong> 
                    <span className="file-name">
                      {documentos?.doc_proyecto ? <a href={documentos.doc_proyecto}>Link al documento de tesina</a>
                      :
                      <p>No se encontró el archivo</p>}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="modal-view-dates">

              <p><strong>Fechas:</strong></p>

              <p>Fin de cursada:</p>
              <p>{fechas?.[0]?.fecha ?? "No hay fecha registrada"}</p>

              <p>Carga de archivos de la etapa 1</p>
              <p>{fechas?.[1]?.fecha ?? "No hay fecha registrada"}</p>

              <p>Aprobación de la etapa 1</p>
              <p>{fechas?.[2]?.fecha ?? "No hay fecha registrada"}</p>

              {/* FECHA DE RESOLUCION DE EXTENSION DE ETAPA 1
              <p>NOMBRE DE FECHA</p>
              <p>{fechas?.[3]?.fecha ?? "No hay fecha registrada"}</p>
              */}

              <p>Carga de archivos de la etapa 2</p>
              <p>{fechas?.[4]?.fecha ?? "No hay fecha registrada"}</p>

              <p>Aprobación de la etapa 2</p>
              <p>{fechas?.[5]?.fecha ?? "No hay fecha registrada"}</p>

              {/* FECHA DE RESOLUCION DE EXTENSION DE ETAPA 2
              <p>NOMBRE DE FECHA</p>
              <p>{fechas?.[6]?.fecha ?? "No hay fecha registrada"}</p>
              */}

              <p>Designación del tribunal</p>
              <p>{fechas?.[7]?.fecha ?? "No hay fecha registrada"}</p>

              <p>Fecha de defensa</p>
              <p>{fechas?.[8]?.fecha ?? "No hay fecha registrada"}</p>

              </div>

              <div className="modal-buttons">
              <button type="button" className="modal-close-button" onClick={closeView}>Cerrar</button>
              </div>
          </div>

        </div>
      )
      }

      {isModalOpen && <EditarProyecto onClose={closeModal} proyectoId={selectedProyectoId} getProyectos={getProyectos}/>}
    </div>
  );
}
