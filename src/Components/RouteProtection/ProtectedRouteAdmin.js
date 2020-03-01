import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import { CurrentUserID } from '../../Services/Auth-service';


const ProtectedRouteAdmin = ({path,component:Component,render,...rest }) => {
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
                    if(role==="admin"){
                        return Component? <Component {...props}/>: render(props)
                    }
                }  
            }}>
        </Route>
    );
}
 
export default ProtectedRouteAdmin;