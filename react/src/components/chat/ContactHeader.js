import React from "react";
import Avatar from "components/Avatar";

/**
 * Contacts Header.
 */
const ContactHeader = props => (
    <div className="row align-items-center heading">
        <Avatar src={props.user.avatar} />
        <div>جهات الاتصال</div>
        <div className="mr-auto nav-link" onClick={props.toggle}><i className="fa fa-bars"/></div>
    </div>
);

export default ContactHeader;
