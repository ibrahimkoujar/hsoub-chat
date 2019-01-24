import React from "react";
import Avatar from "assets/avatar.png";
import moment from 'moment';

const Contact = props => {
    return (
        <div>
            <div className="media contact">
                <img className="d-none d-md-block ml-3" src={Avatar} alt="" />
                <div className="media-body">
                    <h6>
                        {props.name}
                        <span className="date">
                            {props.message ? moment( props.message.date).format("hh:mm a") : ''}
                        </span>
                    </h6>
                    <p>{props.message ? props.message.content.substring(0, 50) : '' }</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
