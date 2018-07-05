import React from "react";
import {DatePicker, Form, Input, InputNumber, Modal} from "antd";
import "./WeatherSlideForm.css";
import weatherSlideApi from "../../api/WeatherSlideApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class WeatherSlideForm extends React.Component {
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

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                values = this.generateFormData(values);
                weatherSlideApi.create(values)
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

    generateFormData = (values) => {
        let startDate;
        let endDate;

        if (typeof values.rangePicker !== "undefined") {
            startDate = values.rangePicker[0];
            endDate = values.rangePicker[1];
        }

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
                title="New Weather Slide"
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
                        label="Open Weather City ID"
                    >
                        {getFieldDecorator("cityId", {
                            rules: [{required: true, message: "Please input a city id!"}]
                        })(
                            <InputNumber/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

WeatherSlideForm.propTypes = {
    playlistId: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

export default WeatherSlideForm = Form.create()(WeatherSlideForm);

