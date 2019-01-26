import React from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import Header from "./Header";
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class Messages extends React.Component {

    state = { };

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

    onChange = e => {
        this.setState({message: e.target.value});
    };

    render() {
        return (
            <div>
                <Header contact={this.props.contact} />
                <div id="message-list">
                    {this.props.messages.map(this.renderMessage)}
                </div>
                <div className="reply">
                    <InputGroup>
                        <Input type="textarea" rows="1" onChange={this.onChange} value={this.state.message} placeholder="اكتب رسالتك هنا"/>
                        <InputGroupAddon addonType="append">
                            <Button onClick={this.onSend}><i className="fa fa-send" /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        );
    }

    renderMessage = (message, index) => {
        if (message.receiver === this.props.user.id) {
            return <IncomingMessage key={index} message={message.content} date={message.date} />
        }
        return <OutgoingMessage key={index} message={message.content} date={message.date} />
    };

}

export default Messages;
