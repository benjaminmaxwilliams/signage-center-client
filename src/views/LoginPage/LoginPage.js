import React from "react";
import {Button, Form, Icon, Input, notification} from 'antd';
import {Link} from 'react-router-dom';
import "./LoginPage.css"
import * as authApi from "../../api/AuthApi";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

const FormItem = Form.Item;

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
                        message: this.props.intl.formatMessage({...messages.appName}),
                        description: this.props.intl.formatMessage({...messages.loginError403})
                    });
                } else {
                    notification.error({
                        message: this.props.intl.formatMessage({...messages.appName}),
                        description: error.message || this.props.intl.formatMessage({...messages.loginError})
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
                        rules: [{required: true, message: <FormattedMessage {...messages.usernameValidationMessage}/>}],
                    })(
                        <Input
                            prefix={<Icon type="user"/>}
                            size="large"
                            name="username"
                            placeholder={this.props.intl.formatMessage({...messages.usernamePlaceholder})}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: <FormattedMessage {...messages.passwordValidationMessage}/>}],
                    })(
                        <Input
                            prefix={<Icon type="lock"/>}
                            size="large"
                            name="password"
                            type="password"
                            placeholder={this.props.intl.formatMessage({...messages.passwordPlaceholder})}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="login-form-button"
                        onClick={() => this.handleLogin()}
                    >
                        <FormattedMessage {...messages.submit}/>
                    </Button>
                    Or&nbsp;
                    <Link to="/signup">
                        <FormattedMessage {...messages.register}/>
                    </Link>
                </FormItem>
            </Form>
        );
    }
}


export default LoginPage = Form.create()(injectIntl(LoginPage));