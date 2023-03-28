import React, { useState, useEffect } from "react";
import { Table, Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { deleteFetchData } from "../../services/APIDeletes";
import { getFetchData } from "../../services/APIGets";




const Producto = (props) => {
  const [productos, setProductos] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);
  


 
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirm) {
    
      try {
        deleteFetchData(`http://localhost:8000/api/v1/productos/${id}`);
        await setProductos(productos.filter((producto) => producto.id !== id));

        sessionStorage.setItem("mensaje", "Producto borrado correctamente");
      
      } catch (err) {
        setDataErr("Ha ocurrido un error al intentar eliminar el producto");
      }
      
    }
  };

  useEffect(() => {
    
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        await getFetchData(
          "http://localhost:8000/api/v1/productos",
          setProductos,
          setDataErr
        );
    
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    cargarDatos();
  }, []);

  return (
    <>
      <div className="container">
        <Card className="card-shadow col-lg-12 col-md-12 col-sm-12 mx-auto">
          <CardHeader className="text-center">
            <h3>Productos</h3>
          </CardHeader>
          <Link to={`/addproducto`}>
            <Button color="primary mx-1 my-2 mx-3">
              <FontAwesomeIcon
                icon={faPlus}
                className="ml-0 text-white mx-auto"
              />
            </Button>
          </Link>
          <CardBody>
           
            {isLoading ? (
              <div className="text-center my-2">
                <Spinner color="primary" />
              </div>
            ) : (
              <Table striped className="col-md-10 col-lg-12 col-sm-4 mx-auto">
                <thead>
                  <tr>
                    <th className="col-md-1 col-sm-1 col-md-1 col-lg-1 width=50px">id</th>
                    <th className="col-md-1 col-sm-1 col-md-1 col-lg-5">
                      Nombre
                    </th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-1">
                      Precio
                    </th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2">
                      Categoría
                    </th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2">
                      Subcategoria
                    </th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2 text-center">
                      Foto
                    </th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((e) =>  (
                    <tr key={e.id}>
                      <td className="col-md-1 col-sm-1 col-md-1 col-lg-5">
                        {e.id}
                      </td>
                      <td className="col-md-4 col-sm-1 col-lg-5">{e.nombre}</td>
                      <td className="col-md-2 col-sm-12 col-lg-1">
                        {e.precio}
                      </td>
                      <td className="col-md-2 col-sm-12 col-lg-2">
                        {e.categoria}
                      </td>
                      <td className="col-md-2 col-sm-12 col-lg-2">
                        {e.subcategoria}
                      </td>
                      <td>
                        <img src={`http://localhost:8000${e.imagen}`} className="img-pequeña"/>
                      </td>

                      <td className="col-md-1 col-sm-1 col-lg-1">
                        <Link to={`/editproducto/${e.id}`}>
                          <Button color="primary mx-1">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="ml-0 text-white mx-auto"
                            />
                          </Button>
                        </Link>
                      </td>

                      <td className="col-md-1 col-sm-1 col-lg-1">
                        <Button
                          color="danger mx-1"
                          onClick={() => handleDelete(e.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="ml-0 text-white mx-auto"
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {dataErr && (
              <div
                className="alert alert-warning mt-2 mx-auto col-lg-6php  py-2"
                role="alert"
              >
                <h6 className="text-danger text-center">{dataErr}</h6>
              </div>
            )}
          </CardBody>
     
        </Card>
      </div>
    </>
  );
};

export default Producto;
