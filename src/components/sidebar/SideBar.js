import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faCopy,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => {
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>

        <h3>
          <FontAwesomeIcon
            icon={faUniversity}
            size="50"
            className="mr-2 ml-0 text-white"
          />
          JQE
        </h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>Configuración</p>
          <SubMenu title="Usuario >" icon={faHome} items={submenus[0]} />

          <SubMenu title="Tablas >" icon={faCopy} items={submenus[1]} />
          <NavItem>
            <NavLink tag={Link} to={"/contact"}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="mr-2 text-white"
              />
              <span className="text-white"> Contacto</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/about"}>
              <FontAwesomeIcon
                icon={faBriefcase}
                className="mr-2 ml-0 text-white"
              />
              <span className="text-white"> Acerca de ..</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

const submenus = [
  [
    {
      title: "Login",
      target: "/Login",
    },
    {
      title: "Usuarios",
      target: "/Usuario",
    },
    ,
    {
      title: "Registrar",
      target: "/Registrar",
    },
  ],
  [
    {
      title: "Proveedores",
      target: "/Proveedor",
    },
    {
      title: "Productos",
      target: "/Producto",
    },
    {
      title: "Ofertas",
      target: "/Oferta",
    },
    {
      title: "Provincias",
      target: "/Provincia",
    },
    {
      title: "Marcas",
      target: "/Marca",
    },
  ],
];

export default SideBar;
