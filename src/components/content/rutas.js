import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Usuario from "../../components/Usuario";
import Login from "../login";
import Register from "../Register";
import Tema from "../Tema";
import Topbar from "./Topbar";
import Bloque from "../Bloque";
import Tablero from "../Tablero";
import Home from "../Home";
import Proveedor from "../Proveedor";
import Producto from "../Producto";
import Producto from "../Oferta";
import Provincia from "../Provincia";
import Marca from "../Marca";

const Rutas = ({ sidebarIsOpen, toggleSidebar }) => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/about" element={() => "About"} />
    <Route exact path="/contact" element={() => "Contact"} />
    <Route exact path="/Usuario" element={<Usuario />} />
    <Route exact path="/Login" element={<Login />} />
    <Route exact path="/Register" element={<Register />} />
    <Route exact path="/Tema" element={<Tema />} />
    <Route exact path="/Proveedor" element={<Proveedor />} />
    <Route exact path="/Producto" element={<Producto />} />
    <Route exact path="/Home" element={<Home />} />
    <Route exact path="/Oferta" element={<Home />} />
    <Route exact path="/Marca" element={<Marca />} />
  </Routes>
);

export default Rutas;
