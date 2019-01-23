import React from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import Header from "./Header";
import { Input, InputGroup , InputGroupAddon, Button } from 'reactstrap';

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onSendMessage(e){
        if (!this.state.message) return;
        console.log(this.props.contact);
        let message = {
            user_id: this.props.contact.id,
            type: 0,
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
            <div className="text-left">
                <Header contact={this.props.contact} />
                <div className="messages-list">{this.props.messages.map(this.renderMessage)}</div>
                <div className="send-message">
                    <InputGroup>
                        <Input placeholder="اكتب رسالتك هنا" onChange={this.onMessageChange} value={this.state.message} />
                        <InputGroupAddon addonType="append">
                            <Button color="success" onClick={this.onSendMessage}>إرسال</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        );
    }

    renderMessage(message, index){
        if (message.type === 1) {
            return <IncomingMessage key={index} message={message.content} date={message.date} />
        }
        return <OutgoingMessage key={index} message={message.content} date={message.date} />
    }

}

export default Messages;
