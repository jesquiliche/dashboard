import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const inicio = () => {
  const cookies = new Cookies();
  let token;
  token = cookies.get("token");
  if (token === undefined) navigate("/login");
  else navigate("/Tablero");

  return <div>inicio</div>;
};

export default inicio;
