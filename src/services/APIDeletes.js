export const deleteFetchData = async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Ha ocurrido un error al intentar eliminar el producto");
    }
  };
  