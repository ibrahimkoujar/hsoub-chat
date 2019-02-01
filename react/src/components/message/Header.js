import React from "react";
import { withRouter } from "react-router-dom";
import Auth from 'Auth';
import Avatar from "components/Avatar";
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
            <Avatar src={props.contact.avatar}/>
            <span className="mr-2">{props.contact ? props.contact.name : ''}</span>
            {lastSeen()}
            <i className="fa fa-sign-out fa-2x sign-out" onClick={logout}/>
        </div>
    );
};

export default withRouter(Header);
