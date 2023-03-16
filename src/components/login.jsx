import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Cookies from "universal-cookie";

const Login = () => {
  const navigate = useNavigate();
  const {signIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const [dataErr, setDataErr] = useState();

  const handleOnChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    console.log(datos);
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await ObtenerToken(datos);
    setLoading(false);
  };

  const cookies = new Cookies();

  const ObtenerToken = async (datos) => {
    try {
      cookies.remove("token");

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Credenciales no válidas");
      }

      cookies.set("token", data.authorisation.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      setDataErr(null);
      signIn();
      navigate("/Tablero");
    } catch (error) {
      setDataErr(error.message);
    }
  };

  return (
    <>
      <div className="container ">
        <div className="card card-shadow col-lg-4 mx-auto login">
          <div className="text-center text-dark">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleOnsubmit}>
              <input
                type="email"
                placeholder="Introduzca el email"
                name="email"
                className="form-control my-2"
                onChange={handleOnChange}
                autoFocus="autofocus"
                required
              />
              <input
                type="password"
                placeholder="Introduzca el password"
                name="password"
                className="form-control my-2"
                onChange={handleOnChange}
                required
              />
              {loading ? (
                <div className="text-center my-2">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar sesión
                </button>
              )}
            </form>
            {dataErr ? (
              <div className="alert alert-secondary py-1" role="alert">
                {dataErr}
              </div>
            ) : (
              ""
            )}
            <p className="text-dark">
              ¿No estas registrado?
              <Link to="/registrar">
                <span className="text-primary"> Registrate</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
