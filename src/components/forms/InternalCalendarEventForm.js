import React from "react";
import {Checkbox, DatePicker, Form, Input, Modal, notification, Select, TimePicker} from "antd";
import "./InternalCalendarEventForm.css";
import * as internalCalendarEventApi from "../../api/InternalCalendarEventApi";
import PropTypes from "prop-types";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class InternalCalendarEventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false,
            allDay: true
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

        let date = values.datePicker;

        if (typeof values.timePicker !== "undefined") {
            let time = values.timePicker;
            date.hour(time.hours()).minute(time.minutes());
        }

        return {...values, date: date, calendarId: this.props.calendarId};
    };

    onCancel = () => {
        const {form} = this.props;
        form.resetFields();
        this.props.onCancel();
    };

    onAllDayChange = (e) => {
        this.setState({
            allDay: e.target.checked
        }, () => {
            this.props.form.validateFields(['timePicker'], {force: true});
        });
    };

    render() {
        const {visible, form, defaultDate} = this.props;
        const {isLoading, allDay} = this.state;
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
                            rules: [{required: true, message: "Please input a date!"}],
                            initialValue: defaultDate
                        })(
                            <DatePicker
                                format="MM/DD/YYYY"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="All Day">
                        {getFieldDecorator("allDay", {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox
                                onChange={this.onAllDayChange}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Time">
                        {getFieldDecorator("timePicker", {
                            rules: [{required: !allDay, message: "Please input a time!"}],
                        })(
                            <TimePicker
                                disabled={allDay}
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
    defaultDate: PropTypes.instanceOf(moment),
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

InternalCalendarEventForm.defaultProps = {
    defaultDate: moment(),
};

export default InternalCalendarEventForm = Form.create()(InternalCalendarEventForm);

