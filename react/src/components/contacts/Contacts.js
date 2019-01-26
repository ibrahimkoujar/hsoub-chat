import React from "react";
import Contact from "./Contact";
import Header from "./Header";
import Search from "./Search";

class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = { contacts: this.props.contacts };
        this.onSearch =this.onSearch.bind(this);
    }

    onSearch(e){
        let word = e.target.value;
        this.setState({
            contacts: this.props.contacts.filter(e => e.name.includes(word))
        });
    }

    render(){
        return (
            <div>
                <Header />
                <Search onSearch={this.onSearch} />
                <div className="contact-list">
                    {this.state.contacts.map((contact, index) => this.renderContact(contact, index) )}
                </div>
            </div>
        );
    }

    renderContact(contact, index){
        let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        let lastMessage = messages[messages.length - 1];
        return(
            <div className="contact" key={index} onClick={this.props.chatNavigate.bind(this, contact, index)}>
                <Contact name={contact.name} message={lastMessage} />
            </div>
        );
    }

}

export default Contacts;
