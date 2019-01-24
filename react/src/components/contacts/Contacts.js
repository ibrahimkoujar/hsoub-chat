import React from "react";
import Contact from "./Contact";
import Header from "./Header";

class Contacts extends React.Component {

    render(){
        return (
            <div className="contact-list text-left">
                <Header />
                <div className="contacts">
                    {this.props.contacts.map((contact, index) => this.renderContact(contact, index) )}
                </div>
            </div>
        );
    }

    renderContact(contact, index){
        let messages = this.props.messages.filter(e => e.user_id === contact.id);
        let lastMessage = messages[messages.length - 1];
        return(
            <div key={index} onClick={this.props.chatNavigate.bind(this, contact, index)}>
                <Contact name={contact.name} message={lastMessage} />
            </div>
        );
    }

}

export default Contacts;
