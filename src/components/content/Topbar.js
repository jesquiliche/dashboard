import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const { user } = useContext(UserContext);

  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => (user ? setTopbarOpen(!topbarIsOpen) : false);

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-lg p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      
      <h2>
        <span>
          <b className="text-primary"> ECOMMERCE</b>
        </span>
        <i> Manager</i>
      </h2>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={"/page-1"}>
              {user ? "CONECTADO" : "NO CONECTADO"}
            </NavLink>
          </NavItem>
         
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
