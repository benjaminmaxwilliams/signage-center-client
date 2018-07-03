import React from "react";
import {Button, Form, Input} from "antd";
import "./OfficeForm.css";
import officeApi from "../../api/OfficeApi";

const FormItem = Form.Item;

class OfficeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isLoading: true})

        this.props.form.validateFields((err, values) => {
            if (!err) {
                officeApi.create(values)
                    .then(id => {
                        this.setState({id: id, isLoading: false});
                        alert("Success");
                    })
            } else {
                this.setState({isLoading: false})
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

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
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Name"
                >
                    {getFieldDecorator("name", {
                        rules: [{required: true, message: "Please input a name!", whitespace: true}]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading}>Create</Button>
                </FormItem>
            </Form>
        );
    }
}

export default OfficeForm = Form.create()(OfficeForm);

