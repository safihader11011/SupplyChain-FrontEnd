import React, { useState,useEffect } from "react";
import Signup from "./Signup";
//import DocumentMeta from 'react-document-meta';
import Login from "./Login";
import Loader from '../common/Loader'
//import Loader from '../common/Loader';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link,Hidden } from "@material-ui/core";
// import { GraphQL } from '../../config/fetch';
// import Joi from 'joi-browser';
// import queryString from 'query-string';
// import Header from '../Home/Header'
// import HeaderMobile from '../Home/HeaderMobile'



const useStyles = makeStyles(theme => ({
	Grid: {
		fontFamily:"'Barlow Semi Condensed', sans-serif", 
		margin: "0px",
		padding: "0px",
		height:"100vh",
		[theme.breakpoints.up("xs")]: {
			display: "block"
		},
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		}
	},
	Image: {
		height:"100%",
		width:"100%",
		margin: "0px",
		padding: "0px",
		[theme.breakpoints.down("xs")]: {
			display: "none"
		}
	},
	center:{
		textAlign:'center',
		marginBottom: theme.spacing(8)
	},
	font:{
		padding:theme.spacing(0),
		
	},
	height:{
		//height:"100vh",
	}
}));

const Auth = (props) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(true);
	const [signUp, setSignUp] = useState(false);
	const [data,setData] = useState({});
	const [error,setError] = useState({});
	
	// const loginEmailSchema = {
	// 	email: Joi.string().email().label('Email or Phone').required(),
	// 	password: Joi.string().label('Password').required()
	// }

	// const loginPhoneSchema = {
	// 	phone: Joi.string().regex(/^[0][0-9]{10}$/).label('Email or Phone').required(),
	// 	password: Joi.string().label('Password').required()
	// }

	// const signupSchema = {
	// 	displayName: Joi.string().label('Name').required(),
	// 	email: Joi.string().email().label('Email').required(),
	// 	phone: Joi.string().regex(/^[0][0-9]{10}$/).label('Contact').required(),
	// 	password: Joi.string().label('Password').required()
	// }
	
	// const validate = (schema) => {
	// 	const result = Joi.validate(data, schema, {abortEarly:false});
	
	// 	if(!result.error) return null;
	
	// 	const newError = {};
	// 	result.error.details.map(err => {
	// 		return newError[err.path[0]] = err.message;
	// 	});
	// 	return newError;   
	// }

	// const handleChange = event => {
	// 	const { id,value } = event.target;
	// 	const temp = data;
	// 	if (id==='userName') {
	// 		if(value.includes('@')){
	// 			temp['email'] = value;
	// 			if(temp.phone) delete temp['phone'];
	// 			setData(temp);
	// 		}else{
	// 			temp['phone'] = value;
	// 			if(temp.email) delete temp['email'];
	// 			setData(temp);
	// 		}
	// 	}else{
	// 		temp[id] = value;
	// 		setData(temp);
	// 	}
	// 	if (id==='email') CheckEmailAvailibility({ email:value })
	// 	if (id==='phone') CheckPhoneAvailibility({ phone:value })
	// };

	// const LoginRequest = () => {
	// 	setLoading(true);
	// 	let email = null;
	// 	let phone = null;
	// 	const { password } = data;
	// 	if(data.email) email = data.email;
	// 	if(data.phone) phone = data.phone;

	// 	const query = `
	// 		mutation LogIn(${email ? '$email: String!' : ''} ${phone ? '$phone: String!' : ''} $password: String!) {
	// 			Login(${email ? 'email:$email' : ''} ${phone ? 'phone:$phone' : ''} password:$password){
	// 				displayName
	// 			}
	// 		}
	// 	`;
	// 	const variables = { email, phone, password };
	// 	GraphQL(query, variables).then(res => {
	// 		if (res.Login) {
	// 			if (props.location.state) {
	// 				window.open(props.location.state.from.pathname, '_self')
	// 			}else{
	// 				window.open('/', '_self');
	// 			}
	// 		}else{
	// 			setLoading(false);
	// 			setError({ invalid: 'Invalid Credentials' });
	// 		}
	// 	});
	// }
	
	// const handleLogin = event => {
		
	// 	if(data.email) {
	// 		setError(validate(loginEmailSchema))
	// 	}else {
	// 		setError(validate(loginPhoneSchema));
	// 	}
		
	// }

	// const SignupRequest = () => {
	// 	setLoading(true);
	// 	const { displayName, phone, email, password } = data;
	// 	const query = `
	// 		mutation SignUp($displayName: String! $phone: String! $email: String! $password: String!) {
	// 			Signup(displayName:$displayName phone:$phone email:$email password:$password) {
	// 			displayName
	// 			}
	// 		}
	// 	`;
	// 	const variables = { displayName, phone, email, password };
	// 	GraphQL(query, variables).then(res => {
	// 		if (res.Signup) {
	// 			if (props.location.state) {
	// 				window.open(props.location.state.from.pathname, '_self')
	// 			}else{
	// 				window.open('/', '_self');
	// 			}
	// 		}else{
	// 			setLoading(false);
	// 			setError({ invalid: res.error });
	// 		}
	// 	});
	// }
	
	// const handleSignup = event => {
	// 	setError(validate(signupSchema));
	// }

	// const CheckEmailAvailibility = ({ email }) => {
	// 	const query = `
	// 		mutation CheckAvailibility( $email: String! ) {
	// 			CheckEmailAvailibility( email:$email )
	// 		}
	// 	`;
	// 	const variables = { email };
	// 	GraphQL(query, variables).then(res => {
	// 		if (res.CheckEmailAvailibility===false) {
	// 			setError({ email:'Already in use.' })
	// 		}
	// 	});
	// }

	// const CheckPhoneAvailibility = ({ phone }) => {
	// 	const query = `
	// 		mutation CheckAvailibility( $phone: String! ) {
	// 			CheckPhoneAvailibility( phone:$phone )
	// 		}
	// 	`;
	// 	const variables = { phone };
	// 	GraphQL(query, variables).then(res => {
	// 		if (res.CheckPhoneAvailibility===false) {
	// 			setError({ phone:'Already in use.' })
	// 		}
	// 	});
	// }

	// const CheckUser = () => {
	// 	const query = `
	// 		query {
	// 			CurrentUser {
	// 				displayName
	// 				email
	// 			}
	// 		}
	// 	`;
	// 	GraphQL(query, null).then(data => {
	// 		if (data.CurrentUser) {
	// 			window.open('/', '_self');
	// 		}else{
	// 			setUser(false);
	// 			setLoading(false);
	// 		}
	// 	});
	// }

	// const SettingInitialState = () => {
	// 	const { location } = props;

	// 	const result = queryString.parse(location.search);
		
	// 	if (result.login) return; 
	// 	if (result.signup) setSignUp(true);
		
	// }
	
	// useEffect(() => {
	// 	console.log(error)
	// 	if (user) CheckUser();
	// 	if (!signUp) SettingInitialState();

	// 	if (signUp && data.displayName && data.email && data.phone && data.password && !error) SignupRequest()
	// 	if (!signUp && (data.email || data.phone) && data.password && !error) LoginRequest();
	  
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [error]);

  	const classes = useStyles();
	return (
		<div>
			{
				loading?
				<Loader/>
				:
			<div className={classes.height}>
				{/* <Hidden smUp>
					<HeaderMobile props={props}/>
				</Hidden> */}
				{/* {loading ?
					<Loader />
				: */}
					<Grid className={classes.Grid} container direction="row">
						<Grid  sm={8}>
						{/* eslint-disable-next-line */}
							<img
								className={classes.Image}
								src={require("../assets/logo.png")}
								alt="Logo"
							/>
						</Grid>
						<Grid container sm={4} xs={12}>
						{signUp === false ? (
							<Grid container direction="row" justify="center" alignItems="center">
								<Login style={{padding:"0px",margin:"0px"}} setLoading={setLoading}/>
								Haven't Signup yet?<Link style={{cursor:'pointer'}} onClick={() => {setData({}); setError({}); setSignUp(true);}}>Sign Up</Link>				
							</Grid>
						) : (
							<Grid container direction="row" justify="center" alignItems="center">
								<Signup setLoading={setLoading}/>
								<div className={classes.center}> 
									Already Signup? 
									<Link style={{cursor:'pointer'}} onClick={() => {setData({}); setError({}); setSignUp(false);}}>Login</Link>
								</div>
							</Grid>
						)}
						</Grid>
					</Grid>
				
			</div>
			}
			</div>
	);
};

export default Auth;
