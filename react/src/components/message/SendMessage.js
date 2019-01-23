import React from "react";
import { Input, InputGroup , InputGroupAddon, Button } from 'reactstrap';


class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onSendMessage(e){
        if (!this.state.message) return;
        this.props.messageSender(this.state.message);
        this.setState({message: ''});
    }

    onMessageChange(e){
        this.setState({message: e.target.value});
    }

    render(){
        return (
            <div className="send-message">
                <InputGroup>
                    <Input placeholder="Type a message" onChange={this.onMessageChange} value={this.state.message} autoFocus />
                    <InputGroupAddon addonType="append">
                        <Button color="success" onClick={this.onSendMessage}>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}
export default SendMessage;
