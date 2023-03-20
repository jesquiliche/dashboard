import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faUserEdit
  
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { obtenerProductos,getFetchData } from "../services/APIGets";

const Producto = (props) => {
  const [productos, setProductos] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async ()=>{
      setIsLoading(true);
      await getFetchData("http://localhost:8000/api/v1/productos",setProductos, setDataErr);
      setIsLoading(false);
    };
    cargarDatos()
  }, []);

  return (
    <>
      <div className="container">
        <Card className="card-shadow col-lg-12 mx-auto">
          <CardHeader className="text-center">
            <h3>Productos</h3>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center my-2">
                <Spinner color="primary" />
              </div>
            ) : (
              
              <Table striped>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.nombre}</td>
                      <td>{e.precio}</td>
                      <td>{e.iva_id}</td>

                      <td>{e.categoria}</td>
                      <td>{e.subcategoria}</td>
                      <td>{e.subcategoria}</td>
                      <td>{e.marca}</td>
                      <td>{e.imagen}</td>

                      <td>
                        <Link to={`/editproducto/${e.id}`}>
                          <Button color="danger mx-1">
                            <FontAwesomeIcon icon={faUserEdit} className="ml-0 text-white mx-auto" />
                          </Button>
                       </Link>
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {dataErr && (
              <div className="alert alert-secondary mt-2 py-2" role="alert">
                {dataErr}
              </div>
          )} 
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Producto;
