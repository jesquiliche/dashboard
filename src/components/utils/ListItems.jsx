import React from "react";

function ListItems({data,name,value,onChange}) {
  

  return (
    <>
    <select className="form-select py-1" name={name} value={value} onChange={onChange} my-2>
    
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
