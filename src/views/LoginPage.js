import React from "react";
import {Button, Form, Icon, Input, Layout, notification} from 'antd';
import {Link} from 'react-router-dom';
import "./LoginPage.css"
import authApi from "../api/AuthApi";

const FormItem = Form.Item;
const {Header, Content, Sider} = Layout;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    handleLogin = () => {
        this.setState({isLoading: true});
        this.props.form.validateFields((err, values) => {
            authApi.login(values)
                .then(success => {
                    if (success) {
                        this.props.history.push('/admin');
                    } else {
                        throw new Error();
                    }
                }).catch(error => {
                if (error.status === 403) {
                    notification.error({
                        message: 'SignageCenter',
                        description: 'Your Username or Password is incorrect. Please try again!'
                    });
                } else {
                    notification.error({
                        message: 'SignageCenter',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                }
            });
        });

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h1>Login</h1>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username or email!'}],
                    })(
                        <Input
                            prefix={<Icon type="user"/>}
                            size="large"
                            name="username"
                            placeholder="Username or Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock"/>}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button"
                            onClick={() => this.handleLogin()}>Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default LoginPage = Form.create()(LoginPage);