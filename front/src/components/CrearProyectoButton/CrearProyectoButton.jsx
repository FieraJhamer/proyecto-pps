import { useState } from "react";
import "../Busqueda/Busqueda.css";
import "./CrearProyectoButton.css";
import { useAuth } from "../../Auth";

/* TERMINAR DE PROBAR LA API CON MULTER Y EL ENVÍO DE ARCHIVOS PARA S3*/

export default function CrearProyectoButton() {
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
    fechaFinCursada: "",
    fechaCargaArchivosEtapa1: "",
    fechaAprobacionEtapa1: "",
    fechaCargaArchivosEtapa2: "",
    fechaAprobacionEtapa2: "",
    fechaDesignacionTribunal: "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files.length > 1 ? [...files] : files[0],
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
      const response = await fetch("http://localhost:3000/proyectos/test", {
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
    } catch (error) {
      console.error("Error al subir el proyecto:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const steps = [
    {
      title: "Etapa 1",
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
              />
            </span>

            {[1, 2, 3].map((num) => (
              <div key={num}>
                <span>
                <label>Alumno {num}</label>
                <label>Nombre</label>
                <input
                  type="text"
                  name={`alumno${num}_nombre`}
                  value={formData[`alumno${num}_nombre`] || ""}
                  onChange={handleChange}
                />
                <label>Apellido</label>
                <input
                  type="text"
                  name={`alumno${num}_apellido`}
                  value={formData[`alumno${num}_apellido`] || ""}
                  onChange={handleChange}
                />
                <label>Legajo</label>
                <input
                  type="number"
                  name={`alumno${num}_legajo`}
                  value={formData[`alumno${num}_legajo`] || ""}
                  onChange={handleChange}
                />
                </span>
              </div>
            ))}
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
    {
      title: "Etapa 2",
      content: (
        <div className="form-group">
          <div className="form-group-left">
            <span>
                <label>Fecha de carga de archivos de la etapa 1</label>
                <input
                  type="date"
                  name="fechaCargaArchivosEtapa2"
                  value={formData.fechaCargaArchivosEtapa2}
                  onChange={handleChange}
                />
            </span>

            <span>
              <label>Documento de tesina</label>
              <input
                name="docTesina"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </span>

            <span>
                <label>Fecha de aprobación de la etapa 2</label>
                <input
                  type="date"
                  name="fechaAprobacionEtapa2"
                  value={formData.fechaAprobacionEtapa2}
                  onChange={handleChange}
                />
            </span>
          </div>

          <div className="form-group-right">
            {[1, 2, 3].map((num) => (
                  <span key={num}>
                    <label>Miembro del tribunal N°{num}</label>
                    <input
                      type="text"
                      name={`tribunalIntegrante${num}`}
                      value={formData[`tribunalIntegrante${num}`]}
                      onChange={handleChange}
                    />
                  </span>
              ))}

            <span>
              <label>Resolución del tribunal</label>
              <input
                name="docResolucionTribunal"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </span>

            <span>
              <label>Fecha de designación del tribunal</label>
              <input
                type="date"
                name="fechaDesignacionTribunal"
                value={formData.fechaDesignacionTribunal}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Fecha de defensa del proyecto</label>
              <input
                type="date"
                name="fechaDefensaProyecto"
                value={formData.fechaDefensaProyecto}
                onChange={handleChange}
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
        <div className="modal">
          <div className="modal-content">
            <h2>{steps[currentStep].title}</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {steps[currentStep].content}

              <div className="modal-buttons">
                <button type="button" onClick={goPrev} disabled={currentStep === 0}>
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

                <button type="submit" className="modal-save-button" onClick={handleSubmit}>
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
