import React from "react";
import {Form, Input, Modal} from "antd";
import "./OfficeForm.css";
import officeApi from "../../api/OfficeApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;

class OfficeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                officeApi.create(values)
                    .then(id => {
                        form.resetFields();
                        this.setState({id: id, isLoading: false});
                        this.props.onSuccess(true);
                    })
            } else {
                this.setState({isLoading: false})
            }
        });
    };

    onCancel = () => {
        const {form} = this.props;
        form.resetFields();
        this.props.onCancel();
    };

    render() {
        const {visible, form} = this.props;
        const {isLoading} = this.state;
        const {getFieldDecorator} = form;

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

        return (
            <Modal
                visible={visible}
                title="New Office"
                okText="Create"
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
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
                </Form>
            </Modal>
        );
    }
}

OfficeForm.propTypes = {
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
};

export default OfficeForm = Form.create()(OfficeForm);

