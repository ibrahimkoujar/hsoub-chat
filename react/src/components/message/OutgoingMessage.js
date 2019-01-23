import React from "react";
import moment from 'moment';

const OutgoingMessage = props => {
    return (
        <div className="outgoing-message">
            <div className="body">
                <p>{props.message}</p>
                <span className="date">{moment(props.date).format("hh:mm a | MMM D")}</span>
            </div>
        </div>
    );
};

export default OutgoingMessage;
