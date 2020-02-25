import React,{useState,useEffect} from "react";
import Input from "../common/Input";
import Error from '../common/Error';
//import { Helmet } from "react-helmet";
import { Grid, Divider, Typography } from "@material-ui/core";
import ButtonComponent from "../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import Joi from 'joi-browser';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SignUP} from '../../Services/Auth-service'


const useStyles = makeStyles(theme => ({
  marg: {
    marginTop: theme.spacing(3)
  },
  p:{
    fontWeight:900,
    fontSize:20,
    [theme.breakpoints.up("sm")]:{
      paddingLeft:theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]:{
      paddingLeft:theme.spacing(4),
    },
  },
  image:{
    height:120,
    width:"auto",
    padding:theme.spacing(5)

  },
  formControl: {
    margin: theme.spacing(1),
    width:"100%"
  },
  wid:{
    width:350
  }
}));

const Signup = ({setLoading}) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const inputLabel = React.useRef(null);


  const schema = {
    name:Joi.string().label('Name').required(),
    phone:Joi.string().label('Phone').required(),
    email: Joi.string().email().label('Email').required(),
    role: Joi.string().label('Role').required(),
    password: Joi.string().label('Password').required()
  }


  const onChange1 = event => {
      
    const { name, value } = event.target;
    const temp = data;
    temp[name] = value;
    setData(temp);
  };

  const validate = () => {
    const result = Joi.validate(data, schema, {abortEarly:false});
  
    if(!result.error) return null;
  
    const newError = {};
    result.error.details.map(err => {
      return newError[err.path[0]] = err.message;
    });

    return newError;   
    }

  const onChange = event => {
    const { id, value } = event.target;
    const temp = data;
    temp[id] = value;
    setData(temp);
  };

  useEffect(()=>{
    if(!error){
      handleSignup()
    }
  },[error])

  const handleClick=()=>{
    setError(validate())   
  }
    
  const handleSignup = async() => {
      setLoading(true)
      const temp=data
      temp['blockchains']=[]
      setData(temp)
      const res=await SignUP(data)
      if(res){
        window.open(`dashboard/${res}`,'_self')
      }
      else{
        setLoading(false)
      }

  }

  const classes = useStyles();  
  return (
    <Grid container className={classes.marg} justify="center" alignItems='center' direction="column" >

      {/* <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up" />
      </Helmet> */}

      <Grid container justify="center" direction="row">
        <img className={classes.image} alt="Logo" src={require("../assets/icon.jpeg")}/>   
      </Grid>

    
      <Grid container justify="center" className={classes.wid} direction="column" alignItems="center">
        <Input variant="outlined" style={{width:'100%'}} id="name" label="Full Name" placeholder="Full Name" onChange={onChange}/>
        {error && error.name && <Error text={error.name}/>}
        
        <Input variant="outlined" style={{width:'100%'}} id="email" label="Email" placeholder="Email" onChange={onChange}/>
        {error && error.email && <Error text={error.email}/>}

        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Role
            </InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            name="role"
            //value={axles}
            //onChange={(event)=>handleChange(event,setAxles)}
            onChange={onChange1}
            id="role"
            
            // labelWidth={labelWidth}
            >
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="Transporter">Transporter</MenuItem>
            <MenuItem value="Retailer">Retailer</MenuItem>
            <MenuItem value="Consumer">Consumer</MenuItem>
            </Select>
        </FormControl>

        {error && error.role && <Error text={error.role}/>}

        <Input variant="outlined" style={{width:'100%'}} id="phone" label="Contact" placeholder="Contact" onChange={onChange}/>
        {error && error.phone && <Error text="Contact is Required. Format (03XX-XXXXXXX)"/>}
        
        <Input variant="outlined" style={{width:'100%'}} id="password" type='password' label="Password" placeholder="Password" onChange={onChange}/>
        {error && error.password && <Error text={error.password}/>}
      </Grid>
      <Grid container justify="center" direction="column" alignItems="center">
        {error && error.invalid && <Error text={error.invalid}/>}
        <ButtonComponent styles={{width:120,paddingTop:10,paddingBottom:10}} onClick={()=>handleClick()} variant="contained" color="primary">
          Register 
        </ButtonComponent>
      </Grid>

      {/* <Grid container direction="row" alignItems="center" xs={12}>
        <Grid xs={5}>
          <Divider variant="middle"/>
        </Grid>
        <Grid style={{display:"inline-block"}} container direction="row" justify="center" xs={2}>
          <p style={{display:"inline-block"}} className={classes.p}>OR</p> 
        </Grid>
        <Grid xs={5}>
          <Divider  variant="middle"/>
        </Grid>
      </Grid>

      <Grid container justify="center" direction="row">
        <a href='http://localhost:4000/auth/google' style={{textDecoration:'none'}}>
          <ButtonComponent styles={{width:350,background:"#DD4B39",color:"white"}} variant="outlined" color="secondary">
            signup With Google
          </ButtonComponent>
        </a>
      </Grid>

      <Grid container justify="center" direction="row">
        <a href='http://localhost:4000/auth/facebook' style={{textDecoration:'none'}}>
          <ButtonComponent styles={{width:350,background:"#3b5998",color:"white"}} variant="outlined" color="primary">
            signup With Facebook
          </ButtonComponent>
        </a>
      </Grid> */}
    </Grid>
  );
};

export default Signup;
