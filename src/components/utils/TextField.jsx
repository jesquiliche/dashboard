import React from 'react'

function TextField({name,placeholder,value}) {
  return (
    
    <div className="form-floating py-1">
        <input
            type="text"
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
        />
        <label for="nombre">{name}</label>
    </div>
      
    
  )
}

export default TextField
