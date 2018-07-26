import React from "react";
import {Button, DatePicker, Form, Icon, Input, InputNumber, Modal, notification, Upload} from "antd";
import "./ImageSlideForm.css";
import * as imageSlideApi from "../../../api/ImageSlideApi";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;

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

    /**
     * Validates form and call web service to create a new image slide and upload the image
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
                imageSlideApi.create(values)
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

        return {
            ...values,
            startDate: startDate,
            endDate: endDate,
            imageUuid: this.state.fileList[0].response.uuid,
            playlistId: this.state.playlistId
        };
    };

    onCancel = () => {
        const {form} = this.props;
        form.resetFields();
        this.props.onCancel();
    };

    onImageUpload = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // // 2. read from response and show file link
        // fileList = fileList.map((file) => {
        //     if (file.uuid) {
        //         // Component will show file.url as link
        //         file.url = file.response.url;
        //     }
        //     return file;
        // });
        //
        // // 3. filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //     if (file.response) {
        //         return file.response.status === 'success';
        //     }
        //     return true;
        // });

        this.setState({fileList});
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
            action: imageSlideApi.imageUploadUrl,
            listType: 'picture',
            onChange: this.onImageUpload,
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
            fileList: this.state.fileList,
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
                        label={<FormattedMessage {...messages.imageLabel} />}
                    >
                        {getFieldDecorator("image", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.imageValidationMessage} />
                            }]
                        })(
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="upload"/>
                                    <FormattedMessage {...messages.uploadAction} />
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.textLabel} />}
                    >
                        {getFieldDecorator("text", {
                            rules: [{max: 250}]
                        })(
                            <TextArea
                                autosize={true}
                                rows={4}/>
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

export default ImageSlideForm = Form.create()(injectIntl(ImageSlideForm));

