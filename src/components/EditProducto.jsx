import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';

const EditarProducto = (props) => {
  const [producto, setProducto] = useState({
    precio: '',
    nombre: '',
    descripcion: '',
    subcategoria_id: '',
    iva_id: '',
    marca_id: ''
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:8000/api/v1/productos/${props.match.params.id}`);
        const data = await response.json();
        setProducto(data);
        setCargando(false);
      } catch (error) {
        console.error(error);
        setCargando(false);
      }
    };
    obtenerProducto();
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setProducto(prevProducto => ({
      ...prevProducto,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setCargando(true);
      const response = await fetch(`http://localhost:8000/api/v1/productos/${props.match.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
      const data = await response.json();
      console.log(data);
      // Actualiza la tabla de productos en la página de productos
      props.history.push('/productos');
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  return (
    <Card>
      <Card.Header>Editar Producto</Card.Header>
      <Card.Body>
        {cargando && <Spinner animation="border" />}
        {!cargando && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={producto.precio} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={producto.descripcion} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formSubcategoria">
              <Form.Label>Subcategoría</Form.Label>
              <Form.Control type="number" name="subcategoria_id" value={producto.subcategoria_id} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formIva">
              <Form.Label>IVA</Form.Label>
              <Form.Control type="number" name="iva_id" value={producto.iva_id} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="number" name="marca_id" value={producto.marca_id} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default EditarProducto;

