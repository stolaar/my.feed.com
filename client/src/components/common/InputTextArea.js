import React from 'react'

const InputTextArea = ({
    labelClassName, 
    error,
    placeholder,
    textareaClassName,
    labelValue,
    divClassName,
    onChange,
    textareaValue,
    name}) => {

    return (
        <div className={divClassName}>
            { error ? (<div className='error-text'>{error}</div>) : null }
            <label className={labelClassName}>{labelValue}</label>
            <textarea 
            className={textareaClassName} 
            name={name} 
            rows="7"
            onChange={onChange}
            value={textareaValue}
            placeholder={placeholder}>

            </textarea>
        </div>
    )
}

export default InputTextArea
