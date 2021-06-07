import React from 'react'
import ToastSocialLinks from './toast/ToastSocialLinks'

const InputField = ({
    divClassName, 
    divRelative,
    labelClassName, 
    labelValue, 
    value, 
    onChange, 
    name, 
    inputClassName, 
    type,
    error, 
    toastLinks,
    placeholder, 
    icon, 
    onClickIcon,
    spanIconClassName,
    ref,
    defaultValue,
    disabled=false,
    autocomplete='off' }) => {
    return (
        
        <div className={divClassName}>
            {toastLinks?.showLinks ? <ToastSocialLinks message={toastLinks.message} /> : null}
            { error ? (<div className='error-text'>{error}</div>) : null }
            { labelValue ? <label className={labelClassName}>{labelValue}</label> : null }
            <div className={divRelative}>
            <input 
                className={`form-control ${inputClassName}`}
                onChange={onChange}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                ref={ref}
                defaultValue={defaultValue} 
                disabled={disabled}  
                autoComplete={autocomplete}
            />    
            { icon && <span className={spanIconClassName} onClick={onClickIcon}>{icon}</span> }        
            </div>
        </div>
      
    )
}

InputField.defaultProps = {
    type: "text"
};

export default InputField
