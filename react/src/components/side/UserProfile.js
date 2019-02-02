import React from "react";
import Avatar from 'components/Avatar';

const UserProfile = props => (
    <div className={props.open ? 'side-profile open' : 'side-profile'}>
        <div className="row align-items-center heading">
            <div className="mr-2 nav-link" onClick={props.toggle}>
                <i className="fa fa-arrow-right" />
            </div>
            <div>{props.contact.name}</div>
        </div>
        <div className="d-flex flex-column" style={{overflow: 'auto'}}>
            <Avatar src={props.contact.avatar}/>
            <div className="bg-white px-3 py-2">
                <label className="text-muted">رسالة الحالة</label>
                <p>{props.contact.about}</p>
            </div>
        </div>
    </div>
);

export default UserProfile;
