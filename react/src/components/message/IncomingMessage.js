import React from "react";
import Avatar from "assets/avatar.png";
import moment from 'moment';

const IncomingMessage = props => {
    return (
        <div className="incoming-message">
            <img src={Avatar} className="d-none d-md-block" alt=""/>
            <div className="body">
                <p>{props.message}</p>
                <span className="date">{moment(props.date).format("hh:mm a | MMM D")}</span>
            </div>
        </div>
    );
};

export default IncomingMessage;
