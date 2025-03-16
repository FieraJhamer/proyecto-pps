import { useState } from "react";
import "../Busqueda/Busqueda.css";
import "./CrearProyectoButton.css";
import "./CrearProyectoButtonResponsive.css";
import { useAuth } from "../../Auth";

import { useCloseOnEscape } from "../../utils/UseOnCloseEscape";

export default function CrearProyectoButton({getProyectos}) {
  const { sesion } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    carrera_id: "",
    nombre_proyecto: "",
    alumno1_nombre: "",
    alumno1_apellido: "",
    alumno1_legajo: "",
    alumno2_nombre: "",
    alumno2_apellido: "",
    alumno2_legajo: "",
    alumno3_nombre: "",
    alumno3_apellido: "",
    alumno3_legajo: "",
    fechaFinCursada_tipo: 1,
    fechaFinCursada: "",
    fechaCargaArchivosEtapa1_tipo: 2,
    fechaCargaArchivosEtapa1: "",
    fechaAprobacionEtapa1_tipo: 3,
    fechaAprobacionEtapa1: "",
    fechaResolucionExtensionEtapa1_tipo: 4,
    fechaCargaArchivosEtapa2_tipo: 5,
    fechaCargaArchivosEtapa2: "",
    fechaAprobacionEtapa2_tipo: 6,
    fechaAprobacionEtapa2: "",
    fechaResolucionExtensionEtapa2_tipo: 7,
    fechaDesignacionTribunal_tipo: 8,
    fechaDesignacionTribunal: "",
    fechaDefensaProyecto_tipo: 9,
    fechaDefensaProyecto: "",
    tribunalIntegrante1: "",
    tribunalIntegrante2: "",
    tribunalIntegrante3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  
    try {
      const response = await fetch("http://localhost:3000/proyectos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      setFormData({
        carrera_id: "",
        nombre_proyecto: "",
        alumno1_nombre: "",
        alumno1_apellido: "",
        alumno1_legajo: "",
        alumno2_nombre: "",
        alumno2_apellido: "",
        alumno2_legajo: "",
        alumno3_nombre: "",
        alumno3_apellido: "",
        alumno3_legajo: "",
        fechaFinCursada_tipo: 1,
        fechaFinCursada: "",
        fechaCargaArchivosEtapa1_tipo: 2,
        fechaCargaArchivosEtapa1: "",
        fechaAprobacionEtapa1_tipo: 3,
        fechaAprobacionEtapa1: "",
        fechaResolucionExtensionEtapa1_tipo: 4,
        fechaCargaArchivosEtapa2_tipo: 5,
        fechaCargaArchivosEtapa2: "",
        fechaAprobacionEtapa2_tipo: 6,
        fechaAprobacionEtapa2: "",
        fechaResolucionExtensionEtapa2_tipo: 7,
        fechaDesignacionTribunal_tipo: 8,
        fechaDesignacionTribunal: "",
        fechaDefensaProyecto_tipo: 9,
        fechaDefensaProyecto: "",
        tribunalIntegrante1: "",
        tribunalIntegrante2: "",
        tribunalIntegrante3: "",
      });
  
      closeModal();
      console.log("Proyecto creado con éxito");
      console.log(formData);
  
      if (getProyectos) {
        getProyectos();
      }
  
    } catch (error) {
      console.error("Error al subir el proyecto:", error);
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    const modal = document.querySelector(".modal-create");
    if (modal) {
      modal.classList.add("hidden");
  
      setTimeout(() => {
        setIsModalOpen(false);
      }, 200);
    }
  };

  useCloseOnEscape(isModalOpen ? closeModal : null);


  const steps = [
    {
      title: "Crear nuevo proyecto",
      content: (
        <div className="form-group">
          <div className="form-group-left">
            <span>
              <label>Carrera</label>
              <select
                name="carrera_id"
                value={formData.carrera_id}
                onChange={handleChange}
                required
              >
                <option>Seleccione una carrera</option>
                <option value="1">Tec. en Higiene y Seguridad</option>
                <option value="2">Lic. en Tecnología Educativa</option>
              </select>

            </span>
            <span>
              <label>Nombre del proyecto</label>
              <input
                type="text"
                name="nombre_proyecto"
                value={formData.nombre_proyecto}
                onChange={handleChange}
                placeholder="Título del documento"
              />
            </span>

            <span>
                    <label>Alumno 1</label>
                    <input
                      type="text"
                      name={`alumno1_nombre`}
                      value={formData[`alumno1_nombre`] || ""}
                      onChange={handleChange}
                      placeholder="Nombre"
                      required
                    />
                    <input
                      type="text"
                      name={`alumno1_apellido`}
                      value={formData[`alumno1_apellido`] || ""}
                      onChange={handleChange}
                      placeholder="Apellido"
                      required
                    />
                    <input
                      type="number"
                      name={`alumno1_legajo`}
                      value={formData[`alumno1_legajo`] || ""}
                      onChange={handleChange}
                      placeholder="N° de legajo"
                      required
                    />
                  </span>
          </div>

            

          <div className="form-group-right">
            {[2, 3].map((num) => (
              <div key={num} className="form-group-right-alumnos">
                  <span>
                    <label>Alumno {num}</label>
                    <input
                      type="text"
                      name={`alumno${num}_nombre`}
                      value={formData[`alumno${num}_nombre`] || ""}
                      onChange={handleChange}
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      name={`alumno${num}_apellido`}
                      value={formData[`alumno${num}_apellido`] || ""}
                      onChange={handleChange}
                      placeholder="Apellido"
                    />
                    <input
                      type="number"
                      name={`alumno${num}_legajo`}
                      value={formData[`alumno${num}_legajo`] || ""}
                      onChange={handleChange}
                      placeholder="N° de legajo"
                    />
                  </span>
              </div>
            ))}

            <span>
              <label>Fin de cursada</label>
              <input
                type="date"
                name="fechaFinCursada"
                value={formData.fechaFinCursada}
                onChange={handleChange}
              />
            </span>
          </div>
            
        </div>
      ),
    },
  ];

  return (
    <>
      <button className="crear-proyecto-button" onClick={openModal}>
        Crear Proyecto
      </button>

      {isModalOpen && (
        <div className="modal-create .hidden">
          <div className="modal-create-content .hidden">
            <h2>{steps[currentStep].title}</h2>

            <form key={currentStep} onSubmit={handleSubmit} encType="multipart/form-data">
              {steps[currentStep].content}

              <div className="modal-buttons">
                <button
                  type="submit"
                  className="modal-save-button"
                >
                  Crear
                </button>

                <button
                  type="button"
                  className="modal-create-close-button"
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
