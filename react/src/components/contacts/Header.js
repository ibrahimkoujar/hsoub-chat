import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = props => {
    return (
        <Navbar color="primary" className="text-white">
            <NavbarBrand>جهات الاتصال</NavbarBrand>
        </Navbar>
    );
};

export default Header;
