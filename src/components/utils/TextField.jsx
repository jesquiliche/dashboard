

function TextField({name,placeholder,value,required=true,onChange}) {
  
  return (
    
    <div className="form-floating my-2 py-1">
        <input
            type="text"
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}  
            required={required}
            onChange={onChange}
        />
        <label for="nombre">{name}</label>
    </div>
      
    
  )
}

export default TextField
