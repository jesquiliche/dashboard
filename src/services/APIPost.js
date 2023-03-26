import Cookies from "universal-cookie";
import { handleError } from "./HandleErrors.js";


export const postFetchData = async (url, data) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token'); 

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

const FetchOptions = (token) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    if (token) {
      headers.Authorization = `bearer ${token.replace(/['"]+/g, "")}`;
    }
    return {
      method: "POST",
      headers,
    };
  };
