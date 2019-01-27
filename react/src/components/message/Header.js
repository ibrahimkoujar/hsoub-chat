import React from "react";
import { withRouter } from "react-router-dom";
import Auth from 'Auth';
import Avatar from "assets/avatar.png";

/**
 * Chat Header.
 */
const Header = props => {

    const logout = () => {
        Auth.logout();
        props.history.push('/');
    };

    return (
        <div className="row heading">
            <div className="col-1 d-none d-md-block">
                <img src={Avatar} width="40" className="rounded-circle" alt=""/>
            </div>
            <div className="col-9 pt-2 pr-0">
                {props.contact ? props.contact.name : ''}
            </div>
            <div className="col-2">
                <i className="fa fa-sign-out fa-2x sign-out" onClick={logout}/>
            </div>
        </div>
    );
};

export default withRouter(Header);
