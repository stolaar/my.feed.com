import React from 'react'

const Selector = ({
    divClassName, 
    error,
    labelClassName, 
    labelValue, 
    selectClassName, 
    selectedVal,
    onChange,
    options,
    name,
    value,
    type}) => {

    const parseOptionsToArray = (options, type) => {
        if (type === 'category')  return options;

        let optionsArray = [];
        for (const [key, value] of Object.entries(options)) {
            optionsArray.push({
                id: key,
                name: value,
            });
        }
    
        return optionsArray;
    }

    const parsedOptions = parseOptionsToArray(options, type);

    return (
        <div className={divClassName}>
            { error ? (<div className='error-text'>{error}</div>) : null }
            <label className={labelClassName}>{labelValue}</label>
            <select 
                className={`form-control ${selectClassName}`} 
                name={name} 
                onChange={onChange}
                value={value}         
            >
                <option value="" defaultValue disabled>{selectedVal}</option>
                {
                   type === 'category' || type === 'country'
                   ? parsedOptions.map((opt) => <option key={opt.id} value={opt.id}>{opt.name}</option>)
                   : null
                }
            </select>
        </div>
    )
}

export default Selector

