import React,{useState}  from "react";
import Input from "../common/Input";
import Error from '../common/Error';
import {Link} from 'react-router-dom'
import { Grid,Divider } from "@material-ui/core";
import ButtonComponent from "../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import Joi from 'joi-browser';

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
    height:50,
    width:250,
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

const Login = () => {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const schema = {
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required()
  }

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
    
  const handleLogin = event => {
      console.log(data)
      setError(validate()) 
  }

  return (
    <Grid container className={classes.marg} justify="center" direction="column">

      {/* <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet> */}

      <Grid container justify="center" direction="row">
        <img className={classes.image} alt="Logo" src={require("../assets/icon.jpg")}/>   
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

      <Grid container  justify="center" direction="row">
        <Link className={classes.padd} to="/forgetpassword">Forget password?</Link>
      </Grid>

      <Grid container  justify="center" direction="column" alignItems="center">
        {error && error.invalid && <Error text={error.invalid}/>}
        <ButtonComponent styles={{width:120,paddingTop:10,paddingBottom:10}} onClick={handleLogin} variant="contained" color="primary">Login</ButtonComponent>
      </Grid>

      <Grid container direction="row" alignItems="center" xs={12}>
        <Grid xs={5}>
          <Divider variant="middle"/>
        </Grid>
        <Grid style={{display:"inline-block"}} container direction="row" justify="center" xs={2}>
          <p style={{display:"inline-block"}} className={classes.p}>OR</p> 
        </Grid>
        <Grid xs={5}>
          <Divider variant="middle"/>
        </Grid>
      </Grid>
      
      
      <Grid container justify="center" direction="row">
        <a href='http://localhost:4000/auth/google' style={{textDecoration:'none'}}>
          <ButtonComponent styles={{width:350,background:"#DD4B39",color:"white"}} variant="contained" >
            signup With Google
          </ButtonComponent>
        </a>
      </Grid>

      <Grid container justify="center" direction="row">
        <a href='http://localhost:4000/auth/facebook' style={{textDecoration:'none'}}>
          <ButtonComponent styles={{width:350 ,background:"#3b5998",color:"white"}} variant="contained" color="primary">
            signup With Facebook
          </ButtonComponent>
        </a>
      </Grid>
    </Grid>
  );
};

export default Login;
