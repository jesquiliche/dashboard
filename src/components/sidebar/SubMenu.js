import React, { useState } from "react";
import { Collapse, NavItem, NavLink, Container, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <NavItem onClick={toggle} className={`menu-open ${!collapsed && "active"}`}>
        <NavLink className="dropdown-toggle d-inline-flex align-items-center">
          <FontAwesomeIcon
            icon={icon}
            className="ml-2 text-white d-inline-flex align-items-center"
          />
          <a className="mx-1 text-white">{title}</a>
        </NavLink>
      </NavItem>
      <Collapse isOpen={!collapsed} navbar className={`items-menu mb-1 ${collapsed ? "" : "active"}`}>
        <Container>
          <Card className="ml-2 mr-3 submenu">
            {items.map((item, index) => (
              <NavItem key={index} className="pl-1">
                <NavLink tag={Link} to={item.target}>
                  <span className="text-white">{item.title} </span>
                </NavLink>
              </NavItem>
            ))}
          </Card>
        </Container>
      </Collapse>
    </div>
  );
};

export default SubMenu;
