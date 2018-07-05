import React from "react";
import {Button, Form, Input, Layout, Menu} from 'antd';
import "./AdminHome.css"

const {SubMenu} = Menu;
const FormItem = Form.Item;

const {Header, Content, Sider} = Layout;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeComponent: <h1></h1>
        }
    }


    render() {


        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (

            <Layout className="container">

                <Layout style={{
                    margin: 'auto',
                    border: '1px solid black',
                    padding: '60px'
                }} className="container">
                    <h1>Login Page</h1>
                    <FormItem
                        {...formItemLayout}
                        label="UserName:"
                    >

                        <Input/>

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password:">

                        <Input type="password"/>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit"><a href={"/admin"}>Submit</a></Button>
                    </FormItem>
                </Layout>
            </Layout>
        )
    }
}

export default LoginPage;