import React from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import "./InternalCalendarForm.css";
import internalCalendarApi from "../../api/InternalCalendarApi";
import PropTypes from "prop-types";
import officeApi from "../../api/OfficeApi";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class InternalCalendarForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false,
            offices: []
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        officeApi.getAll()
            .then(offices => {
                this.setState({offices: offices});
            });
    }

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                internalCalendarApi.create(values)
                    .then(newCalendar => {
                        form.resetFields();
                        this.setState({id: newCalendar.id});
                        this.props.onSuccess(newCalendar);
                    })
                    .catch(error => {
                        notification["error"]({
                            message: 'Error',
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
        const {isLoading, offices} = this.state;
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
                title="New Internal Calendar"
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
                    <FormItem
                        {...formItemLayout}
                        label="Description"
                    >
                        {getFieldDecorator("description", {
                            rules: [{
                                max: 250,
                                required: true,
                                message: "Please input a description!",
                                whitespace: true
                            }]
                        })(
                            <TextArea
                                autosize={true}
                                rows={4}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Office"
                    >
                        {getFieldDecorator("officeId", {
                            rules: [{required: true, message: "Please select an office!"}]
                        })(
                            <Select>
                                {offices.map(o => {
                                    return <Option value={o.id}>{o.name}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

InternalCalendarForm.propTypes = {
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
};

export default InternalCalendarForm = Form.create()(InternalCalendarForm);

