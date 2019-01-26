import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {Chat, Login, Register, NotFound } from 'views';
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
