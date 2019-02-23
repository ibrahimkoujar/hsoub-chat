import React from "react";
import Contact from "./Contact";
import { Row } from 'reactstrap';

class Contacts extends React.Component {

    state = { contacts: this.props.contacts, search: '' };

    /**
     * Render component.
     */
    render(){
        return (
            <Row id="contacts">
                {this.props.contacts.map((contact, index) => this.renderContact(contact, index) )}
            </Row>
        );
    }

    /**
     * Render single contact.
     * @param contact
     * @param index
     */
    renderContact = (contact, index) => {
        if(!contact.name.includes(this.props.search)){
            return;
        }
        let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        let unseen = messages.filter(e => !e.seen && e.sender === contact.id).length;
        let lastMessage = messages[messages.length - 1];
        return(
            <div className="w-100" key={index} onClick={this.props.chatNavigate.bind(this, contact)}>
                <Contact contact={contact} message={lastMessage} unseen={unseen}/>
            </div>
        );
    }

}

export default Contacts;
