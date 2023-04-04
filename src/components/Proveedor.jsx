import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getFetchData } from "../services/APIGets";
import { deleteFetchData } from "../services/APIDeletes";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Proveedor = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      await getFetchData(
        `${apiUrl}/api/v1/proveedores`,
        setProveedores,
        setDataErr
      );
    } catch (error) {
      setDataErr(error);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("¿Está seguro que desea eliminar este proveedor?")) {
        await deleteFetchData(`${apiUrl}/api/v1/proveedores/${id}`);
        setProveedores(
          proveedores.filter((proveedores) => proveedores.id !== id)
        );

        sessionStorage.setItem("mensaje", "Producto borrado correctamente");
      }
    } catch (error) {
      setDataErr(error);
    }
  };

  const columns = [
    {
      name: "Nif",
      selector: "nif",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: "nombre",
      sortable: true,
    },
    {
      name: "C. Postal",
      selector: "cod_postal",
      sortable: true,
    },
    {
      name: "Población",
      selector: "poblacion",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Link to={`/editproveedor`}>
            <Button color="primary mx-1">
              <FontAwesomeIcon
                icon={faEdit}
                className="ml-0 text-white mx-auto"
              />
            </Button>
          </Link>
          <Button color="danger mx-1" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="ml-0 text-white mx-auto"
            />
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
              <DataTable columns={columns} data={proveedores} pagination />
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
