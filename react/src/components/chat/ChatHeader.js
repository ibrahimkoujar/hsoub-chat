import React from "react";
import { withRouter } from "react-router-dom";
import Auth from 'Auth';
import Avatar from "components/Avatar";
import moment from "moment";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";

/**
 * Chat Header.
 */
const ChatHeader = props => {

    const logout = () => {
        Auth.logout();
        props.history.push('/');
    };

    const lastSeen = () => {
        return props.contact.status === true ? 'متصل الآن' : moment(props.contact.status).fromNow();
    };

    return (
        <div className="row align-items-center heading m-0 w-100">
            <Avatar src={props.contact.avatar}/>
            <div className="text-right">
                <div>{props.contact ? props.contact.name : ''}</div>
                <small>{props.contact.isTyping ? 'يكتب الآن' : lastSeen()}</small>
            </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={logout}>تسجيل الخروج</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </div>
    );
};

export default withRouter(ChatHeader);
