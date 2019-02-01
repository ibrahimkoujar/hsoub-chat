import React from "react";
import { Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import Avatar from 'components/Avatar';
import axios from "axios";

class Profile extends React.Component {

    state = {name: this.props.user.name, about: this.props.user.about};

    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
    }

    showFileUpload = e  => this.fileUpload.current.click();

    onImageChange = e => {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                image: URL.createObjectURL(e.target.files[0]),
                avatar: e.target.files[0]
            });
        }
    };

    /**
     * Change form handler
     * @param e
     */
    onChange = e => this.setState({[e.target.name]: e.target.value, error: null});

    /**
     * Form submit handler.
     * @param e
     */
    onSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('about', this.state.about);
        if (this.state.avatar) data.append('avatar', this.state.avatar, this.state.avatar.name);
        axios.post('/account', data)
        .then(this.props.toggle)
        .catch(err => this.setState({
            error: err.response.data.message
        }));
    };

    onClose = e => {
        this.setState({image: false, name: this.props.user.name, about: this.props.user.about});
        this.props.toggle();
    };

    /**
     * Render component.
     */
    render(){
        return (
            <div className={this.props.open ? 'side open' : 'side'}>
                <div className="heading">
                    <div className="pt-2">
                        <i className="fa fa-arrow-right ml-4" onClick={this.onClose}/>الملف الشخصي
                    </div>
                </div>
                <div className="profile">
                    <Form onSubmit={this.onSubmit}>
                        <div onClick={this.showFileUpload}>
                            <Avatar src={this.props.user.avatar} file={this.state.image}/>
                        </div>
                        <input type="file" ref={this.fileUpload} onChange={this.onImageChange} className="hide"/>
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
