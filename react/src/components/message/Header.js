import React from "react";
import { withRouter } from "react-router-dom";
import Auth from 'Auth';
import Avatar from "assets/avatar.png";
import moment from "moment";

/**
 * Chat Header.
 */
const Header = props => {

    const logout = () => {
        Auth.logout();
        props.history.push('/');
    };

    const lastSeen = () => {
        let lastSeen = props.contact.status === true ? 'متصل الآن' : moment(props.contact.status).fromNow();
        return <span className="lastseen">{lastSeen}</span>
    };

    return (
        <div className="heading">
            <img src={Avatar} width="40" className="rounded-circle" alt=""/>
            <span className="mr-2">{props.contact ? props.contact.name : ''}</span>
            {lastSeen()}
            <i className="fa fa-sign-out fa-2x sign-out" onClick={logout}/>
        </div>
    );
};

export default withRouter(Header);
