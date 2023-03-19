import { useState, useEffect } from "react";
import React from "react";
import {
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { obtenerMarcas } from "../services/APIGets";

const Marca = (props) => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargaDatos=async ()=>{
    setIsLoading(true);
    await obtenerMarcas(setMarcas,setDataErr);
    setIsLoading(false);
    };
    cargaDatos();
  }, []);

 /* const ConsultarDatos = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    await fetch(`http://localhost:8000/api/v1/marcas`, {
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
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => setDataErr("No esta autorizado"));
  };*/

  return (
    <>
      <div className="container">
        <Card className="card-shadow col-lg-8 mx-auto p-2">
          <CardHeader className="text-center">
            <h3>Marcas</h3>
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
                  {marcas.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.nombre}</td>
                      <td>
                        <Button color="danger" className="mx-1">
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

export default Marca;
