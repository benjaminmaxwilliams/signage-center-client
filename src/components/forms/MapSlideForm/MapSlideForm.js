import React from "react";
import {DatePicker, Form, Input, InputNumber, Modal} from "antd";
import "./MapSlideForm.css";
import * as mapSlideApi from "../../../api/MapSlideApi";
import PropTypes from "prop-types";
import {notification} from "antd/lib/index";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class MapSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: this.props.playlistId,
            id: null,
            isLoading: false
        };

        this.onCreate = this.onCreate.bind(this);
        this.generateFormData = this.generateFormData.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    /**
     * Validates form and calls web service to create a new map slide
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
                mapSlideApi.create(values)
                    .then(newSlide => {
                        form.resetFields();
                        this.setState({id: newSlide.id});
                        this.props.onSuccess(newSlide);
                    })
                    .catch(error => {
                        notification["error"]({
                            message: this.props.intl.formatMessage({...messages.error}),
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
     * Generate form data to send to web services
     *
     * @param values
     * @returns {{startDate: *, endDate: *, playlistId: (Number|*)}}
     */
    generateFormData = (values) => {
        let startDate;
        let endDate;


        if (typeof values.rangePicker !== "undefined") {
            startDate = values.rangePicker[0];
            endDate = values.rangePicker[1];
        }

        // TODO: get address/lat long
        // let address = geocodingApi.getAddress(values.latCoord, values.longCoord);

        return {...values, startDate: startDate, endDate: endDate, playlistId: this.state.playlistId};
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
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.durationLabel} />}
                    >
                        {getFieldDecorator("duration", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.durationValidationMessage} />
                            }]
                        })(
                            <InputNumber/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.displayScheduleLabel} />}
                    >
                        {getFieldDecorator("rangePicker",)(
                            <RangePicker
                                showTime
                                placeholder={[
                                    this.props.intl.formatMessage({...messages.startPlaceholder}),
                                    this.props.intl.formatMessage({...messages.endPlaceholder})
                                ]}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.latLabel} />}
                    >
                        {getFieldDecorator("latCoord", {
                            rules: [{required: true, message: <FormattedMessage {...messages.latValidationMessage} />}]
                        })(
                            <InputNumber step={0.1}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.longLabel} />}
                    >
                        {getFieldDecorator("longCoord", {
                            rules: [{required: true, message: <FormattedMessage {...messages.longValidationMessage} />}]
                        })(
                            <InputNumber step={0.1}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

MapSlideForm.propTypes = {
    playlistId: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

export default MapSlideForm = Form.create()(injectIntl(MapSlideForm));

