import React from 'react'
import TextField from "@material-ui/core/TextField";

const InputField = ({
    labelValue,
    value,
    onChange,
    name,
    type = 'text',
    error, }) => {
    return <div>
        <TextField
            fullWidth={true}
        error={!!error}
        label={labelValue}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        helperText={error}
        variant="outlined"
            margin={'normal'}
    /></div>
    // return (
    //
    //     <div className={divClassName}>
    //         {toastLinks?.showLinks ? <ToastSocialLinks message={toastLinks.message} /> : null}
    //         { error ? (<div className='error-text'>{error}</div>) : null }
    //         { labelValue ? <label className={labelClassName}>{labelValue}</label> : null }
    //         <div className={divRelative}>
    //         <input
    //             className={`form-control ${inputClassName}`}
    //             onChange={onChange}
    //             type={type}
    //             name={name}
    //             value={value}
    //             placeholder={placeholder}
    //             ref={ref}
    //             defaultValue={defaultValue}
    //             disabled={disabled}
    //             autoComplete={autocomplete}
    //         />
    //         { icon && <span className={spanIconClassName} onClick={onClickIcon}>{icon}</span> }
    //         </div>
    //     </div>
    //
    // )
}

InputField.defaultProps = {
    type: "text"
};

export default InputField
