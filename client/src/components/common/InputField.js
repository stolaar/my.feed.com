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
}

InputField.defaultProps = {
    type: "text"
};

export default InputField
