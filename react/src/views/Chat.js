import React from "react";
import socketIOClient from 'socket.io-client';
import Auth from 'Auth';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { ContactHeader, Contacts, Messages, ChatHeader, MessageForm } from 'components/chat';
import Profile from "../components/profile/Profile";
import Search from "../components/chat/Search";

class Chat extends React.Component {

    state = { user: Auth.getUser(), timeout: false, profile: false, contacts: [], search: ''};

    componentDidMount(){
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
        socket.on("update_user", this.onUpdateUser);
        socket.on("typing", this.onTypingMessage);
        socket.on("online_users", this.updateUsersSates);
        socket.on("user_status", this.updateUsersSates);

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
        }).then(this.initSocketConnection);
    };

    /**
     * Change current chat.
     * @param contact
     */
    onChatNavigate = contact => {
        // Set current chat
        this.setState({contact});
        // Send chat seen to server.
        this.state.socket.emit('seen', contact.id);
        // make all messages seen in current chat.
        let messages = this.state.messages;
        messages.forEach((element, index) => {
            if(element.sender === contact.id) messages[index].seen = true
        });
        this.setState({messages});
    };

    profileToggle = e => this.setState({profile: !this.state.profile});

    onSearch = e => this.setState({search: e.target.value});

    /**
     * Render Page
     */
    render(){
        if(!this.state.connected || !this.state.contacts || !this.state.messages){
            return (<Spinner id="loader" color="success" />);
        }
        return (
            <div className="container-fluid" id="main-container">

                <div className="row h-100">

                    <div className="col-6 col-md-4" id="chat-list-area" >
                        <ContactHeader user={this.state.user} toggle={this.profileToggle}/>
                        <Search onSearch={this.onSearch}/>
                        <Contacts contacts={this.state.contacts} messages={this.state.messages} chatNavigate={this.onChatNavigate} search={this.state.search}/>
                        <Profile user={this.state.user} toggle={this.profileToggle} open={this.state.profile}/>
                    </div>

                    <div className="col-6 col-md-8" id="message-area">
                        <ChatHeader contact={this.state.contact} />
                        {this.renderChat()}
                        <MessageForm contact={this.state.contact} sender={this.sendMessage} sendType={this.sendType} />
                    </div>

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
        return <Messages user={user} messages={messages} sender={this.sendMessage} sendType={this.sendType} contact={contact} />
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
        // Send message seen.
        if (message.sender === this.state.contact.id){
            this.state.socket.emit('seen', this.state.contact.id);
            message.seen = true;
        }
        // Make alert.
        new Audio('light.mp3').play();
        // Add new message to messages.
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
     * Receive update user.
     * @param user
     */
    onUpdateUser = user => {
        if (this.state.user.id === user.id) {
            this.setState({user});
            Auth.setUser(user);
            return;
        }
        let contacts = this.state.contacts;
        contacts.forEach((element, index) => {
            if(element.id === user.id) {
                contacts[index] = user;
                contacts[index].status = element.status;
            }
        });
        this.setState({contacts});
        if (this.state.contact.id === user.id) this.setState({contact: user});
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

    /**
     * Get users states.
     * @param users
     */
    updateUsersSates = users => {
        let contacts = this.state.contacts;
        contacts.forEach((element, index) => {
            if (users[element.id])contacts[index].status = users[element.id];
        });
        this.setState({contacts});
        let contact = this.state.contact;
        if (users[contact.id]) contact.status = users[contact.id];
        this.setState({contact});
    };

}

export default Chat;
