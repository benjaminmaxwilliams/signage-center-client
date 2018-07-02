import React from "react";
import {Button, Form, Icon, Input, InputNumber, Upload} from "antd";
import "./ImageSlideForm.css";
import imageSlideApi from "../../api/ImageSlideApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;

class ImageSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: this.props.playlistId,
            id: null,
            fileList: [],
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
                imageSlideApi.create(values)
                    .then(id => {
                        let formData = new FormData();
                        formData.append("file", this.state.fileList[0]);
                        imageSlideApi.uploadImage(formData, id)
                            .then(() => {
                                this.setState({id: id, isLoading: false});
                                alert("Success!")
                            })
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

        const props = {
            multiple: false,
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList: this.state.fileList,
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
                    label="Image"
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading} disabled={this.state.fileList.length === 0}>Create</Button>
                </FormItem>
            </Form>
        );
    }
}

ImageSlideForm.PropTypes = {
    playlistId: PropTypes.number.isRequired
};

export default ImageSlideForm = Form.create()(ImageSlideForm);

