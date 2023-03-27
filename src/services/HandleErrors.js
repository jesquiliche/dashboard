const handleError = (error) => {
    if (error instanceof TypeError) {
      return new Error(`Error de red: ${error.message}`);
    } else if (
      error instanceof Error &&
      error.message.startsWith("HTTP error!")
    ) {
      const status = error.message.split(": ")[1];
      switch (status) {
        case "400":
          return new Error(
            "Petición incorrecta: El servidor no pudo entender la solicitud"
          );
        case "401":
          return new Error(
            "No autorizado: Autenticación fallida o el usuario no tiene permisos para la operación solicitada"
          );
        case "403":
          return new Error(
            "Prohibido: El servidor entiende la solicitud, pero se niega a cumplirla"
          );
        case "404":
          return new Error(
            "No encontrado: El servidor no pudo encontrar el recurso solicitado"
          );
        case "405":
          return new Error(
            "Método no permitido: El método solicitado no es válido para el recurso solicitado"
          );
        case "422":
          return new Error(
            "Entidad no procesable: El servidor entiende la solicitud, pero no puede procesarla porque los datos de la solicitud son inválidos o incompletos"
          );
        case "500":
          return new Error(
            "Error del servidor: El servidor ha encontrado una situación que no sabe cómo manejar"
          );
        default:
          return new Error(`¡Error HTTP! Código de estado: ${status}`);
      }
    } else {
      return error;
    }
  };
  
  export default handleError;
  