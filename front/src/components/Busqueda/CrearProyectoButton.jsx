import { useState } from "react";
import "./Busqueda.css";
import { useAuth } from "../../Auth";

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
    etapa1_tipo: "",
    etapa2_tipo: "",
    extension1_tipo: "",
    extension2_tipo: "",
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
        {/*
          <span>
            <label>Etapa 1 Tipo:</label>
            <input
              type="text"
              name="etapa1_tipo"
              value={formData.etapa1_tipo}
              onChange={handleChange}
            />
          </span>
        */}

          <span>
            <label>Carrera</label>
            <select name="carrera_id" value={formData.carrera_id}>
              <option>Seleccione una carrera</option>
              <option value="1">Tec. en Higiene y Seguridad</option>
              <option value="2">Lic. en Tecnología Educativa</option>
            </select>
          </span>
        </div>
      ),
    },
    {
      title: "ETAPA 2",
      content: (
        <div className="form-group">
          <label>Etapa 2 Tipo:</label>
          <input
            type="text"
            name="etapa2_tipo"
            value={formData.etapa2_tipo}
            onChange={handleChange}
          />
        </div>
      ),
    },
    {
      title: "EXTENSIONES",
      content: (
        <>
          <div className="form-group">
            <label>Extension 1 Tipo:</label>
            <input
              type="text"
              name="extension1_tipo"
              value={formData.extension1_tipo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Extension 2 Tipo:</label>
            <input
              type="text"
              name="extension2_tipo"
              value={formData.extension2_tipo}
              onChange={handleChange}
            />
          </div>
        </>
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
