import React from "react";
import socketIOClient from 'socket.io-client';
import Auth from 'Auth';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import Contacts from 'components/contacts/Contacts';
import Messages from 'components/message/Messages';

class Chat extends React.Component {

    state = { user: Auth.getUser(), timeout: false};

    componentDidMount(){
        let socket = socketIOClient(process.env.REACT_APP_SOCKET, {query: "token=" + Auth.getToken()});
        socket.on("connect", () => this.setState({connected: true}));
        socket.on("disconnect", () =>this.setState({connected: false}));
        socket.on("message", this.onNewMessage);
        socket.on("sent_message", this.onSentMessage);
        socket.on("new_user", this.onNewUser);
        socket.on("typing", this.onTypingMessage);
        this.setState({socket});
        this.init();
    }

    componentWillUnmount(){
        this.state.socket.disconnect();
    }

    init = () => {
        axios.get('/message').then(res => {
            this.setState({messages: res.data});
        });
        axios.get('/user').then(res => {
            this.setState({
                contacts: res.data,
                contact: res.data.length > 0 ? res.data[0] : null
            });
        });
    };

    // Receivers
    onNewMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    onSentMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    onNewUser = user => {
        let contacts = this.state.contacts.concat(user);
        this.setState({contacts});
    };

    onTypingMessage = user => {
        if (this.state.contact.id !== user) return;
        this.setState({typing: user});
        if (this.state.timeout) clearTimeout(this.state.timeout);
        const timeout = setTimeout(() => {
            this.setState({typing: false})
        }, 2000);
        this.setState({timeout});
    };

    // Senders
    onSendMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
        this.state.socket.emit('message', message);
    };

    onType = e => this.state.socket.emit('typing', this.state.contact.id);

    onChatNavigate = contact => this.setState({contact});

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

    renderChat = () => {
        const { typing, contact, user } = this.state;
        if(!contact) return;
        let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        contact.isTyping = contact.id === typing;
        return <Messages
            user={user} messages={messages} sender={this.onSendMessage} onType={this.onType} contact={contact}/>
    };

}

export default Chat;
