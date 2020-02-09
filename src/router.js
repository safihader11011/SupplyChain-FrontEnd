import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Quiz from './Components/Quiz'

const Router = () => {
    return (

        <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path='/quiz' component={Quiz}/>
        </Switch>
    );
}
 
export default Router;