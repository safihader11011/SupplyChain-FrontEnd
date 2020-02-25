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
                .then((user)=>{                
                    return <Redirect to={`/dashboard/${user.role}`}/>
                    // else if(user){
                    //     if(path!==`/dashbaord/${user.role}`){
                    //         if(user.role==='SUPPLIER'){
                    //             return Component? <div><Redirect to={`/dashboard/suppllier`}/></div> :render(props)
                    //         }
                    //         else if(user.role==='transporter'){
                    //             return Component? <div><Redirect to="/transporter"/></div> :render(props)
                    //         }
                    //         else if(user.role==='admin'){
                    //             return Component? <div><Redirect to="/admin"/></div> :render(props)
                    //         }
                    //     }
                    //     else{
                    //         return Component? <Component user={user} {...props}/> :render(props)
                    //     }
                   // }
            })
            .catch(()=>{
                return Component? <Component  {...props}/> :render(props)
            })
                
            }}>
        </Route>
    );
}
 
export default ProtectedRoute;