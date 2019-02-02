import React from "react";
import Message from "./Message";

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
            <div id="messages">
                {this.props.messages.map(this.renderMessage)}
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
