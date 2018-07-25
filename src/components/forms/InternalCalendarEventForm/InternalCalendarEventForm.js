import React from "react";
import {Checkbox, DatePicker, Form, Input, Modal, notification, Select, TimePicker} from "antd";
import "./InternalCalendarEventForm.css";
import * as internalCalendarEventApi from "../../../api/InternalCalendarEventApi";
import PropTypes from "prop-types";
import moment from "moment";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

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

    /**
     * Validates form and calls the web service to create a new internal calendar event
     *
     * @param e
     */
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

    /**
     * Returns form data in correct format to send to the web service
     *
     * @param values
     * @returns {{date: *, calendarId: Number}}
     */
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
                title={<FormattedMessage {...messages.title} />}
                okText={<FormattedMessage {...messages.submit} />}
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.typeLabel} />}
                    >
                        {getFieldDecorator("type", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.typeValidationMessage} />
                            }],
                            initialValue: "GENERAL"
                        })(
                            <Select>
                                <Option value="GENERAL">
                                    <FormattedMessage {...messages.generalEventType} />
                                </Option>
                                <Option value="MEETING">
                                    <FormattedMessage {...messages.meetingEventType} />
                                </Option>
                                <Option value="BIRTHDAY">
                                    <FormattedMessage {...messages.birthdayEventType} />
                                </Option>
                                <Option value="ANNIVERSARY">
                                    <FormattedMessage {...messages.anniversaryEventType} />
                                </Option>
                            </Select>
                        )}
                    </FormItem>
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
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.descriptionLabel} />}
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
                        label={<FormattedMessage {...messages.dateLabel} />}
                    >
                        {getFieldDecorator("datePicker", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.dateValidationMessage} />
                            }],
                            initialValue: defaultDate
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.allDayLabel} />}
                    >
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
                        label={<FormattedMessage {...messages.timeLabel} />}
                    >
                        {getFieldDecorator("timePicker", {
                            rules: [{
                                required: !allDay,
                                message: <FormattedMessage {...messages.timeValidationMessage} />
                            }],
                        })(
                            <TimePicker disabled={allDay}/>
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

const intlForm = injectIntl(InternalCalendarEventForm);
export default InternalCalendarEventForm = Form.create()(intlForm);

