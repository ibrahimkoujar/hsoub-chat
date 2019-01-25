import React from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import Header from "./Header";
import { Input } from 'reactstrap';

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onSendMessage(e){
        if (!this.state.message || !this.props.contact) return;
        let message = {
            user_id: this.props.contact.id,
            incoming: false,
            content: this.state.message,
            date: new Date().getTime()
        };
        this.props.sender(message);
        this.setState({message: ''});
    }

    onMessageChange(e){
        this.setState({message: e.target.value});
    }

    render() {
        return (
            <div>
                <Header contact={this.props.contact} />
                <div className="message-list">
                    {this.props.messages.map(this.renderMessage)}
                </div>
                <div className="row reply">
                    <div className="col-10 col-md-11">
                        <Input type="textarea" rows="1" onChange={this.onMessageChange} value={this.state.message} placeholder="اكتب رسالتك هنا"/>
                    </div>
                    <div className="col-2  col-md-1 reply-icon">
                        <i className="fa fa-send fa-2x" onClick={this.onSendMessage}></i>
                    </div>
                </div>
            </div>
        );
    }

    renderMessage(message, index){
        if (message.incoming === true) {
            return <IncomingMessage key={index} message={message.content} date={message.date} />
        }
        return <OutgoingMessage key={index} message={message.content} date={message.date} />
    }

}

export default Messages;
