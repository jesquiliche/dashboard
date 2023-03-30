import { useState, useEffect } from "react";
import React from "react";
import { getFetchData } from "../services/APIGets";
import MyDataTable from "./utils/MyDatatable";
//import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Código",
    selector: "codigo",
    sortable: true, //opcional
  },
  {
    name: "Nombre",
    selector: "nombre",
    sortable: true, //opcional
  },
];

const Poblacion = (props) => {
  const [provincias, setProvincias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataErr, setDataErr] = useState();

  useEffect(() => {
    const cargarDatos = async () => {
      setIsLoading(true);
      await getFetchData(
        "http://localhost:8000/api/v1/provincias",
        setProvincias,
        setDataErr
      );
      // setProvincias(data);
      setIsLoading(false);
    };
    try {
      cargarDatos();
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
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
  /*            <DataTable
                columns={columns}
                data={provincias}
                pagination={true}
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                paginationRowsPerPageOptions={[5, 10, 20, 30]}
                paginationPerPage={7} // opcional, si deseas establecer un valor predeterminado
              />*/
              <MyDataTable title="Provincias"
                data={provincias}
                columns={columns} />
               
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
