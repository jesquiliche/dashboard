import { useState, useEffect } from "react";
import React from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faPhone,
  faUser,
  faEnvelope as email,
  faUserEdit,
  faPlusSquare as add,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

const Producto = (props) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ConsultarDatos();
  }, []);

  //Consultamos los datos de la tabla proveedores
  const ConsultarDatos = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    fetch(`http://localhost:8000/api/v1/productos`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + token.replace(/['"]+/g, ""),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setIsLoading(false); // Cambia isLoading a false
        console.log(data);
      })
      .catch((error) => setDataErr("Error"));
  };

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-12 mx-auto">
          <div className="text-center">
            <h3>Productos</h3>
          </div>
          <div className="card-body">
            {isLoading ? ( // Mostrar "Cargando..." mientras isLoading es verdadero
              <div className="text-center my-2">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                </thead>
                <tbody>
                  {productos.map((e) => (
                    <tr>
                      <td>{e.nombre}</td>
                      <td>{e.descripcion}</td>
                      <td>{e.precio}</td>
                      <td>{e.imagen}</td>
                      <td>
                        <Button color="danger mx-1">
                          <FontAwesomeIcon
                            icon={faUserEdit}
                            className="ml-0 text-white mx-auto"
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {dataErr ? (
            <div className="alert alert-secondary mt-2 py-2" role="alert">
              {dataErr}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Producto;
