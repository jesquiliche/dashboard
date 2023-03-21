import React from "react";

function ListItems({data,name,value,onChange}) {
  

  return (
    <>
    <select className="form-select" name={name} value={value} onChange={onChange}>
    
      {data.map((e) => (
        <option key={e.id} value={e.id}>
          {e.nombre}
        </option>
      ))}
      </select>
    </>
  );
}

export default ListItems;
