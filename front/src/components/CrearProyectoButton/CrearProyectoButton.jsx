import { useState } from "react";
import "../Busqueda/Busqueda.css";
import "./CrearProyectoButton.css";
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
    etapa1_tipo: 1,
    etapa2_tipo: 2,
    extension1_tipo: 1,
    extension2_tipo: 2,
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

  const [files, setFiles] = useState({
    docPropuestaProyecto: null,
    docAceptacionTutor: null,
    docCVTutor: null,
    docTesina: null,
    docResolucionTribunal: null,
    docResolucionExt1Etapa1: null,
    docResolucionExt1Etapa2: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files.length > 1 ? [...files] : files[0] || prevFiles[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (Array.isArray(file)) {
        file.forEach((f) => data.append(key, f)); // PARA VARIOS ARCHIVOS
      } else {
        data.append(key, file); // PARA UN SOLO ARCHIVO
      }
    });

    try {
      const response = await fetch("http://localhost:3000/proyectos/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      closeModal();
      console.log("Proyecto creado con éxito");
      console.log(data)

      if (getProyectos) {
        getProyectos();
      }


    } catch (error) {
      console.error("Error al subir el proyecto:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          </div>
            
        </div>
      ),
    },
    {
      title: "Crear nuevo proyecto",
      content: (
        <div className="form-group">

          <div className="form-group-left">
          <span>
              <label>Fin de cursada</label>
              <input
                type="date"
                name="fechaFinCursada"
                value={formData.fechaFinCursada}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Carga inicial de documentos</label>
              <input
                type="date"
                name="fechaCargaArchivosEtapa1"
                value={formData.fechaCargaArchivosEtapa1}
                onChange={handleChange}
              />
            </span>
            
            <span>
              <label>Aprobación de la etapa 1</label>
              <input
                type="date"
                name="fechaAprobacionEtapa1"
                value={formData.fechaAprobacionEtapa1}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="form-group-right">
            <span>
              <label>Propuesta de proyecto</label>
              <input
                name="docPropuestaProyecto"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </span>

            <span>
              <label>Nota de aceptación del tutor</label>
              <input
                name="docAceptacionTutor"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </span>

            <span>
              <label>CV del tutor</label>
              <input
                name="docCVTutor"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </span>
          </div>
          
        </div>
      ),
    },
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <button className="crear-proyecto-button" onClick={openModal}>
        Crear Proyecto
      </button>

      {isModalOpen && (
        <div className="modal-create">
          <div className="modal-create-content">
            <h2>{steps[currentStep].title}</h2>

            <form key={currentStep} onSubmit={handleSubmit} encType="multipart/form-data">
              {steps[currentStep].content}

              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentStep === 0}
                >
                  Anterior
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    className="modal-next-button"
                    onClick={goNext}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    className="modal-next-button"
                    disabled={true}
                  >
                    Siguiente
                  </button>
                )}

                <button
                  type="submit"
                  className="modal-save-button"
                >
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
