import { useState, useEffect } from "react";
import React from "react";
import {  Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { getFetchData } from "../services/APIGets";


const Poblacion = (props) => {
  const [provincias, setProvincias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    const cargarDatos = async ()=>{
      setIsLoading(true);
      await getFetchData("http://localhost:8000/api/v1/provincias",
      setProvincias, setDataErr);
      setIsLoading(false);
    };
    cargarDatos();
  }, []);


  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-12 mx-auto">
          <div className="text-center">
            <h3>Provincias</h3>
          </div>
          <div className="card-body">
            {isLoading ? (
             <div className="text-center my-2">
             <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
           </div>
            ) : (
              <table className="table table-striped">
                
                <thead>
                  <th>Código</th>
                  <th>Nombre</th>
                </thead>
                <tbody>
                  {provincias.map((e) => (
                    <tr>
                      <td>{e.codigo}</td>
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

export default Poblacion;
