import React from "react";
import Avatar from "assets/avatar.png";

const Header = props => {
    return ( 
        <div className="row heading">
            <div className="col-2 d-none d-md-block">
                <img src={Avatar} width="40" className="rounded-circle" alt=""/>
            </div>
            <div className="col-10 pt-2">جهات الاتصال</div>
        </div>
    );
};

export default Header;
