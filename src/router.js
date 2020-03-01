import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import ProtectedRoute from './Components/RouteProtection/ProtectedRoute';
import AdminDashboard from './Components/Admin/AdminDashboard'

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/dashboard/:role" component={Dashboard} />
            <Route exact path='/admin' component={AdminDashboard}/>
        </Switch>
    );
}
 
export default Router;