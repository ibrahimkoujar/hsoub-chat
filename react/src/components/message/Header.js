import React from "react";
import Auth from 'Auth';
import { withRouter } from "react-router-dom";
import Avatar from "assets/avatar.png";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout(){
        Auth.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row heading">
                <div className="col-1 d-none d-md-block">
                    <img src={Avatar} width="40" className="rounded-circle" alt=""/>
                </div>
                <div className="col-9 pt-2 pr-0">
                    {this.props.contact ? this.props.contact.name : ''}
                </div>
                <div className="col-2">
                    <i className="fa fa-sign-out fa-2x sign-out" onClick={this.onLogout}/>
                </div>
            </div>

        );
    }

}

export default withRouter(Header);
