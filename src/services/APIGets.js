import Cookies from "universal-cookie";

export const obtenerProducto = async (id, setProducto, setError) => {
    const url=`http://localhost:8000/api/v1/productos/${id}`;
    const res=await fetchData(url, setError);
    const data=await res.json();
    setProducto(data);    

};

export const obtenerProductos = async (setProductos, setError) => {
  const url=`http://localhost:8000/api/v1/productos`;
  const res=await fetchData(url, setError);
  const data=await res.json();

  setProductos(data);    

};

export const obtenerSubcategorias = async (setSubcategorias, setError) => {
  const url=`http://localhost:8000/api/v1/subcategorias`;
  const response=await fetchData(url, setError);
  const data=await response.json();
  setSubcategorias(data);
 };

export const obtenerMarcas = async (setMarcas, setError) => {
  const url=`http://localhost:8000/api/v1/marcas`
  const response=await fetchData(url, setError);
  const data=await response.json();
  setMarcas(data);
};

export const obtenerIvas = async (setIvas, setError) => {
  const url="http://localhost:8000/api/v1/ivas"
  const response=await fetchData(url,setError);
  const data=await response.json();
  setIvas(data);
 };

export const handleError = (error) => {
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

const getFetchOptions = (token) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (token) {
    headers.Authorization = `bearer ${token.replace(/['"]+/g, "")}`;
  }
  return {
    method: "GET",
    headers,
  };
};


const fetchData = async (url, method = "GET", data = null) => {
  try{
    const cookies = new Cookies();
    const token = cookies.get("token");
    const options=getFetchOptions(token);
    const response = await fetch(url, options);
    const result = await handleError(response);
    return result;
  }catch(error){
    alert(error);
  }
};