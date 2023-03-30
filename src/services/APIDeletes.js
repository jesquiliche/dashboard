import Cookies from "universal-cookie";
import handleError from "./HandleErrors.js";

export const deleteFetchData = async (url, setError) => {
  await fetchData(url, setError);
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
    method: "DELETE",
    headers,
  };
};

const fetchData = async (url, setError) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const options = getFetchOptions(token);
    const response = await fetch(url, options);
    const result = await handleError(response);
    return result;
  } catch (error) {
    setError("No se pudo conectar con el servidor");
  }
};
