import React from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import Header from "./Header";

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
                    {this.props.contact.isTyping ? <p id="typing">يكتب الآن</p> : ''}
                    {this.props.messages.map(this.renderMessage)}
                </div>
                <MessageForm message={this.state.message} onChange={this.onChange} onSend={this.onSend} />
            </div>
        );
    }

    /**
     * Render single message.
     * @param message
     * @param index
     */
    renderMessage = (message, index) => {
        let outgoing = message.receiver === this.props.user.id;
        return <Message key={index} message={message.content} date={message.date} outgoing={outgoing}/>
    };

}

export default Messages;
