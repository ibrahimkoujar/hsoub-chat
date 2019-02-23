import React from "react";
import Message from "./Message";

class Messages extends React.Component {

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
        message.outgoing = message.receiver !== this.props.user.id;
        return <Message key={index} message={message} />
    };

}

export default Messages;
