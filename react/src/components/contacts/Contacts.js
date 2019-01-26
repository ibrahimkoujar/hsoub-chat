import React from "react";
import Contact from "./Contact";
import Header from "./Header";
import Search from "./Search";

class Contacts extends React.Component {

    state = { contacts: this.props.contacts, search: '' };

    onSearch = e => {
        let search = e.target.value;
        this.setState({search});
    };

    render(){
        return (
            <div>
                <Header />
                <Search onSearch={this.onSearch} />
                <div className="contact-list">
                    {this.props.contacts.map((contact, index) => this.renderContact(contact, index) )}
                </div>
            </div>
        );
    }

    renderContact = (contact, index) => {
        if(!contact.name.includes(this.state.search)){
            return;
        }
        let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        let lastMessage = messages[messages.length - 1];
        return(
            <div className="contact" key={index} onClick={this.props.chatNavigate.bind(this, contact)}>
                <Contact name={contact.name} message={lastMessage} />
            </div>
        );
    }

}

export default Contacts;
