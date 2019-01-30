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
        <div className="heading">
            <img src={Avatar} width="40" className="rounded-circle" alt=""/>
            <span className="mr-2">{props.contact ? props.contact.name : ''}</span>
            <i className="fa fa-sign-out fa-2x sign-out" onClick={logout}/>
        </div>
    );
};

export default withRouter(Header);
