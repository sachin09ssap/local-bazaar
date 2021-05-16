import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import Signin from './user/Signin'
import Signout from './user/Signout'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/user/dashboard" component={UserDashboard}/>
                <Route path="/signout" component={Signout}/>
            </Switch>
        </Router>
    )
}
