import { useState,useEffect } from "react";
import "../CrearProyectoButton/CrearProyectoButton.css";
import { useAuth } from "../../Auth";
import "./EditarProyecto.css";
import "./EditarProyectoResponsive.css";

export default function EditarProyecto({ onClose, proyectoId, getProyectos }) {
  const { sesion } = useAuth();
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
        fechaResolucionExtensionEtapa1: null,
        fechaCargaArchivosEtapa2_tipo: 5,
        fechaCargaArchivosEtapa2: "",
        fechaAprobacionEtapa2_tipo: 6,
        fechaAprobacionEtapa2: "",
        fechaResolucionExtensionEtapa2_tipo: 7,
        fechaResolucionExtensionEtapa2: null,
        fechaDesignacionTribunal_tipo: 8,
        fechaDesignacionTribunal: "",
        fechaDefensaProyecto_tipo: 9,
        fechaDefensaProyecto: "",
        tribunalIntegrante1: "",
        tribunalIntegrante2: "",
        tribunalIntegrante3: "",
        doc_propuesta_proyecto: "",
        doc_nota_tutor: "",
        doc_cv_tutor: "",
        doc_proyecto: "",
        doc_resolucion_tribunal: "",

  });

  useEffect(() => {
    if (proyectoId) {
      const fetchProyecto = async () => {
        try {
          const response = await fetch(`http://localhost:3000/proyectos/${proyectoId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sesion.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error al obtener el proyecto");
          }
          const data = await response.json();
          console.log(data);

          setFormData({
            carrera_id: data.carrera[0]?.id_carrera || "",
            nombre_proyecto: data.nombre_proyecto || "",
            alumno1_nombre: data.integrantes[0]?.nombre_alumno || "",
            alumno1_apellido: data.integrantes[0]?.apellido_alumno || "",
            alumno1_legajo: data.integrantes[0]?.legajo_alumno || null,
            alumno2_nombre: data.integrantes[1]?.nombre_alumno || "",
            alumno2_apellido: data.integrantes[1]?.apellido_alumno || "",
            alumno2_legajo: data.integrantes[1]?.legajo_alumno || null,
            alumno3_nombre: data.integrantes[2]?.nombre_alumno || "",
            alumno3_apellido: data.integrantes[2]?.apellido_alumno || "",
            alumno3_legajo: data.integrantes[2]?.legajo_alumno || null,
            etapa1_tipo: data.etapas && data.etapas[0] ? data.etapas[0].id_tipo_etapa : 1,
            etapa2_tipo: data.etapas && data.etapas[1] ? data.etapas[1].id_tipo_etapa : 2,
            extension1_tipo: data.extensiones && data.extensiones[0] ? data.extensiones[0].id_tipo_extension : 1,
            extension2_tipo: data.extensiones && data.extensiones[1] ? data.extensiones[1].id_tipo_extension : 2,
            fechaFinCursada_tipo: data.fechas[0]?.id_tipo_fecha, // Si se mantiene fijo, o mapear según data.fechas
            fechaFinCursada: data.fechas[0]?.fecha_valor !== null ? data.fechas[0]?.fecha_valor.split("T")[0] : null,
            fechaCargaArchivosEtapa1_tipo: 2,
            fechaCargaArchivosEtapa1: data.fechas[1]?.fecha_valor !== null ? data.fechas[1]?.fecha_valor.split("T")[0] : null,
            fechaAprobacionEtapa1_tipo: 3,
            fechaAprobacionEtapa1: data.fechas[2]?.fecha_valor !== null ? data.fechas[2]?.fecha_valor.split("T")[0] : null,
            fechaResolucionExtensionEtapa1_tipo: 4,
            fechaResolucionExtensionEtapa1: data.fechas[3]?.fecha_valor !== null ? data.fechas[3]?.fecha_valor.split("T")[0] : undefined,
            fechaCargaArchivosEtapa2_tipo: 5,
            fechaCargaArchivosEtapa2: data.fechas[4]?.fecha_valor !== null ? data.fechas[4]?.fecha_valor.split("T")[0] : null,
            fechaAprobacionEtapa2_tipo: 6,
            fechaAprobacionEtapa2: data.fechas[5]?.fecha_valor !== null ? data.fechas[5]?.fecha_valor.split("T")[0] : null,
            fechaResolucionExtensionEtapa2_tipo: 7,
            fechaResolucionExtensionEtapa2: data.fechas[6]?.fecha_valor !== null ? data.fechas[6]?.fecha_valor.split("T")[0] : undefined,
            fechaDesignacionTribunal_tipo: 8,
            fechaDesignacionTribunal: data.fechas[7]?.fecha_valor !== null ? data.fechas[7]?.fecha_valor.split("T")[0] : null,
            fechaDefensaProyecto_tipo: 9,
            fechaDefensaProyecto: data.fechas[8]?.fecha_valor !== null ? data.fechas[8]?.fecha_valor.split("T")[0] : null,
            tribunalIntegrante1: data.tribunales[0]?.integrante_tribunal_1 || "",
            tribunalIntegrante2: data.tribunales[0]?.integrante_tribunal_2 || "",
            tribunalIntegrante3: data.tribunales[0]?.integrante_tribunal_3 || "",
            tribunal_id: data.tribunales[0].id_tribunal || "",
            doc_propuesta_proyecto: data.documentos[0]?.doc_propuesta_proyecto || null,
            doc_nota_tutor: data.documentos[0]?.doc_nota_tutor || null,
            doc_cv_tutor: data.documentos[0]?.doc_cv_tutor || null,
            doc_proyecto: data.documentos[0]?.doc_proyecto || null,
            doc_resolucion_tribunal: data.documentos[0]?.doc_resolucion_tribunal || null,
            doc_resolucion_ext_etapa1: data.documentos[0]?.doc_resolucion_ext_etapa1 || null,
            doc_resolucion_ext_etapa2: data.documentos[0]?.doc_resolucion_ext_etapa2 || null
          });

        } catch (error) {
          console.error("Error precargando el proyecto:", error);
        }
      };
      fetchProyecto();
    }
  }, [proyectoId, sesion.token]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target; // name debería ser "doc_propuesta_proyecto", "doc_nota_tutor", etc.
    if (files && files.length > 0) {
      const file = files[0];
      const formDataFile = new FormData();
      formDataFile.append("file", file);
      console.log(formDataFile);
      
      try {
        const response = await fetch("http://localhost:3000/files", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sesion.token}`
          },
          body: formDataFile,
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Error al subir el archivo");
        }
        const data = await response.json();
        console.log(data.url)
        // data.url contiene la URL del archivo subido
        setFormData((prev) => ({ ...prev, [name]: data.url }));
        alert("Archivo subido con éxito");
      } catch (error) {
        console.log(error)
      }
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id_carrera: Number(formData.carrera_id),
      nombre_proyecto: formData.nombre_proyecto,
      integrantes: [
        {
          nombre_alumno: formData.alumno1_nombre,
          apellido_alumno: formData.alumno1_apellido,
          legajo_alumno: formData.alumno1_legajo,
        },
        {
          nombre_alumno: formData.alumno2_nombre,
          apellido_alumno: formData.alumno2_apellido,
          legajo_alumno: formData.alumno2_legajo,
        },
        {
          nombre_alumno: formData.alumno3_nombre,
          apellido_alumno: formData.alumno3_apellido,
          legajo_alumno: formData.alumno3_legajo,
        },
      ],
      fechas: [
        { id_tipo_fecha: formData.fechaFinCursada_tipo, fecha_valor: formData.fechaFinCursada },
        { id_tipo_fecha: formData.fechaCargaArchivosEtapa1_tipo, fecha_valor: formData.fechaCargaArchivosEtapa1 },
        { id_tipo_fecha: formData.fechaAprobacionEtapa1_tipo, fecha_valor: formData.fechaAprobacionEtapa1 },
        { id_tipo_fecha: formData.fechaResolucionExtensionEtapa1_tipo, fecha_valor: formData.fechaResolucionExtensionEtapa1 },
        { id_tipo_fecha: formData.fechaCargaArchivosEtapa2_tipo, fecha_valor: formData.fechaCargaArchivosEtapa2 },
        { id_tipo_fecha: formData.fechaAprobacionEtapa2_tipo, fecha_valor: formData.fechaAprobacionEtapa2 },
        { id_tipo_fecha: formData.fechaResolucionExtensionEtapa2_tipo, fecha_valor: formData.fechaResolucionExtensionEtapa2 },
        { id_tipo_fecha: formData.fechaDesignacionTribunal_tipo, fecha_valor: formData.fechaDesignacionTribunal },
        { id_tipo_fecha: formData.fechaDefensaProyecto_tipo, fecha_valor: formData.fechaDefensaProyecto },
      ],
      etapas: [
        { id_tipo_etapa: formData.etapa1_tipo, completa: false },
        { id_tipo_etapa: formData.etapa2_tipo, completa: false },
      ],
      extensiones: [
        { id_tipo_extension: formData.extension1_tipo },
        { id_tipo_extension: formData.extension2_tipo },
      ],
      tribunales: [
        {id_tribunal: formData.tribunal_id,
        integrante_tribunal_1: formData.tribunalIntegrante1,
        integrante_tribunal_2: formData.tribunalIntegrante2,
        integrante_tribunal_3: formData.tribunalIntegrante3}
      ],
      documentos: [
        {doc_propuesta_proyecto: formData.doc_propuesta_proyecto,
         doc_nota_tutor: formData.doc_nota_tutor,
         doc_cv_tutor: formData.doc_cv_tutor,
         doc_proyecto: formData.doc_proyecto,
         doc_resolucion_tribunal: formData.doc_resolucion_tribunal,
         doc_resolucion_ext_etapa1: formData.doc_resolucion_ext_etapa1,
         doc_resolucion_ext_etapa2: formData.doc_resolucion_ext_etapa2,}
      ]
    };
    console.log(data)
  
    try {
      const response = await fetch(`http://localhost:3000/proyectos/${proyectoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Proyecto actualizado con éxito");
        getProyectos();
        onClose();
      } else {
        console.error("Error al actualizar el proyecto");
      }
    } catch (error) {
      console.log(error)
      console.error("Error en la petición:", error);
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
                <option value={1}>Tec. en Higiene y Seguridad</option>
                <option value={2}>Lic. en Tecnología Educativa</option>
              </select>
            </span>

            <span>
              <label>Nombre del proyecto</label>
              <input
                type="text"
                name="nombre_proyecto"
                value={formData.nombre_proyecto}
                onChange={handleChange}
                placeholder="Título"
              />
            </span>

            {[1, 2, 3].map((num) => (
              <div key={num} className="form-group-alumnos">
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

          <div className="form-group-right">
            <span>
              <label>Finalización de cursada</label>
              <input
                type="date"
                name="fechaFinCursada"
                value={formData.fechaFinCursada}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Carga de archivos de la etapa 1</label>
              <input
                type="date"
                name="fechaCargaArchivosEtapa1"
                value={formData.fechaCargaArchivosEtapa1}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Aprobación de etapa 1</label>
              <input
                type="date"
                name="fechaAprobacionEtapa1"
                value={formData.fechaAprobacionEtapa1}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Propuesta de proyecto:</label>
              {formData.doc_propuesta_proyecto ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_propuesta_proyecto}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )} 
              <input onChange={handleFileChange} name="doc_propuesta_proyecto" type="file" accept="application/pdf" id="file-input-propuesta" style={{ display: "none" }}/>
              <label htmlFor="file-input-propuesta" className="custom-file-upload" style={{ cursor: "pointer"}} >
                Seleccionar nuevo archivo
              </label>
            </span>

            <span>
              <label>Nota de aceptación del tutor:</label>
              {formData.doc_nota_tutor ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_nota_tutor}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )} 
              <input onChange={handleFileChange} name="doc_nota_tutor" type="file" accept="application/pdf" id="file-input-aceptacion-propuesta" style={{ display: "none" }}/>
              <label htmlFor="file-input-aceptacion-propuesta" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
            </span>

            <span>
              <label>CV del tutor:</label>
              {formData.doc_cv_tutor ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_cv_tutor}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )}   
              <input onChange={handleFileChange} name="doc_cv_tutor" type="file" accept="application/pdf" id="file-input-cv-tutor" style={{display: "none"}} />
              <label htmlFor="file-input-cv-tutor" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
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
                <label>Carga de archivos de la etapa 2</label>
                <input
                  type="date"
                  name="fechaCargaArchivosEtapa2"
                  value={formData.fechaCargaArchivosEtapa2}
                  onChange={handleChange}
                />
            </span>

            <span>
              <label>Documento de tesina:</label>
              {formData.doc_proyecto ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_proyecto}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )} 
              <input onChange={handleFileChange} name="doc_proyecto" type="file" accept="application/pdf" id="file-input-doc-tesina" style={{display: "none"}} />
              <label htmlFor="file-input-doc-tesina" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
            </span>

            <span>
                <label>Aprobación de la etapa 2</label>
                <input
                  type="date"
                  name="fechaAprobacionEtapa2"
                  value={formData.fechaAprobacionEtapa2}
                  onChange={handleChange}
                />
            </span>
          </div>

          <div className="form-group-right">
            <span>
              <label>Resolución del tribunal:</label>
              {formData.doc_resolucion_tribunal ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_resolucion_tribunal}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )}   
              <input onChange={handleFileChange} name="doc_resolucion_tribunal" type="file" accept="application/pdf" id="doc_resolucion_tribunal" style={{display: "none"}} />
              <label htmlFor="doc_resolucion_tribunal" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
            </span>

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
    },
    {
      title: "Extensiones",
      content: (
        <div className="form-group">
          <div className="form-group-left">
            <span>
              <label>Resolución de extensión (Etapa 1):</label>
              {formData.doc_resolucion_ext_etapa1 ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_resolucion_ext_etapa1}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )} 
              <input onChange={handleFileChange} name="doc_resolucion_ext_etapa1" type="file" accept="application/pdf" id="file-extension-tesina-etapa-1" style={{display: "none"}} />
              <label htmlFor="file-extension-tesina-etapa-1" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
            </span>

            <span>
                <label>Fecha de resolución (Etapa 1):</label>
                <input
                  type="date"
                  name="fechaResolucionExtensionEtapa1"
                  value={formData.fechaResolucionExtensionEtapa1}
                  onChange={handleChange}
                />
            </span>
          </div>

          <div className="form-group-right">
            <span>
              <label>Resolución de extensión (Etapa 2):</label>
              {formData.doc_resolucion_ext_etapa2 ? (
                <a target="_blank" rel="noopener noreferrer" href={formData.doc_resolucion_ext_etapa2}>Archivo actual</a>
              ) : (
                <p>No hay archivos cargados</p> )} 
              <input onChange={handleFileChange} name="doc_resolucion_ext_etapa2" type="file" accept="application/pdf" id="file-extension-tesina-etapa-2" style={{display: "none"}} />
              <label htmlFor="file-extension-tesina-etapa-2" className="custom-file-upload" style={{ cursor: "pointer" }}>
                Seleccionar nuevo archivo
              </label>
            </span>

            <span>
                <label>Fecha de resolución (Etapa 2):</label>
                <input
                  type="date"
                  name="fechaResolucionExtensionEtapa2"
                  value={formData.fechaResolucionExtensionEtapa2}
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
        <div className="modal-edit">
          <div className="modal-edit-content">
            <h2>{steps[currentStep].title}</h2>

            <form key={currentStep} onSubmit={handleSubmit}>
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

                <button type="submit" className="modal-save-button" onClick={handleSubmit}>
                  Modificar
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
    </>
  );
}
