import React from "react";
import {Button, Form, Icon, Input, InputNumber, Upload} from "antd";
import "./MapSlideForm.css";
import mapSlideApi from "../../api/MapSlideApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;

class MapSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: this.props.playlistId,
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
                values = {
                    ...values,
                    playlistId: this.state.playlistId
                };
                mapSlideApi.create(values)
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
                    label="Latitude"
                >
                    {getFieldDecorator("latCoord", {
                        rules: [{required: true, message: "Please input a latitude!"}]
                    })(
                        <InputNumber step={0.1}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Longitude"
                >
                    {getFieldDecorator("longCoord", {
                        rules: [{required: true, message: "Please input a longitude!"}]
                    })(
                        <InputNumber ste={0.1}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading}>Create</Button>
                </FormItem>
            </Form>
        );
    }
}

MapSlideForm.PropTypes = {
    playlistId: PropTypes.number.isRequired
};

export default MapSlideForm = Form.create()(MapSlideForm);

