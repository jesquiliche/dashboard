import React, { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import {getFetchData } from "../../services/APIGets";

import { uploadImage,postFetchData } from "../../services/APIPost";
import ListItems from "./../utils/ListItems";
import TextField from "./../utils/TextField";
import NumberField from "./../utils/NumberField";
import { useNavigate } from "react-router-dom";


const AddProducto = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    'nombre':'',
    'descripcion':'',
    'precio':0,
    'imagen':'',
    'subcategoria_id':1,
    'iva_id':1,
    'marca_id':1
  });
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [ivas, setIvas] = useState([]);
  const [error, setError] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imgRef = useRef(null);


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }

  const handleUploadImage = async () => {
    setCargando(true); 
    const data=await uploadImage('http://localhost:8000/api/v1/upload-image',selectedImage);
    setProducto({
      ...producto,
      imagen: data.url,
    });
   // alert(data.url);
    setCargando(false);
}
 
useEffect(() => {
  if (selectedImage) {
    const objectUrl = URL.createObjectURL(selectedImage);
    imgRef.current.src = objectUrl;
  }
}, [selectedImage]);
  
  
  
  
  
  
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
    añadirProducto(producto);
  };

  const handleOnChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const añadirProducto = async (producto) => {
    setCargando(true);
    console.log("Entro");
    console.log(producto);
    try {
        const url = `http://localhost:8000/api/v1/productos`;
        await postFetchData(url, producto);
        navigate("/Producto");
    } catch (error) {
        const status=error.message.split(": ")[2];
        if(status==422)
          setError("Artículo existente");
        else
          setError(error);
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

          <h5>{error ? error : ""}</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <div className="row">
              <div className="col-md-4 card mt-2">
                <img
                  src={``}
                  className="img-grande mt-2" ref={imgRef}
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
                    rows="10" required
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
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFileLang"
                      lang="es"
                      accept="image/*"
                      maxLength="2048000"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button className="btn btn-primary mt-2" 
                    type="button" onClick={handleUploadImage}>Subir imagen</button>

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

export default AddProducto;
