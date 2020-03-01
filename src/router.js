import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import ProtectedRoute from './Components/RouteProtection/ProtectedRoute';
import AdminDashboard from './Components/Admin/AdminDashboard'
import ProtectedRouteAdmin from './Components/RouteProtection/ProtectedRouteAdmin';
import ProtectionRoute from './Components/RouteProtection/Protection';


const Router = () => {
    return (
        <Switch>
            <ProtectionRoute exact path="/" component={Auth}/>
            <ProtectedRouteAdmin exact path='/admin' component={AdminDashboard}/>
            <ProtectedRoute exact path="/dashboard/:role" component={Dashboard} />
        </Switch>
    );
}
 
export default Router;