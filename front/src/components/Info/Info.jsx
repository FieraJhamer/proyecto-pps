import "./Info.css"

export const Info = () => {
  return (
    <div className="info-container">

      <h2>Administrador de tesinas</h2>

      <p>
        Aplicación desarrollada por los alumnos <strong>Alejandro J. Gómez, Juan I. Sotomayor y Leonel A. Torres.</strong> <br /> <br />
        Este programa fue desarrollado para la acreditación de las horas requeridas para la acreditación de las Prácticas Profesionales Supervisadas a cargo del <strong>Ing. Guillermo Herrera Carrizo</strong>, como una solución de automatización para el proceso de administración de proyectos de tesinas en las carreras de <strong>Tecnicatura Universitaria en Higiene y Seguridad</strong> y <strong>Ciclo de Licenciatura en Tecnología Educativa.</strong> <br /> <br />
        Este software fue desarrollado <strong>sin fines de lucro</strong>, con el propósito de brindar una herramienta eficiente y accesible para la gestión de proyectos de tesinas. Al ser parte de las Prácticas Profesionales Supervisadas, <strong>el sistema y su código fuente quedan a disposición de la Universidad, permitiendo su uso, mantenimiento y futuras mejoras según las necesidades institucionales.</strong>  
      </p>

      <a href="http://www.frlr.utn.edu.ar/" target="_BLANK" className="utn-logo-info-container">
        <img src="/assets/utnfrlr.png" alt="Logo de UTN - FRLR" className="utn-logo-info"/>
      </a>
    </div>
  );
};
