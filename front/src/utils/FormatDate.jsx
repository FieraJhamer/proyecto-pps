export const formatDate = (dateString) => {
    if (!dateString) return "No hay fecha registrada";
  
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
  
    return date.toLocaleDateString('es-ES', options);
  };
  