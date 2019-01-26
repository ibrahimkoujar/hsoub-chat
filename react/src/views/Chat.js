import React from "react";
import socketIOClient from 'socket.io-client';
import Auth from 'Auth';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import Contacts from 'components/contacts/Contacts';
import Messages from 'components/message/Messages';

class Chat extends React.Component {

    state = { user: Auth.getUser() };

    componentDidMount(){
        let socket = socketIOClient(process.env.REACT_APP_SOCKET, {query: "token=" + Auth.getToken()});
        socket.on("connect", () => this.setState({connected: true}));
        socket.on("disconnect", () =>this.setState({connected: false}));
        socket.on("message", this.onNewMessage);
        socket.on("sent_message", this.onSentMessage);
        socket.on("new_user", this.onNewUser);
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
            this.setState({contacts: res.data});
        });
    };

    onNewMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    onSentMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    onNewUser = user => {
        console.log(user);
        let contacts = this.state.contacts.concat(user);
        this.setState({contacts});
    };
    
    onSendMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
        this.state.socket.emit('message', message);
    };

    onChatNavigate = contact => {
        this.setState({contact: contact});
    };

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
        if(this.state.contacts.length < 1){
            return;
        }
        let contact = this.state.contact ? this.state.contact : this.state.contacts[0];
        let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        return <Messages user={this.state.user} messages={messages} sender={this.onSendMessage} contact={contact} />
    };

}

export default Chat;
