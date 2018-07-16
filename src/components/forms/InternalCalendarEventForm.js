import React from "react";
import {DatePicker, Form, Input, Modal, notification, Select, TimePicker} from "antd";
import "./InternalCalendarEventForm.css";
import internalCalendarEventApi from "../../api/InternalCalendarEventApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class InternalCalendarEventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false,
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.generateFormData = this.generateFormData.bind(this);
    }

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                values = this.generateFormData(values);
                internalCalendarEventApi.create(values)
                    .then(newCalendarEvent => {
                        form.resetFields();
                        this.setState({id: newCalendarEvent.id});
                        this.props.onSuccess(newCalendarEvent);
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

    generateFormData = (values) => {
        let date;
        let time;

        if (typeof values.datePicker !== "undefined") {
            date = values.datePicker.utc()
        }

        if (typeof values.timePicker !== "undefined") {
            time = values.timePicker.utc().format("HH:mm")
        }

        return {...values, date: date, time: time, calendarId: this.props.calendarId};
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
                title="New Event"
                okText="Create"
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="Type"
                    >
                        {getFieldDecorator("type", {
                            rules: [{required: true, message: "Please select an event type!"}],
                            initialValue: "GENERAL"
                        })(
                            <Select>
                                <Option value="GENERAL">General</Option>
                                <Option value="MEETING">Meeting</Option>
                                <Option value="BIRTHDAY">Birthday</Option>
                                <Option value="ANNIVERSARY">Anniversary</Option>
                            </Select>
                        )}
                    </FormItem>
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
                            rules: [{max: 250}]
                        })(
                            <TextArea
                                autosize={true}
                                rows={4}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Date">
                        {getFieldDecorator("datePicker", {
                            rules: [{required: true, message: "Please input a date!"}]
                        })(
                            <DatePicker
                                format="YYYY-MM-DD"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Time">
                        {getFieldDecorator("timePicker",)(
                            <TimePicker
                                format="HH:mm"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

InternalCalendarEventForm.propTypes = {
    calendarId: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

export default InternalCalendarEventForm = Form.create()(InternalCalendarEventForm);

