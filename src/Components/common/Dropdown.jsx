import React,{useState} from 'react';
import { FormControl,InputLabel,Select,OutlinedInput,MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const Dropdown = ({id, selectedOption, dense, style, selected, options, placeholder, onChange,disable}) => {	
	const [value, setValue] = useState(selectedOption || '');
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleChange = event => {
		setValue(event.target.value);
		onChange({
			target:{
				id: id,
				value: event.target.value
			}
		})
	}
	
	const classes = useStyles();
    return ( 
        <div>
           	<FormControl variant="outlined" className={classes.formControl}>

				<InputLabel margin={dense ? 'dense' : null} style={style} ref={inputLabel}>
					{placeholder}
				</InputLabel>

				<Select disabled={disable||false} style={style || {textTransform:'capitalize'}} value={value || selected} onChange={handleChange} input={<OutlinedInput labelWidth={labelWidth} />}>
					
					{options.map((option,index) => {
						return (
							<MenuItem key={index} style={style || {textTransform:'capitalize'}} value={option}>{option}</MenuItem>
						)
					})}
					
				</Select>
				
			</FormControl>
        </div>
	);
}
 
export default Dropdown;