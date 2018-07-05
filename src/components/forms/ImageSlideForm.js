import React from "react";
import {Button, DatePicker, Form, Icon, Input, InputNumber, Modal, Upload} from "antd";
import "./ImageSlideForm.css";
import imageSlideApi from "../../api/ImageSlideApi";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class ImageSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: this.props.playlistId,
            id: null,
            fileList: [],
            isLoading: false,
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
                imageSlideApi.create(values)
                    .then(id => {
                        let formData = new FormData();
                        formData.append("file", this.state.fileList[0]);
                        imageSlideApi.uploadImage(formData, id)
                            .then(() => {
                                form.resetFields();
                                this.setState({id: id, isLoading: false});
                                this.props.onSuccess(true);
                            })
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

        const uploadProps = {
            multiple: false,
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        return (
            <Modal
                visible={visible}
                title="New Image Slide"
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
                        label="Image"
                    >
                        {getFieldDecorator("image", {
                            rules: [{required: true, message: "Please select an image!"}]
                        })(
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="upload"/> Click to upload
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ImageSlideForm.propTypes = {
    playlistId: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
};

export default ImageSlideForm = Form.create()(ImageSlideForm);

