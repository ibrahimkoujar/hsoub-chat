import React from "react";
import moment from 'moment';

/**
 * Message item.
 */
const Message = props => (
    <div className="message">
        <div className={props.outgoing ? 'sender' : 'receiver' }>
            <div className="message-text">{props.message.content}</div>
            <span className="meta">
                {moment(props.message.date).format("hh:mm a | MMM D")}
            </span>
        </div>
    </div>
);

export default Message;
