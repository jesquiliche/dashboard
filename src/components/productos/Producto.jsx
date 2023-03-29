import React, { useState, useEffect } from "react";
import { Table, Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { deleteFetchData } from "../../services/APIDeletes";
import { getFetchData } from "../../services/APIGets";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

const Producto = (props) => {
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: "nombre",
      sortable: true,
    },
    {
      name: "Precio",
      selector: "precio",
      sortable: true,
    },
    {
      name: "Categoría",
      selector: "categoria",
      sortable: true,
    },
    {
      name: "Subcategoría",
      selector: "subcategoria",
      sortable: true,
    },
    {
      name: "Foto",
      cell: (row) => (
        <img
          src={`http://localhost:8000${row.imagen}`}
          className="img-pequeña"
        />
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Link to={`/editproducto/${row.id}`}>
            <Button color="primary mx-1">
              <FontAwesomeIcon
                icon={faEdit}
                className="ml-0 text-white mx-auto"
              />
            </Button>
          </Link>
          <Button color="danger mx-1" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon
              icon={faTrash}
              className="ml-0 text-white mx-auto"
            />
          </Button>
        </>
      ),
    },
  ];

  const [productos, setProductos] = useState([]);
  const [dataErr, setDataErr] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirm) {
      try {
        deleteFetchData(`http://localhost:8000/api/v1/productos/${id}`);
        await setProductos(productos.filter((producto) => producto.id !== id));

        sessionStorage.setItem("mensaje", "Producto borrado correctamente");
      } catch (err) {
        setDataErr("Ha ocurrido un error al intentar eliminar el producto");
      }
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        await getFetchData(
          "http://localhost:8000/api/v1/productos",
          setProductos,
          setDataErr
        );

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    cargarDatos();
  }, []);

  return (
    <>
      <div className="container">
        <Card className="card-shadow col-lg-12 col-md-12 col-sm-12 mx-auto">
          <CardHeader className="text-center">
            <h3>Productos</h3>
          </CardHeader>
          <Link to={`/addproducto`}>
            <Button color="primary mx-1 my-2 mx-3">
              <FontAwesomeIcon
                icon={faPlus}
                className="ml-0 text-white mx-auto"
              />
            </Button>
          </Link>
          <CardBody>
            {isLoading ? (
              <div className="text-center my-2">
                <Spinner color="primary" />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={productos}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
                paginationPerPage={3}
                customStyles={{
                  rows: {
                    fontSize: "18px", // Cambia aquí el tamaño de la letra a tu gusto
                  },
                }}
              />
            )}
            {dataErr && (
              <div
                className="alert alert-warning mt-2 mx-auto col-lg-6php  py-2"
                role="alert"
              >
                <h6 className="text-danger text-center">{dataErr}</h6>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Producto;
