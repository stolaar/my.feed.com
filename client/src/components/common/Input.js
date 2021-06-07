import React from 'react'

const Input = ({ 
    value, 
    onChange, 
    name, 
    inputClass, 
    type, 
    placeholder,  }) => {
    return (
        <div>
            <input
                onChange={onChange} 
                type={type} 
                value={value} 
                name={name} 
                className={`form-control ${inputClass}`} 
                placeholder={placeholder} 
            />
        </div>          
               
    )
}

Input.defaultProps = {
    type: "text"
};

export default Input

