import React from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import "./PlaylistForm.css";
import PropTypes from "prop-types";
import * as playlistApi from "../../api/PlaylistApi";
import * as officeApi from "../../api/OfficeApi";

const FormItem = Form.Item;
const Option = Select.Option;

class PlaylistForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isLoading: false,
            offices: [],
            playlists: []
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        officeApi.getAll()
            .then(offices => {
                this.setState({offices: offices});
            });

        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists})
            });
    }

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                playlistApi.create(values)
                    .then(newPlaylist => {
                        form.resetFields();
                        this.setState({id: newPlaylist.id});
                        this.props.onSuccess(newPlaylist);
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

    onCancel = () => {
        const {form} = this.props;
        form.resetFields();
        this.props.onCancel();
    };

    render() {
        const {visible, form} = this.props;
        const {isLoading, offices, playlists} = this.state;
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
                title="New Playlist"
                okText="Create"
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Form>
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
                    <FormItem
                        {...formItemLayout}
                        label="Subscribed Playlists"
                    >
                        {getFieldDecorator('subscribedPlaylistIds',)(
                            <Select mode="multiple" placeholder="Please select which playlists to subscribe to">
                                {playlists.map(o => {
                                    return <Option value={o.id}>{o.name}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Office"
                    >
                        {getFieldDecorator("officeId", {
                            rules: [{required: true, message: "Please select an office!"}]
                        })(
                            <Select>
                                {offices.map(o => {
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

PlaylistForm.propTypes = {
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
};

export default PlaylistForm = Form.create()(PlaylistForm);

