import React from "react";
import { Spinner } from 'reactstrap';
import Contacts from 'components/contacts/Contacts'
import Messages from 'components/message/Messages'
import socketIOClient from 'socket.io-client'
import axios from 'axios';
import Auth from 'Auth';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Auth.getUser()
        };
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onChatNavigate = this.onChatNavigate.bind(this);
        this.onNewMessage = this.onNewMessage.bind(this);
        this.onSentMessage = this.onSentMessage.bind(this);
    }

    componentDidMount(){
        let socket = socketIOClient(process.env.REACT_APP_SOCKET, {query: "token=" + Auth.getToken()});
        socket.on("connect", () => this.setState({connected: true}));
        socket.on("disconnect", () =>this.setState({connected: false}));
        socket.on("message", this.onNewMessage);
        socket.on("sent_message", this.onSentMessage);
        this.setState({socket});
        this.init();
    }

    componentWillUnmount(){
        this.state.socket.disconnect();
    }

    init(){
        axios.get('/message').then(res => {
            this.setState({messages: res.data});
        })
        .catch(err => {
        })
        axios.get('/user').then(res => {
            this.setState({contacts: res.data});
        })
        .catch(err => {
        })
    }

    onNewMessage(message){
        message.incoming = true;
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    }

    onSentMessage(message){
        message.incoming = false;
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    }

    onSendMessage(message){
        let messages = this.state.messages.concat(message);
        this.setState({messages});
        this.state.socket.emit('message', message);
    }

    onChatNavigate(contact, index, event){
        this.setState({contact: contact});
    }

    render(){
        if(!this.state.connected || !this.state.contacts || !this.state.messages){
            return (<Spinner id="loader" color="success" />);
        }
        return (
            <div className="row">
                <div className="col-4 p-0">
                    <Contacts contacts={this.state.contacts} messages={this.state.messages} chatNavigate={this.onChatNavigate}/>
                </div>
                <div className="col-8 conversation">
                    {this.renderChat()}
                </div>
            </div>
        );
    }

    renderChat(){
        let contact = this.state.contact ? this.state.contact : this.state.contacts[0];
        let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        return <Messages user={this.state.user} messages={messages} sender={this.onSendMessage} contact={contact} />
    }

}

export default Chat;
