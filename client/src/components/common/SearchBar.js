import React from 'react'

const SearchBar = ({
    divClassName,
    type,
    inputClassName,
    labelValue,
    labelClassName,
    btnClassName, 
    placeholder,
    input,
    setInput}) => {

    return (
        <div className={`input-group ${divClassName}`}>
            {labelValue && <label className={labelClassName}>{labelValue}</label>}
            <input 
                type={type} 
                className={`form-control ${inputClassName}`} 
                placeholder={placeholder} 
                onChange={setInput}
                value={input}
            />
            <span className={btnClassName}><i className="fas fa-search"></i></span>
            <span className={btnClassName}><i className="fas fa-microphone"></i></span>
      </div>
    )

}

export default SearchBar
