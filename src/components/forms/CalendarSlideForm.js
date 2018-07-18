import React from "react";
import {DatePicker, Form, Input, InputNumber, Modal, notification, Select} from "antd";
import "./CalendarSlideForm.css";
import calendarSlideApi from "../../api/CalendarSlideApi";
import PropTypes from "prop-types";
import calendarApi from "../../api/CalendarApi";

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class CalendarSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlist: {
                id: this.props.playlist.id,
                officeId: this.props.playlist.officeId,
            },
            id: null,
            isLoading: false,
            calendars: []
        };

        this.onCreate = this.onCreate.bind(this);
        this.generateFormData = this.generateFormData.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        const {playlist} = this.state;

        if (typeof playlist.officeId !== "undefined") {
            calendarApi.getAllByOffice(playlist.officeId)
                .then(calendars => {
                    this.setState({calendars: calendars});
                });
        }
    }

    componentWillReceiveProps(props) {
        const {playlist} = this.state;

        if (playlist.officeId !== props.playlist.officeId && props.playlist.officeId !== "undefined") {
            // update playlist officeId
            playlist.officeId = props.playlist.officeId;
            this.setState({playlist: playlist});

            // get office calendars
            calendarApi.getAllByOffice(playlist.officeId)
                .then(calendars => {
                    this.setState({calendars: calendars});
                });
        }
    }

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                values = this.generateFormData(values);
                calendarSlideApi.create(values)
                    .then(newSlide => {
                        form.resetFields();
                        this.setState({id: newSlide.id});
                        this.props.onSuccess(newSlide);
                    })
                    .catch(error => {
                        notification["error"]({
                            message: 'Error',
                            description: error.message
                        });
                    }).finally(() => {
                    this.setState({isLoading: false});
                });
            } else {
                this.setState({isLoading: false})
            }
        });
    };

    /**
     * Generate the form data to send
     *
     * @param values
     * @returns {{startDate: *, endDate: *, playlistId: *}}
     */
    generateFormData = (values) => {
        const {playlist} = this.state;

        let startDate;
        let endDate;

        if (typeof values.rangePicker !== "undefined") {
            startDate = values.rangePicker[0];
            endDate = values.rangePicker[1];
        }

        return {...values, startDate: startDate, endDate: endDate, playlistId: playlist.id};
    };

    onCancel = () => {
        const {form} = this.props;
        form.resetFields();
        this.props.onCancel();
    };

    render() {
        const {visible, form} = this.props;
        const {isLoading, calendars} = this.state;
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
                title="New Calendar Slide"
                okText="Create"
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="Slide Name"
                    >
                        {getFieldDecorator("name", {
                            rules: [{required: true, message: "Please input a slide name!", whitespace: true}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Duration (seconds)"
                    >
                        {getFieldDecorator("duration", {
                            rules: [{required: true, message: "Please input a duration!"}]
                        })(
                            <InputNumber/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Display Schedule">
                        {getFieldDecorator("rangePicker",)(
                            <RangePicker
                                showTime={{format: 'HH:mm'}}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start', 'End']}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Calendars"
                    >
                        {getFieldDecorator('calendarIds', {
                            rules: [
                                {required: true, message: 'Please select at least one calendar!', type: 'array'},
                            ],
                        })(
                            <Select mode="multiple" placeholder="Please select which calendars to display">
                                {calendars.map(o => {
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

CalendarSlideForm.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        officeId: PropTypes.number.isRequired
    }).isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
};

export default CalendarSlideForm = Form.create()(CalendarSlideForm);

