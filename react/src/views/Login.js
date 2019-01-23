import React from "react";
import  { Card, Form, FormGroup, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "Auth";
import logo from 'assets/logo.png';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPassowrdChange = this.onPassowrdChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e){
        let username = e.target.value;
        this.setState({ username });
    }

    onPassowrdChange(e){
        let password = e.target.value;
        this.setState({ password });
    }

    onSubmit(e){
        e.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password,
        }
        axios.post('/auth', data).then(res => {
            Auth.login(res.data);
            this.props.history.push('/');
        }).catch(err => {
            alert();
        });
    }

    render(){
        return (
            <Card className="mx-auto col-lg-3 col-sm-6 mt-4">
                <Form className="form-auth" onSubmit={this.onSubmit}>
                    <img src={logo} alt="" width="200"  />
                    <h5 class="mb-4">الرجاء تسجيل الدخول</h5>
                    <FormGroup>
                        <Input placeholder="اسم المستخدم" value={this.state.username} onChange={this.onUsernameChange} required autoFocus />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" placeholder="كلمة المرور" value={this.state.password} onChange={this.onPassowrdChange} required />
                    </FormGroup>
                    <Button color="primary" block> تسجيل الدخول </Button>

                    <p className="mt-3 mb-2 text-muted">
                        <small><Link to="/register">حساب جديد</Link></small>
                    </p>

                    <p class="mt-3 mb-3 text-muted">&copy; 2018 - 2019</p>
                </Form>

            </Card>
        );
    }

}

export default Login;
