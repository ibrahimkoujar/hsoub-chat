import React from "react";
import Avatar from "assets/avatar.png";
import moment from 'moment';

const Contact = props => (
    <div className="media">
        <img className="d-none d-md-block ml-3 rounded-circle" src={Avatar} alt="" />
        <div className="media-body">
            <span className="name">{props.name}</span>
            <span className="date">{props.message ? moment( props.message.date).format("hh:mm a") : ''}</span>
            <p>{props.message ? props.message.content.substring(0, 40) : 'انقر هنا لبدء المحادثة' }</p>
        </div>
    </div>
);

export default Contact;
