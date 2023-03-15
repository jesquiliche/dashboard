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

const Marca = (props) => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    ConsultarDatos();
  }, []);

  //Consultamos los datos de la tabla proveedores
  const ConsultarDatos = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    fetch(`http://localhost:8000/api/v1/marcas`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + token.replace(/['"]+/g, ""),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMarcas(data);
        console.log(data);
      })
      .catch((error) => setDataErr("No esta autorizado"));
  };

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-8 mx-auto">
          <div className="text-center">
            <h3>Marcas</h3>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <th>id</th>
                <th>Nombre</th>
              </thead>
              <tbody>
                {marcas.map((e) => (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.nombre}</td>
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

export default Marca;
