import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
let options={}
if(token!=undefined) {
  options={
  method: "GET",
  headers: {
    Authorization: "bearer " + token.replace(/['"]+/g, ""),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    },
  }
}
else {
    options={
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      },
    }
  }



export const obtenerProducto = async (id, setProducto, setError) => {
    try {
      
      const response = await fetch(`http://localhost:8000/api/v1/productos/${id}`,options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducto(data);
    } catch (error) {
    
      setError(error);
    }
  };

  export const obtenerSubcategorias = async (setSubcategorias, setError) => {
    try {
      
      const response = await fetch(`http://localhost:8000/api/v1/subcategorias`,options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubcategorias(data);
    } catch (error) {
      setError(error);
    }
  };

  export const obtenerMarcas = async (setMarcas, setError) => {
    try {
      
      const response = await fetch(`http://localhost:8000/api/v1/marcas`,options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      setError(error);
    }
  };
  

  export const obtenerIvas = async (setIvas, setError) => {
    try {
      
      const response = await fetch("http://localhost:8000/api/v1/ivas",options);
      if (!response.ok) {
        console.log(response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIvas(data);
    } catch (error) {
      setError(handleError(error));
    }
  };
  
  const handleError = (error) => {
    if (error instanceof TypeError) {
      return new Error(`Error de red: ${error.message}`);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      const status = error.message.split(': ')[1];
      switch (status) {
        case '400':
          return new Error('Petición incorrecta: El servidor no pudo entender la solicitud');
        case '401':
          return new Error('No autorizado: Autenticación fallida o el usuario no tiene permisos para la operación solicitada');
        case '403':
          return new Error('Prohibido: El servidor entiende la solicitud, pero se niega a cumplirla');
        case '404':
          return new Error('No encontrado: El servidor no pudo encontrar el recurso solicitado');
        case '405':
          return new Error('Método no permitido: El método solicitado no es válido para el recurso solicitado');
        case '422':
          return new Error('Entidad no procesable: El servidor entiende la solicitud, pero no puede procesarla porque los datos de la solicitud son inválidos o incompletos');
        case '500':
          return new Error('Error del servidor: El servidor ha encontrado una situación que no sabe cómo manejar');
        default:
          return new Error(`¡Error HTTP! Código de estado: ${status}`);
      }
    } else {
      return error;
    }
  };
  