import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({

    inputIcons:{
        cursor: 'pointer',
        color: '#757575'
    },

    autoInput:{

        '& .MuiAutocomplete-inputRoot': {
            height: 71
        },
        
        '& .MuiFormControl-marginNormal':{
            margin:0,
            
        },
    }

});

const AutoSearchBar = ({
    options, 
    onChange,
    labelClassName,
    labelValue,
    divClassName,
    placeholder}) => {

    const classes = useStyles();

    return (
        <div className={divClassName}>
            {labelValue && <label className={labelClassName}>{labelValue}</label>}
            <Autocomplete 
                className={classes.autoInput}
                freeSolo
                disableClearable
                onChange={onChange}
                options={options.length && options.map((option) => option.name)}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        margin="normal"
                        variant="outlined"
                        InputProps={{ 
                            ...params.InputProps, type: 'search',
                                endAdornment:<InputAdornment position="end">
                                    <SearchIcon className={classes.inputIcons} />
                                    <MicIcon className={classes.inputIcons}/>                      
                                </InputAdornment>
                        }}
                        placeholder={placeholder}
                        
                    />
                )}
            />
        </div>
    )
}

AutoSearchBar.defaultProps ={
    options: []
}
export default AutoSearchBar
