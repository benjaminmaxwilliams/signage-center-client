import React from "react";
import {Button, Form, Icon, Input, InputNumber, Upload} from "antd";
import "./ImageSlideForm.css";
import imageSlideApi from "../../api/ImageSlideApi";
import PropTypes from "prop-types";
import playlistApi from "../../api/PlaylistApi";
import PlaylistTablePage from "../../views/PlaylistTablePage";

const FormItem = Form.Item;

class PlaylistSlideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: this.props.playlistId,
            id: null,
            fileList: [],
            isLoading: false,
            //activeComponent: <h1></h1>
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //process = () => {
   //     let component;
   //     component = <PlaylistTablePage/>
   //     this.setState({activeComponent: component})
   // };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isLoading: true})

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = {
                    ...values,
                };
                playlistApi.create(values)
                    .then(id => {
                        //let formData = new FormData();
                        //formData.append("file", this.state.fileList[0]);
                        this.setState({isLoading: false});
                        alert("Success!")
                       // playlistApi.getAll()
                         //   .then(() => {
                                //this.setState({id: id, isLoading: false});
                           //     alert("Success!")
                            //})
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
                    label="Playlist Name"
                >
                    {getFieldDecorator("name", {
                        rules: [{required: true, message: "Please input a playlist name!", whitespace: true}]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading} disabled={this.state.id === 0}>Create</Button>
                </FormItem>
            </Form>
        );
    }
}

PlaylistSlideForm.PropTypes = {
    playlistId: PropTypes.number.isRequired
};

export default PlaylistSlideForm = Form.create()(PlaylistSlideForm);

