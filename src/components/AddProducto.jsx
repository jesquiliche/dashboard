import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import { getFetchData } from "../services/APIGets";
import ListItems from "./utils/ListItems";
import TextField from "./utils/TextField";
import NumberField from "./utils/NumberField";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const AddProducto = (props) => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState(
    {
      precio:0,
      nombre:"",
      descripcion:"",
      subcategoria_id:1,
      iva_id:1,
      marca_id:1
    });
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [ivas, setIvas] = useState([]);
  const [error, setError] = useState([]);

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      await getFetchData(
        "http://localhost:8000/api/v1/subcategorias",
        setSubcategorias,
        setError
      );

      await getFetchData(
        "http://localhost:8000/api/v1/marcas",
        setMarcas,
        setError
      );

      await getFetchData(
        "http://localhost:8000/api/v1/ivas",
        setIvas,
        setError
      );

      await getFetchData(
        "http://localhost:8000/api/v1/categorias",
        setCategorias,
        setError
      );
      setCargando(false);
    };

    cargarDatos();
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    agregarProducto(producto);
  };

  const handleOnChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });

    
  };

  const agregarProducto = async (producto) => {
    setCargando(true);
    const url = `http://localhost:8000/api/v1/productos`;
  
    try {
      const cookies = new Cookies();
      const token = cookies.get('token'); // Obtenemos el token almacenado en la cookie
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agregamos el token al header del fetch
        },
        body: JSON.stringify(producto),
      });
  
      if (response.ok) {
        // Si la actualización es exitosa, redirigir a la página de detalle del producto
        // props.history.push(`/productos/${id}`);
        navigate('/Producto');
      } else {
      
      
        throw new Error();
      }
    } catch (error) {
    
      setError('No se pudo conectar con el servidor');
    }
  
    setCargando(false);
  };
  return (
    <>
      <div className="card col-md-12 mx-auto">
        <div className="card-header text-center">
          <h3>Producto</h3>

          {cargando ? (
            <div className="text-center my-2">
              <Spinner color="primary" />
            </div>
          ) : (
            ""
          )}

          <h5>{error ? error.message : ""}</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  name="nombre"
                  placeholder="Introduzca el nombre"
                  value={producto.nombre}
                  onChange={handleOnChange}
                ></TextField>

                <div className="form-floating py-1">
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    value={producto.descripcion}
                    onChange={handleOnChange}
                    rows="10"
                    required
                  >
                    {producto.descripcion}
                  </textarea>
                  <label for="descripcion">Descripción</label>
                </div>

                <div className="form-floating py-1">
                  <ListItems
                    data={ivas}
                    name="iva_id"
                    value={producto.iva_id}
                    onChange={handleOnChange}
                  />

                  <label for="iva_id">IVA</label>
                </div>

                <div className="form-floating py-1">
                  <ListItems
                    data={subcategorias}
                    name="subcategoria_id"
                    value={producto.subcategoria_id}
                    onChange={handleOnChange}
                  />

                  <label for="subcategoria_id">Subcategoria</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating py-1">
                  <ListItems
                    data={categorias}
                    name="categoria_id"
                    value={producto.categoria_id}
                    onChange={handleOnChange}
                  />
                  <label for="Categoria">Categoría</label>
                </div>

                <div className="form-floating py-1">
                  <ListItems
                    data={marcas}
                    name="marca_id"
                    value={producto.marca_id}
                    onChange={handleOnChange}
                  />

                  <label for="marca_id">Marca</label>
                </div>
                <NumberField
                  name="precio"
                  placeholder="Introduzca el precio"
                  value={producto.precio}
                  onChange={handleOnChange}
                ></NumberField>
              </div>
            </div>
            <div className="text-center mx-auto mt-2">
              <button type="submit" className="btn btn-primary py-1">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducto;
