import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { obtenerProducto, getFetchData } from "../../services/APIGets";
import { putFetchData } from "../../services/APIPuts";
import ListItems from "./../utils/ListItems";
import TextField from "./../utils/TextField";
import NumberField from "./../utils/NumberField";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

const EditProducto = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const [producto, setProducto] = useState({});
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [ivas, setIvas] = useState([]);
  const [error, setError] = useState([]);

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);

      await obtenerProducto(id, setProducto, setError);

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
    actualizarProducto(producto);
  };

  const handleOnChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarProducto = async (producto) => {
    setCargando(true);

    const url = `http://localhost:8000/api/v1/productos/${id}`;
    await putFetchData(url, producto);
    setCargando(false);
    navigate("/Producto");
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
              <div className="col-md-4 card mt-2">
                <img
                  src={`http://localhost:8000/img/${producto.imagen}`}
                  className="img-grande mt-2"
                />
              </div>
              <div className="col-md-4">
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

              <div className="col-md-4 mt-2">
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
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFileLang"
                      lang="es"
                    />
                    
                  </div>
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
