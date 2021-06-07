import React from 'react'

const Button = ({text, onClick, type, className, disabled}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={ `btn ${className}`}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button
