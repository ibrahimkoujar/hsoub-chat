import React from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import Header from "./Header";
import { Badge } from "reactstrap";

class Messages extends React.Component {

    state = { };

    /**
     * Change message handler
     * @param e
     */
    onChange = e => {
        this.props.sendType();
        this.setState({message: e.target.value});
    };

    onKeyDown = e => {
        if(e.key === 'Enter' && !e.shiftKey){
            this.onSend();
            e.preventDefault();
        }
    };

    /**
     * Send message handler
     */
    onSend = () => {
        if (!this.state.message || !this.props.contact) return;
        let message = {
            receiver: this.props.contact.id,
            content: this.state.message,
            date: new Date().getTime()
        };
        this.props.sender(message);
        this.setState({message: ''});
    };

    /**
     * Render Page.
     */
    render() {
        return (
            <div>
                <Header contact={this.props.contact} />
                <div id="message-list">
                    {this.props.contact.isTyping ? <Badge id="typing" color="success">يكتب الآن</Badge> : ''}
                    {this.props.messages.map(this.renderMessage)}
                </div>
                <MessageForm message={this.state.message} onChange={this.onChange} onSend={this.onSend} onKeyDown={this.onKeyDown} />
            </div>
        );
    }

    /**
     * Render single message.
     * @param message
     * @param index
     */
    renderMessage = (message, index) => {
        let outgoing = message.receiver !== this.props.user.id;
        return <Message key={index} message={message} outgoing={outgoing}/>
    };

}

export default Messages;
