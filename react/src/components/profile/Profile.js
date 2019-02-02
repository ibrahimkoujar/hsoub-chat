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
            <div id="side-profile" className={this.props.open ? 'open' : ''}>

                <div className="row align-items-center heading">
                    <div className="mr-2 nav-link" onClick={this.onClose}>
                        <i className="fa fa-arrow-right" />
                    </div>
                    <div>الملف الشخصي</div>
                </div>

                <div className="d-flex flex-column" style={{overflow: 'auto'}}>

                    <Form onSubmit={this.onSubmit}>

                        <Error error={this.state.error} />

                        <div className="text-center" onClick={this.showFileUpload}>
                            <Avatar src={this.props.user.avatar} file={this.state.image}/>
                        </div>

                        <input type="file" ref={this.fileUpload} onChange={this.onImageChange} className="d-none"/>

                        <div className="bg-white px-4 py-2">
                            <label className="text-muted">الاسم</label>
                            <Input value={this.state.name} name="name" onChange={this.onChange} required  autocomplete="off"/>
                        </div>

                        <div className="bg-white px-3 py-2">
                            <label className="text-muted">رسالة الحالة</label>
                            <Input value={this.state.about} name="about" onChange={this.onChange} required autocomplete="off" />
                        </div>

                        <div className="bg-white px-3 py-2">
                            <Button block className="mt-3">حفظ</Button>
                        </div>
                    </Form>

                </div>

            </div>

        );
    }

}

export default Profile;
