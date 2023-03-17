import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserProvider";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useContext(UserContext);

  const handleLogout = () => {
    // Borramos la cookie "token"
    const cookies = new Cookies();
    cookies.remove("token");
    
    // Llamamos a la función signOut del contexto para actualizar el estado del usuario
    signOut();

    // Redireccionamos al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
