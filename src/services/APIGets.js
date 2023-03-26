import Cookies from "universal-cookie";
import handleError from "./HandleErrors.js";

export const obtenerProducto = async (id, setProducto, setError) => {
    const url=`http://localhost:8000/api/v1/productos/${id}`;
    const res=await fetchData(url, setError);
    const data=await res.json();
    setProducto(data);    

};

export const getFetchData = async (url,setData, setError) => {
  const res=await fetchData(url, setError);
  const data=await res.json();
  setData(data);    
};


const getFetchOptions = (token) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (token) {
    headers.Authorization = `bearer ${token.replace(/['"]+/g, "")}`;
  }
  return {
    method: "GET",
    headers,
  };
};


const fetchData = async (url, setError) => {
  try{
    const cookies = new Cookies();
    const token = cookies.get("token");
    const options=getFetchOptions(token);
    const response = await fetch(url, options);
    const result = await handleError(response);
    return result;
  }catch(error){
    setError("No se pudo conectar con el servidor");
  }
};