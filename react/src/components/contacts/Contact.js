import React from "react";
import Avatar from "assets/avatar.png";
import moment from 'moment';
import { Badge } from 'reactstrap';

/**
 * Contact Item.
 */
const Contact = props => (
    <div className="media">
        <img className=" ml-3 rounded-circle" src={Avatar} alt="" />
        {props.contact.status === true ? <i className="fa fa-circle online" /> : ''}
        <div className="media-body">
            <span className="name">{props.contact.name}</span>
            <span className="date">{props.message ? moment(props.message.date).format("hh:mm a") : ''}</span>
            <p>
                {props.message ? props.message.content.substring(0, 40) : 'انقر هنا لبدء المحادثة' }
                {props.unseen > 0 ? <Badge className="counter" color="danger">{props.unseen}</Badge> : '' }
            </p>
        </div>
    </div>
);

export default Contact;
