import React from "react";
import avatar from "assets/avatar.png";

const Avatar = props => {
    let file = props.file;
    let src = props.src ? `uploads/${props.src}` : avatar;
    return <img src={ file || src } className="img-fluid rounded-circle ml-3 avatar" alt="" />
};

export default Avatar;
