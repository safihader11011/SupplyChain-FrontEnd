import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import { GetUser } from '../../Services/Auth-service';

import Auth from '../Auth/Auth'


const ProtectedRoute = ({path,component:Component,render,...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={ props => {
                GetUser()
                .then(user=>{
                    if(!user){
                        console.log(user)
                        return <Redirect to="/"/>;
                    }
                    return Component? <Component {...props}/>: render(props)
                    
                })
                .catch(err=>{
                    return <Redirect to='/'/>;
                })  
            }}>
        </Route>
    );
}
 
export default ProtectedRoute;