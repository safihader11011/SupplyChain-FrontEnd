import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    input:{
        [theme.breakpoints.down("sm")]: {
            maxWidth:"100%"
        }
    }
}));



const Input = ({id, value, type, disabled, label,variant,placeholder, helperText, fullWidth, style, multiline, onChange, ref}) => {


    const classes = useStyles();
    return ( 
            <TextField
                disabled={disabled}
                ref={ref}
                id={id}
                type={type||'value'}
                style={style}
                label={label}
                placeholder={placeholder}
                className={classes.input}
                margin="normal"
                helperText={helperText}
                fullWidth={false || fullWidth}
                multiline={false||multiline}
                variant={variant}
                rows="5"
                onChange={onChange}
                value={value}
            />
     );
}
 
export default Input;