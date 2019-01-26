import React from "react";
import { Alert } from "reactstrap";

const Error = props => {
    if (props.error === ''){
        return '';
    }
    return (
        <Alert color="danger">{props.error}</Alert>
    );
};

export default Error;
