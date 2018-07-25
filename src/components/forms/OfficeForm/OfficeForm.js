import React from "react";
import {Form, Input, Modal, notification} from "antd";
import "./OfficeForm.css";
import * as officeApi from "../../../api/OfficeApi";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

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

    /**
     * Validates form and calls web service to create office
     *
     * @param e
     */
    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                officeApi.create(values)
                    .then(newOffice => {
                        form.resetFields();
                        this.setState({id: newOffice.id});
                        this.props.onSuccess(newOffice);
                    })
                    .catch(error => {
                        notification["error"]({
                            message: this.props.intl.formatMessage({...messages.error}),
                            description: error.message
                        });
                    })
                    .finally(() => {
                        this.setState({isLoading: false});
                    });
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
                title={<FormattedMessage {...messages.title} />}
                okText={<FormattedMessage {...messages.submit} />}
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.nameLabel} />}
                    >
                        {getFieldDecorator("name", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.nameValidationMessage} />,
                                whitespace: true
                            }]
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

export default OfficeForm = Form.create()(injectIntl(OfficeForm));

