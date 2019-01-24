import React from "react";
import { Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Auth from 'Auth';
import { withRouter } from "react-router-dom";


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout(e){
        Auth.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar color="primary" className="text-white">
                <NavbarBrand>{this.props.contact ? this.props.contact.name : ''}</NavbarBrand>
                <UncontrolledDropdown setActiveFromChild>
                    <DropdownToggle tag="a" className="nav-link">حسابي</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.onLogout}>تسجيل االخروج</DropdownItem>
                    </DropdownMenu>
               </UncontrolledDropdown>
            </Navbar>
        );
    }

}

export default withRouter(Header);
