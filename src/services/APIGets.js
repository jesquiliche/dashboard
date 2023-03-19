export const obtenerProducto = async (id, setProducto, setError) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/productos/${id}`);
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
      const response = await fetch(`http://localhost:8000/api/v1/subcategorias`);
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
      const response = await fetch(`http://localhost:8000/api/v1/marcas`);
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
      const response = await fetch("http://localhost:8000/api/v1/ivas");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIvas(data);
    } catch (error) {
      setError(error);
    }
  };
  
  