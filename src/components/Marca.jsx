import { useState, useEffect } from "react";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getFetchData } from "../services/APIGets";
import { deleteFetchData } from "../services/APIDeletes";
import DataTable from 'react-data-table-component';

const Marca = (props) => {
  const [marcas, setMarcas] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div width={200}>
          <Button color="primary" className="mx-1">
            <FontAwesomeIcon icon={faEdit} className="ml-0 text-white mx-auto" />
          </Button>
          <Button
            color="danger"
            className="mx-1"
            onClick={() => handleDelete(row.id)}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="ml-0 text-white mx-auto"
            />
          </Button>
        </div>
      ),
    },
  ];
  

  useEffect(() => {
    const cargaDatos = async () => {
      setIsLoading(true);
      await getFetchData(
        "http://localhost:8000/api/v1/marcas",
        setMarcas,
        setDataErr
      );
      setIsLoading(false);
    };
    cargaDatos();
  }, []);

  const handleDelete = async (id) => {
    // Aquí puedes añadir la lógica para eliminar la marca con el ID especificado
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirm) {
      try {
        await deleteFetchData(`http://localhost:8000/api/v1/marcas/${id}`);
        setMarcas(marcas.filter((marca) => marca.id !== id));

        sessionStorage.setItem("mensaje", "Marca borrado correctamente");
      
      } catch (err) {
        setDataErr("Ha ocurrido un error al intentar eliminar el producto");
      }
    }
  };

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
              <DataTable
              columns={columns}
                data={marcas}
                striped={true}
                pagination
                highlightOnHover={true}
                pointerOnHover={true}
                paginationRowsPerPageOptions={[5, 10, 20, 50]}
                paginationPerPage={5}
              />
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
