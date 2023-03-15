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

const Proveedor = (props) => {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    ConsultarDatos();
  }, []);

  //Consultamos los datos de la tabla proveedores
  const ConsultarDatos = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    fetch(`http://localhost:8000/api/v1/proveedores`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + token.replace(/['"]+/g, ""),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data);
        console.log(data);
      })
      .catch((error) => setDataErr("Error"));
  };

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-12 mx-auto">
          <div className="text-center">
            <h3>Proveedores</h3>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <th>Nif</th>
                <th>Nombre</th>
                <th>C. Postal</th>
                <th>Población</th>
              </thead>
              <tbody>
                {proveedores.map((e) => (
                  <tr>
                    <td>{e.nif}</td>
                    <td>{e.nombre}</td>
                    <td>{e.cod_postal}</td>
                    <td>{e.poblacion}</td>
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

export default Proveedor;
