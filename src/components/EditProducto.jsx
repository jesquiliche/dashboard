import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Spinner, Label } from "reactstrap";

const EditProducto = (props) => {
  const { id } = useParams();

  const [producto, setProducto] = useState({
    precio: "",
    nombre: "",
    descripcion: "",
    subcategoria_id: "",
    iva_id: "",
    marca_id: "",
  });

  const [subcategorias,setSubcategorias]=useState([]);
  const [marcas,setMarcas]=useState([]);
  const [ivas,setIvas]=useState([]);
 

  const [cargando, setCargando] = useState(false);

  const obtenerProducto = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/productos/${id}`
      );
      console.log(response);
      const data = await response.json();
    
      setProducto(data);
    } catch (error) {
      
    
    }
  };

  const obtenerSubcategorias = async () => {
    try {
      
      const response = await fetch(
        `http://localhost:8000/api/v1/subcategorias`
      );
      
      const data = await response.json();
      
      setSubcategorias(data);
    
      
    } catch (error) {
      console.error(error);
    
    }
  };

  const obtenerMarcas = async () => {
    try {
      
      const response = await fetch(
        `http://localhost:8000/api/v1/marcas`
      );
      
      const data = await response.json();
      console.log(data);
      setMarcas(data);
      console.log(marcas);
    
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const obtenerIvas = async () => {
    try {
      
      const response = await fetch(
        "http://localhost:8000/api/v1/ivas"
      );
      
      const data = await response.json();
    
      console.log(data);
    
      setIvas(data);

    
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };




  useEffect(async () => {
    setCargando(true);
    await obtenerProducto();
    await obtenerSubcategorias();
   await obtenerMarcas();
    await obtenerIvas();
    setCargando(false);
  }, []);

  return (
    <>
  <div className="card col-md-8 mx-auto">
  
    <div className="card-header text-center">
      <h3>Producto</h3>
      
      {cargando ? 
         (   <div className="text-center my-2">
         <Spinner color="primary" />
       </div>)
        :("")}
    </div>

    <div className="card-body">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating py-1">
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                value={producto.nombre}
              />
              <label for="nombre">
                Nombre
              </label>
            </div>

            <div className="form-floating py-1">
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                placeholder="Descripción"
              >
              {producto.descripcion}
              </textarea>
              <label for="descripcion">
                Descripción
              </label>
            </div>

            <div className="form-floating py-1">
              <select className="form-select" name="marca_id">
                {ivas.map(iva => (
                  <option key={iva.id} value={iva.id}>
                    {iva.nombre}
                  </option>
                ))}
              </select>
              <label for="marca_id">
                Marca
              </label>
            </div>

            <div className="form-floating py-1">
              <select className="form-select" name="subcategoria_id">
                {subcategorias.map((subcategoria) => (
                  <option key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </select>
              <label for="subcategoria_id">
                Subcategoria
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating py-1">
              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                placeholder="Categoría"
                value={producto.subcategoria}
              />
              <label for="Categoria">
                Categoría
              </label>
            </div>

            <div className="form-floating py-1">
              <select className="form-select" name="marca_id">
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <label for="marca_id">
                Marca
              </label>
            </div>

            <div className="form-floating py-1">
              <input
                type="text"
                className="form-control"
                id="imagen"
                name="imagen"
                placeholder="Imagen"
                value="fee_786_587_png.webp"
              />
              <label for="imagen">
                Imagen
              </label>
            </div>

           
          </div>
        </div>
        <div className="text-center mx-auto mt-2">
             <button type="submit" className="btn btn-primary py-1">
              Actualizar
            </button>
        </div>
      </form>
    </div>
  </div>
</>

  );
  
};

export default EditProducto;
