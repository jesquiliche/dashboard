import { useState, useEffect } from "react";
import React from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  
  faUserEdit

} from "@fortawesome/free-solid-svg-icons";
import { getFetchData } from "../services/APIGets";



const Oferta = (props) => {
  const apiUrl=process.env.REACT_APP_API_URL;
  const [ofertas, setOfertas] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    const cargarDatos = async ()=>{
      setIsLoading(true);
      await getFetchData(`${apiUrl}/api/v1/ofertas`,
      setOfertas, setDataErr);
      setIsLoading(false);
    };
    cargarDatos();
  }, []);

  
  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-12 mx-auto">
          <div className="text-center">
            <h3>Productos</h3>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagen</th>
              </thead>
              <tbody>
                {ofertas.map((e) => (
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

export default Oferta;
