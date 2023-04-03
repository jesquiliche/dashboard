import React, { useEffect, useState } from "react";
import { Card, Form, FormGroup, Label, Input, Button } from "reactstrap";

const EditProveedor = (props) => {
  const [proveedor, setProveedor] = useState({
    nif: "",
    nombre: "",
    cod_provincia: "",
    cod_postal: "",
    calle: "",
    numero: "",
    notas: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos del formulario al servidor
  };
  
  useEffect(() => {
    console.log("entro");
    alert("entro");
  }, []);

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>NIF</Label>
            <Input
              type="text"
              name="nif"
              placeholder="Introduce el NIF"
              value={proveedor.nif}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              placeholder="Introduce el nombre"
              value={proveedor.nombre}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Código de provincia</Label>
            <Input
              type="text"
              name="cod_provincia"
              placeholder="Introduce el código de provincia"
              value={proveedor.cod_provincia}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Código postal</Label>
            <Input
              type="text"
              name="cod_postal"
              placeholder="Introduce el código postal"
              value={proveedor.cod_postal}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Calle</Label>
            <Input
              type="text"
              name="calle"
              placeholder="Introduce la calle"
              value={proveedor.calle}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Número</Label>
            <Input
              type="number"
              name="numero"
              placeholder="Introduce el número"
              value={proveedor.numero}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Notas</Label>
            <Input
              type="textarea"
              name="notas"
              placeholder="Introduce notas adicionales (opcional)"
              value={proveedor.notas}
              onChange={handleChange}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditProveedor;