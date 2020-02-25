import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import ProtectedRoute from './Components/RouteProtection/ProtectedRoute';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/dashboard/:role" component={Dashboard} />
        </Switch>
    );
}
 
export default Router;