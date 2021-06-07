import React from 'react'

const InputField = ({
    id,
    divClassName,
    labelClassName,
    labelValue,
    value,
    onChange,
    name,
    inputClassName,
    type,
    error,
    placeholder,
    icon,
    onClickIcon,
    spanIconClassName,
    reference,
    onClick,
    onUpload,
    artwork,
    bonusContent,
    acceptedFileTypes = '',
    multiple = false,
    hasDescription = false}) => {

    return (
        <div className={divClassName}>
        {error ? (
            <div className='error-text'>
            {error}
            </div>
        ) : null}
            <label className={labelClassName}>{labelValue}</label>
            <input
                multiple={multiple}
                id={id}
                type='file'
                ref={reference}
                onChange={onUpload}
                accept={acceptedFileTypes}
                style={{
                    display: 'none',
                }}
            />
            <button
                className={`form-control ${inputClassName}`}
                onChange={onChange}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onClick={onClick}
            >
             { icon && ( <span onClick={onClickIcon}>{icon}</span>) }
            </button>
            {hasDescription ? <span /> : null}
        </div>

    )
}

InputField.defaultProps = {
    type: "text"
};

export default InputField
