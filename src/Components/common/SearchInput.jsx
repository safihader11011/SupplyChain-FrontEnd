import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '../../assets/icons/search.png';



const useStyles = makeStyles(theme => ({
    input: {
        width: '100%'
    },
    icon: {
        height: 26,
        width: 26,
    },
    iconWrapper: {
        marginTop: '-50px',
        marginLeft: '90%'
    }
}));



const Input = ({id,value,type,disabled,label,placeholder,helperText,fullWidth,styles,multiline,handleChange,ref}) => {


    const classes = useStyles();
    return ( 
        <div style={{width:'100%'}}>
            <TextField
                disabled={disabled}
                ref={ref}
                id={id}
                style={styles}
                inputProps={{ style:{ paddingRight:50 } }}
                label={label}
                placeholder={placeholder}
                className={classes.input}
                margin="normal"
                helperText={helperText}
                fullWidth={false || fullWidth}
                variant="outlined"
                multiline={false||multiline}
                rows="5"
                onChange={handleChange}
                type={type}
                value={value}
            />
            <div className={classes.iconWrapper}>
                <img src={SearchIcon} className={classes.icon} />
            </div>
        </div>
    );
}
 
export default Input;