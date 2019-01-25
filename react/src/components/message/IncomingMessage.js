import React from "react";
import moment from 'moment';

const IncomingMessage = props => {
    return (
        <div className="message">
            <div className="sender">
                <div className="message-text">{props.message}</div>
                <span className="message-time">{moment(props.date).format("hh:mm a | MMM D")}</span>
            </div>
        </div>
    );
};

export default IncomingMessage;
