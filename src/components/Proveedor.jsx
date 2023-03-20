import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  
  faUserEdit,

  
} from "@fortawesome/free-solid-svg-icons";
import { getFetchData, obtenerProveedores } from "../services/APIGets";


const Proveedor = (props) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    const cargarDatos = async ()=>{
      setLoading(true);
      await getFetchData("http://localhost:8000/api/v1/proveedores",
        setProveedores, setDataErr);
      setLoading(false);
    };
    cargarDatos()
  }, []);

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-12 mx-auto">
          <div className="text-center">
            <h3>Proveedores</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center my-2">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              </div>
            ) : (
              <Table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nif</th>
                    <th>Nombre</th>
                    <th>C. Postal</th>
                    <th>Población</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedores.map((e) => (
                    <tr key={e.id}>
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
              </Table>
            )}
          </div>
          {dataErr && (
            <div className="alert alert-secondary mt-2 py-2" role="alert">
              {dataErr}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Proveedor;
