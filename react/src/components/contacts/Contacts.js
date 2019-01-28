import React from "react";
import Contact from "./Contact";
import Header from "./Header";
import Search from "./Search";

class Contacts extends React.Component {

    state = { contacts: this.props.contacts, search: '' };

    /**
     * Contacts search handler.
     * @param e
     */
    onSearch = e => this.setState({search: e.target.value});

    /**
     * Render component.
     */
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

    /**
     * Render single contact.
     * @param contact
     * @param index
     */
    renderContact = (contact, index) => {
        if(!contact.name.includes(this.state.search)){
            return;
        }
        let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        let unseen = messages.filter(e => !e.seen && e.sender === contact.id).length;
        let lastMessage = messages[messages.length - 1];
        return(
            <div className="contact" key={index} onClick={this.props.chatNavigate.bind(this, contact)}>
                <Contact contact={contact} message={lastMessage} unseen={unseen}/>
            </div>
        );
    }

}

export default Contacts;
