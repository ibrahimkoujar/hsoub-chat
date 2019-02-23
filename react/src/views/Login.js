import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import axios from "axios";
import Auth from "Auth";
import logo from 'assets/logo.png';

class Login extends React.Component {

    state = {username: '', password: ''};

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
        let data = { username: this.state.username, password: this.state.password };
        axios.post('/auth', data).then(res => {
            Auth.login(res.data);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({error: err.response.data.message });
        });
    };

    /**
     * Render page.
     */
    render(){
        return (
            <Card className="auth col-lg-3 col-sm-6">
                <Form onSubmit={this.onSubmit}>
                    <img src={logo} alt="" width="200" />
                    <h5 className="mb-4">تسجيل الدخول</h5>
                    <Error error={this.state.error} />
                    <Input value={this.state.username} name="username" onChange={this.onChange} placeholder="اسم المستخدم" required autoFocus />
                    <Input type="password"  value={this.state.password} name="password" onChange={this.onChange} placeholder="كلمة المرور" required />
                    <Button color="primary" block className="mb-3"> تسجيل الدخول </Button>
                    <small><Link to="/register">حساب جديد</Link></small>
                    <p className="m-3 text-muted">&copy; 2018 - 2019</p>
                </Form>
            </Card>
        );
    }

}

export default Login;
