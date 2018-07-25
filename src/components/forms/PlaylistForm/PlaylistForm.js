import React from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import "./PlaylistForm.css";
import PropTypes from "prop-types";
import * as playlistApi from "../../../api/PlaylistApi";
import * as officeApi from "../../../api/OfficeApi";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";

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
            })
            .catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                    description: error.message
                });
            });

        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists})
            })
            .catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                    description: error.message
                });
            });
    }

    /**
     * Validates form and calls web service to create new playlist
     *
     * @param e
     */
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
                        label={<FormattedMessage {...messages.playlistsLabel} />}
                    >
                        {getFieldDecorator('subscribedPlaylistIds',)(
                            <Select
                                mode="multiple"
                                placeholder={this.props.intl.formatMessage({...messages.playlistsPlaceholder})}
                            >
                                {playlists.map(o => {
                                    return <Option key={o.id} value={o.id}>{o.name}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage {...messages.officeLabel} />}
                    >
                        {getFieldDecorator("officeId", {
                            rules: [{
                                required: true,
                                message: <FormattedMessage {...messages.officeValidationMessage} />
                            }]
                        })(
                            <Select>
                                {offices.map(o => {
                                    return <Option key={o.id} value={o.id}>{o.name}</Option>
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

const intlForm = injectIntl(PlaylistForm);
export default PlaylistForm = Form.create()(intlForm);

