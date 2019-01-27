import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import axios from "axios";
import Auth from "Auth";
import logo from 'assets/logo.png';

class Login extends React.Component {

    state = {};

    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });

    onSubmit = e => {
        e.preventDefault();
        let data = { username: this.state.username, password: this.state.password };
        axios.post('/auth', data).then(res => {
            Auth.login(res.data);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({error: err.response.data.message })
        });
    };

    render(){
        return (
            <Card className="mx-auto col-lg-3 col-sm-6 mt-4">
                <Form className="form-auth" onSubmit={this.onSubmit}>
                    <img src={logo} alt="" width="200"  />
                    <h5 className="mb-4">الرجاء تسجيل الدخول</h5>
                    <Error error={this.state.error} />
                    <Input value={this.state.username} name="username" onChange={this.onChange} placeholder="اسم المستخدم" required autoFocus />
                    <Input type="password"  value={this.state.password} name="password" onChange={this.onChange} placeholder="كلمة المرور" required />
                    <Button color="primary" block className="mb-3"> تسجيل الدخول </Button>
                    <small><Link to="/register">حساب جديد</Link></small>
                    <p className="mt-3 mb-3 text-muted">&copy; 2018 - 2019</p>
                </Form>
            </Card>
        );
    }

}

export default Login;
