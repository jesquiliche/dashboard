

function TextField({name,placeholder,value,required=true,onChange}) {
  
    return (
      
      <div className="form-floating my-2 py-2">
          <input
              type="number"
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
  