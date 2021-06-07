import React, { Fragment } from 'react'

const OptionsSelect = ({ value, optColor}) => {
    return (
        <Fragment>          
            { <option value={value} style={{color: optColor}} >{value}</option> } 
        </Fragment>
    )
}

export default OptionsSelect
