import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, FormGroup, Input, Button } from "reactstrap";
import Error from "components/Error";
import axios from "axios";
import Auth from "Auth";
import Logo from 'assets/logo.png';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', username: '', password: '', error: '' };
        this.onFormChange = this.onFormChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFormChange(e){
        this.setState({ [e.target.name]: e.target.value, error: '' });
    }

    onSubmit(e){
        e.preventDefault();
        let data = {
            name: this.state.name, username: this.state.username, password: this.state.password
        };
        axios.post('/auth/register', data).then(res => {
            Auth.login(res.data);
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({error: err.response.data.message })
        });
    }

    render(){
        return (
            <Card className="mx-auto col-lg-3 col-sm-6 mt-4">

                <Form className="form-auth" onSubmit={this.onSubmit}>

                    <img src={Logo} alt="" width="200" />
                    <h5 className="mb-4 text-center">إنشاء حساب جديد</h5>
                    <Error error={this.state.error}/>
                    <FormGroup>
                        <Input placeholder="الاسم" value={this.state.name} name="name" onChange={this.onFormChange} required autoFocus />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="اسم المستخدم" value={this.state.username} name="username" onChange={this.onFormChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" placeholder="كلمة المرور" value={this.state.password} name="password" onChange={this.onFormChange} required />
                    </FormGroup>

                    <Button color="primary" block> إنشاء </Button>

                    <p className="mt-3 mb-2 text-muted">
                        <small><Link to="/login">تسجيل الدخول</Link></small>
                    </p>
                    <p className="mt-3 mb-3 text-muted">&copy; 2018 - 2019</p>

                </Form>

            </Card>
        );
    }

}

export default Register;
