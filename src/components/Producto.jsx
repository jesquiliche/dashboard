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
import { getFetchData } from "../services/APIGets";

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
        <Card className="card-shadow col-lg-12 col-md-12 col-sm-12 mx-auto">
          <CardHeader className="text-center">
            <h3>Productos</h3>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center my-2">
                <Spinner color="primary" />
              </div>
            ) : (
              
              <Table striped className= "col-md-10 col-lg-12 col-sm-4 mx-auto">
                <thead>
                  <tr>
                    <th className="col-md-1 col-sm-1 col-md-1 col-lg-1">id</th>
                    <th className="col-md-1 col-sm-1 col-md-1 col-lg-5">Nombre</th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-1">Precio</th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2">Categoría</th>
                    <th className="col-md-1 col-sm-12 col-md-1 col-lg-2">Subcategoria</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((e) => (
                    <tr key={e.id}>
                      <td className="col-md-1 col-sm-1 col-md-1 col-lg-5">{e.id}</td>
                      <td className="col-md-4 col-sm-1 col-lg-5">{e.nombre}</td>
                      <td className="col-md-2 col-sm-12 col-lg-1">{e.precio}</td>
                      <td className="col-md-2 col-sm-12 col-lg-2">{e.categoria}</td>
                      <td className="col-md-2 col-sm-12 col-lg-2">{e.subcategoria}</td>
                      
                      

                      <td  className="col-md-1 col-sm-1 col-lg-1">
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
