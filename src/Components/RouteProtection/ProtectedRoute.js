import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import { CurrentUserID } from '../../Services/Auth-service';

import Auth from '../Auth/Auth'


const ProtectedRoute = ({path,component:Component,render,...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={ props => {
                const role=CurrentUserID()
                if(!role){
                    return <Redirect to="/"/>;
                }
                else{
                    if(role==='admin'){
                        return <Redirect to="/"/>;
                    }
                    if(props.match.params.role!==role){   
                        return <Redirect to={`/dashboard/${role}`}/>
                    }
                    return Component? <Component {...props}/>: render(props)
                }  
            }}>
        </Route>
    );
}
 
export default ProtectedRoute;