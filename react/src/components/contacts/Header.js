import React from "react";
import Avatar from "components/Avatar";

/**
 * Contacts Header.
 */
const Header = props => (
    <div className="heading">
        <Avatar src={props.user.avatar} />
        <span className="mr-2">جهات الاتصال</span>
        <i className="fa fa-bars heading-icon" onClick={props.toggle}/>
    </div>
);

export default Header;
