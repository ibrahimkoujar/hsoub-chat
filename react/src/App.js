import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Chat, Login, Register, NotFound, Password } from 'views';
import AppRoute from 'AppRoute';
import Auth from 'Auth';

class App extends React.Component {

    constructor(props) {
        super(props);
        Auth.init();
    }

    render() {
        return (
            <div className="container-fluid" id="main-container">
                <Router>
                    <Switch>
                        <AppRoute path="/" exact component={Chat} can={Auth.auth} redirect='/login' />
                        <AppRoute path="/password" component={Password} can={Auth.auth} redirect='/login' />
                        <AppRoute path="/login" component={Login} can={Auth.guest} redirect='/' />
                        <AppRoute path="/register" component={Register} can={Auth.guest} redirect='/' />
                        <AppRoute component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
