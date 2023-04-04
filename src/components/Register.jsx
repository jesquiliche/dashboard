import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

const Register = (props) => {
  const apiUrl=process.env.REACT_APP_API_URL;
  let { id } = useParams();

  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await InsertarDatos(datos);
    setLoading(false);
  };

  //Insertar en base de datos
  const InsertarDatos = async () => {
      const data = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const response = await data.json();
    const statusCode = data.status;
  
    let errorArray = [];
    if(statusCode!==200) {
      
      for (const property in response) {
        errorArray.push(`${response[property]}`);
      }
      }else {
       errorArray.push("Usuario registrado correctamente");
    }

    setErr(errorArray);
  };

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-6 mx-auto my-6 mt-4">
          <div className="text-center">
            <h1>Registro</h1>
            <h2>{id}</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleOnsubmit}>
              <div className="col-lg-12">
                <input
                  type="email"
                  placeholder="Introduzca el email"
                  name="email"
                  className="form-control my-2"
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  onChange={handleOnChange}
                  autoFocus="autofocus"
                />

                <input
                  type="password"
                  placeholder="Introduzca el password"
                  name="password"
                  className="form-control my-2"
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  placeholder="Introduzca el nombre"
                  name="name"
                  className="form-control my-2"
                  onChange={handleOnChange}
                />
              </div>
              {loading ? (
                <div className="text-center my-2">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Registrarse
                </button>
              )}
              <div className="px-4 py-1 mt-4 alert alert-primary" role="alert">
                {err.map((e, i) => (
                  <div key={i}>
                    <h6>{e}</h6>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
