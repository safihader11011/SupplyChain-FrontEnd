import React,{useState}  from "react";
import Input from "../common/Input";
import Error from '../common/Error';
import {Link} from 'react-router-dom'
import { Grid,Divider } from "@material-ui/core";
import ButtonComponent from "../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import Joi from 'joi-browser';
import {LOGIN} from '../../Services/Auth-service'
import { useEffect } from "react";
//import { Helmet } from "react-helmet";


const useStyles = makeStyles(theme => ({
  marg: {
    display:"block"
      },
  p:{
    fontWeight:900,
    fontSize:20,
    [theme.breakpoints.up("sm")]:{
      paddingLeft:theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]:{
      paddingLeft:theme.spacing(4),
    }
  },
  image:{
    height:120,
    width:"auto",
    padding:theme.spacing(5)

  },
  padd:{
    margin:0,
    padding:0
  },
  wid:{
    width:350
  }
}));

const Login = ({setLoading}) => {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const schema = {
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required()
  }

  useEffect(()=>{
    if(!error){
      handleLogin()
    }
  },[error])

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

  const handleSignIn=()=>{
    setError(validate())  
  }
    
  const handleLogin = async() => {
      //console.log(data)
      setLoading(true) 
      const res=await LOGIN(data)
      if(res){
        window.open(`/dashboard/${res}`,'_self')
      }
      else{
        console.log("false")
        setLoading(false)
        setError({exist:"User Already Exist"})
      }
  }

  return (
      <Grid container className={classes.marg} justify="center" direction="column">
        <Grid container justify="center" direction="row">
          <img className={classes.image} alt="Logo" src={require("../assets/icon.jpeg")}/>   
        </Grid>
        <Grid container justify="center" direction="row">
          <Grid container justify="center" className={classes.wid} direction="row">
            <Input id="email" variant="outlined" style={{width:"100%"}} label="Email" placeholder="Email" onChange={onChange} />
            {error && (error.email) && <Error text='Enter a valid Email'/>}
          </Grid>
          <Grid container justify="center" className={classes.wid} direction="row">
            <Input id="password" variant="outlined" style={{width:"100%"}} type='password' label="Password" placeholder="Password" onChange={onChange}/>
            {error && error.password && <Error text={error.password}/>}
          </Grid>
        </Grid>
        <Grid container  justify="center" direction="column" alignItems="center">
          {error && error.invalid && <Error text={error.invalid}/>}
          <ButtonComponent styles={{width:120,paddingTop:10,paddingBottom:10}} onClick={handleSignIn} variant="contained" color="primary">Login</ButtonComponent>
        </Grid>
        {error && error.exist && <Error text={error.exist}/>}
      </Grid>
  );
};

export default Login;
