import React from "react";
import Avatar from "assets/avatar.png";

/**
 * Contacts Header.
 */
const Header = props => (
    <div className="heading">
        <img src={Avatar} width="40" className="rounded-circle" alt="" onClick={props.toggle} />
        <span className="mr-2">جهات الاتصال</span>
        <i className="fa fa-bars heading-icon" onClick={props.toggle}/>
    </div>
);

export default Header;
