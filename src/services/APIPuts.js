import Cookies from "universal-cookie";
import  handleError  from "./HandleErrors.js";


export const putFetchData = async (url, data) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token'); 

    const response = await fetch(url, {
      method: 'PUT',
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
