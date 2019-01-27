import React from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

/**
 * Message Form.
 */
const MessageForm = props => (
    <div className="reply">
        <InputGroup>
            <Input type="textarea" rows="1" onKeyUp={props.onType} onChange={props.onChange} value={props.message} placeholder="اكتب رسالتك هنا"/>
            <InputGroupAddon addonType="append">
                <Button onClick={props.onSend}><i className="fa fa-send" /></Button>
            </InputGroupAddon>
        </InputGroup>
    </div>
);

export default MessageForm;
