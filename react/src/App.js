import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Chat from './views/Chat';
import Register from './views/Register'
import Login from './views/Login'
import NotFound from './views/NotFound'

import AppRoute from 'AppRoute';
import Auth from 'Auth';

class App extends React.Component {

    constructor(props) {
        super(props);
        Auth.init();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <AppRoute path="/" exact component={Chat} can={Auth.auth} redirect='/login' />
                    <AppRoute path="/login" component={Login} can={Auth.guest} redirect='/' />
                    <AppRoute path="/register" component={Register} can={Auth.guest} redirect='/' />
                    <AppRoute component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
