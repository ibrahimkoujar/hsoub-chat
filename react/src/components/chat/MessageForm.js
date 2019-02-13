import React from "react";
import { Input } from "reactstrap";
import moment from "moment";

class MessageForm extends React.Component {

    state = { lastType: false };

    /**
     * Change message handler
     * @param e
     */
    onChange = e => {
        let lastType = this.state.lastType;
        if(!lastType || moment() - lastType > 2000){
            this.setState({lastType: moment()});
            this.props.sendType();
        }
        this.setState({message: e.target.value});
    };

    onKeyDown = e => {
        if(e.key === 'Enter' && !e.shiftKey){
            this.setState({lastType: false});
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
            <div id="send-message">
                <Input type="textarea" rows="1" onKeyDown={this.onKeyDown} onChange={this.onChange} value={this.state.message} placeholder="اكتب رسالتك هنا"/>
                <i className="fa fa-send text-muted px-3 send" onClick={this.onSend}/>
            </div>
        );
    }

}

export default MessageForm;
