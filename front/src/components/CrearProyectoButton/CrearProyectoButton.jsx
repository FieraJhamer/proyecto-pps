import { useState } from "react";
import "../Busqueda/Busqueda.css";
import "./CrearProyectoButton.css";
import { useAuth } from "../../Auth";

export default function CrearProyectoButton() {
  const { sesion } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    /* ETAPA 1 */
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
    /* documentoPropuestaProyecto: "", */
    /* documentoAceptacionTutor: "", */
    /* documentoCVTutor: "", */
    fechaAprobacionEtapa1: "",

    /* ETAPA 2 */
    fechaCargaArchivosEtapa2: "",
    /* documentoTesina: "", */
    fechaAprobacionEtapa2: "",
    tribunalIntegrante1: "",
    tribunalIntegrante2: "",
    tribunalIntegrante3: "",
    /* documentoResolucionTribunal: "", */
    fechaDesignacionTribunal: "",
    fechaDefensaProyecto: ""
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/proyectos", {
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

      closeModal();
    } catch (error) {
      console.error("Error al subir el proyecto:", error);
    }
  };

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
              <label>Fecha de finalización de cursada</label>
              <input
                type="date"
                name="fechaFinCursada"
                value={formData.fechaFinCursada}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Fecha de carga de archivos de la etapa 1</label>
              <input
                type="date"
                name="fechaCargaArchivosEtapa1"
                value={formData.fechaCargaArchivosEtapa1}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Fecha de aprobación de etapa 1</label>
              <input
                type="date"
                name="fechaAprobacionEtapa1"
                value={formData.fechaAprobacionEtapa1}
                onChange={handleChange}
              />
            </span>

            {/* LOS INPUTS DE ARCHIVOS AHORA NO FUNCAN */}
            <span>
              <label>Propuesta de proyecto</label>
              <input name="documentoPropuestaProyecto" type="file" accept="application/pdf" />
            </span>

            <span>
              <label>Nota de aceptación del tutor</label>
              <input name="documentoAceptacionTutor" type="file" accept="application/pdf" />
            </span>

            <span>
              <label>CV del tutor</label>
              <input name="documentoCVTutor" type="file" accept="application/pdf" />
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

            {/* LOS INPUTS DE ARCHIVOS AHORA NO FUNCAN */}
            <span>
              <label>Documento de tesina</label>
              <input name="documentoTesina" type="file" accept="application/pdf" />
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
    }
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

            <form onSubmit={handleSubmit}>
              {steps[currentStep].content}

              <div className="modal-buttons">
                <button
                  type="button"
                  className="modal-prev-button"
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

                <button type="submit" className="modal-save-button">
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
