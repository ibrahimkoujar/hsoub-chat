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
        this.initSocketConnection();
        this.initData();
    }

    componentWillUnmount(){
        this.state.socket.disconnect();
    }

    /**
     * Start socket.io connection.
     */
    initSocketConnection = () => {
        let socket = socketIOClient(process.env.REACT_APP_SOCKET, {query: "token=" + Auth.getToken()});
        socket.on("connect", () => this.setState({connected: true}));
        socket.on("disconnect", () =>this.setState({connected: false}));
        socket.on("message", this.onNewMessage);
        socket.on("sent_message", this.onSentMessage);
        socket.on("new_user", this.onNewUser);
        socket.on("typing", this.onTypingMessage);
        this.setState({socket});
    };

    /**
     * Fetch contacts & messages from server.
     */
    initData = () => {
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

    /**
     * Change current chat.
     * @param contact
     */
    onChatNavigate = contact => this.setState({contact});

    /**
     * Render Page
     */
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

    /**
     * Render Chat Window.
     */
    renderChat = () => {
        const { typing, contact, user } = this.state;
        if(!contact) return;
        let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        contact.isTyping = contact.id === typing;
        return <Messages user={user} messages={messages} sender={this.sendMessage} sendType={this.sendType} contact={contact}/>
    };

    // Socket IO Events ----------------------------------------------- //

    /**
     * Send message to user.
     * @param message
     */
    sendMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
        this.state.socket.emit('message', message);
    };

    /**
     * Send "user is typing".
     */
    sendType = () => this.state.socket.emit('typing', this.state.contact.id);

    /**
     * New message arrived.
     * @param message
     */
    onNewMessage = message => {
        new Audio('light.mp3').play();
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    /**
     * Sync messages between sender applications.
     * @param message
     */
    onSentMessage = message => {
        let messages = this.state.messages.concat(message);
        this.setState({messages});
    };

    /**
     * Receive new user registered to the application.
     * @param user
     */
    onNewUser = user => {
        let contacts = this.state.contacts.concat(user);
        this.setState({contacts});
    };

    /**
     * Receive typing message.
     * @param sender
     */
    onTypingMessage = sender => {
        if (this.state.contact.id !== sender) return;
        this.setState({typing: sender});
        if (this.state.timeout) clearTimeout(this.state.timeout);
        const timeout = setTimeout(this.typingTimeout, 2000);
        this.setState({timeout});
    };

    /**
     * Stop typing message.
     */
    typingTimeout = () =>  this.setState({typing: false});

}

export default Chat;
