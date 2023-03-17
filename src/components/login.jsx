import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Cookies from "universal-cookie";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from "reactstrap";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(UserContext);
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
    <Container>
      <Card className="card-shadow col-lg-4 mx-auto login">
        <div className="text-center text-dark">
          <h2>Login</h2>
        </div>
        <CardBody>
          <Form onSubmit={handleOnsubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Introduzca el email"
                onChange={handleOnChange}
                autoFocus
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Introduzca el password"
                onChange={handleOnChange}
                required
              />
            </FormGroup>
            {loading ? (
              <div className="text-center my-2">
                <Spinner color="primary" />
              </div>
            ) : (
              <Button color="primary" block>
                Iniciar sesión
              </Button>
            )}
          </Form>
          {dataErr && (
            <Alert color="secondary" className="py-1" role="alert">
              {dataErr}
            </Alert>
          )}
          <p className="text-dark">
            ¿No estás registrado?{" "}
            <Link to="/registrar" className="text-primary">
              Registrate
            </Link>
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
