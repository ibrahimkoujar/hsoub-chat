import React from "react";
import { Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import Avatar from 'assets/avatar.png';
import axios from "axios";

class Profile extends React.Component {

    state = {name: this.props.user.name, about: this.props.user.about};

    /**
     * Change form handler
     * @param e
     */
    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });

    /**
     * Form submit handler.
     * @param e
     */
    onSubmit = e => {
        e.preventDefault();
        let data = { name: this.state.name, about: this.state.about };
        axios.post('/account', data)
        .then(this.props.toggle)
        .catch(err => this.setState({
            error: err.response.data.message
        }));
    };

    /**
     * Render component.
     */
    render(){
        return (
            <div className={this.props.open ? 'side open' : 'side'}>
                <div className="heading">
                    <div className="pt-2">
                        <i className="fa fa-arrow-right ml-4" onClick={this.props.toggle}/>الملف الشخصي
                    </div>
                </div>
                <div className="profile">
                    <Form onSubmit={this.onSubmit}>
                        <img src={Avatar} alt="" width="100" className="rounded-circle mb-4"  />
                        <Error error={this.state.error} />
                        <Input value={this.state.name} name="name" onChange={this.onChange} placeholder="الاسم" required autoFocus />
                        <Input type="textarea" value={this.state.about} name="about" onChange={this.onChange} placeholder="رسالة الحالة" rows="4" required />
                        <Button color="success" block> حفظ </Button>
                    </Form>
                </div>
            </div>
        );
    }

}

export default Profile;
