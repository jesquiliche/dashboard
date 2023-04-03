import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Usuario from "../Usuario";
import Login from "../login";
import Register from "../Register";
import Topbar from "./Topbar";
import Tablero from "../Tablero";
import UserProvider from "../../context/UserProvider";
import RequireAuth from "../RequireAuth";
import Proveedor from "../Proveedor";
import Producto from "../productos/Producto";
import Oferta from "../Oferta";
import Provincia from "../Provincia";
import Marca from "../Marca";
import Logout from "../Logout";
import EditProducto from "../productos/EditProducto";
import AddProducto from "../productos/AddProducto";
import AddProveedor from "../AddProveedor";
import EditProveedor from "../EditProveedor";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Tablero" element={<Tablero />} />
        <Route exact path="/about" element={() => "About"} />
        <Route exact path="/Registrar" element={<Register />} />
        <Route exact path="/Logout" element={<Logout />} />
        <Route exact path="/contact" element={() => "Contact"} />
        
        <Route
          exact
          path="/Usuario"
          element={
            <RequireAuth>
              <Usuario />
            </RequireAuth>
          }
        />
        <Route exact path="/Login" element={<Login />} />
        <Route
          exact
          path="/Producto"
          element={
            <RequireAuth>
              <Producto />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/addproveedor"
          element={
            <RequireAuth>
              <AddProveedor />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/editproveedor"
          element={
            <RequireAuth>
              <EditProveedor />
            </RequireAuth>
          }
        />
        
        <Route
          exact
          path="/Oferta"
          element={
            <RequireAuth>
              <Oferta />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Provincia"
          element={
            <RequireAuth>
              <Provincia />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Proveedor"
          element={
      //      <RequireAuth>
              <Proveedor />
     //       </RequireAuth>
          }
        />
        <Route
          exact
          path="/Marca"
          element={
            <RequireAuth>
              <Marca />
            </RequireAuth>
          }
         />
        
          <Route
          exact
          path="/editproducto/:id"
          element={
            
              <EditProducto />
            
          }
        />
        <Route
          exact
          path="/addproducto"
          element={
            
              <AddProducto />
            
          }
        />
      
      </Routes>
    </UserProvider>
  </Container>
);

export default Content;
