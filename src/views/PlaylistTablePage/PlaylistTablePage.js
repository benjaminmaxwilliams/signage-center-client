import React from 'react';
import './PlaylistTablePage.css';
import {Button, Divider, Icon, Popconfirm, Table} from "antd";
import * as playlistApi from "../../api/PlaylistApi";
import PlaylistForm from "../../components/forms/PlaylistForm/PlaylistForm";
import {notification} from "antd/lib/index";
import {FormattedDate, FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";
import moment from "moment";

const ButtonGroup = Button.Group;

class PlaylistTablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
            newPlaylistFormVisible: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onPlaylistFormSuccess = this.onPlaylistFormSuccess.bind(this);
    }

    componentWillMount() {
        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists});
            })
            .catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                });
            });
    }

    handleMenuClick = () => {
        this.showModal("newPlaylistFormVisible");
    };

    /**
     * Calls web service to delete playlist. Will Remove playlist from table if
     * successful
     *
     * @param id
     */
    onDelete = (id) => {
        playlistApi.deletePlaylist(id)
            .then(() => {
                const playlists = [...this.state.playlists];
                this.setState({playlists: playlists.filter(item => item.id !== id)});
                notification["success"]({
                    message: this.props.intl.formatMessage({...messages.playlistDeleteSuccess}),
                });
            })
            .catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                });
            });
    };

    showModal = (formVisible) => {
        this.setState({
            [formVisible]: true,
        });
    };

    closeModal = (formVisible) => {
        this.setState({
            [formVisible]: false,
        });
    };

    /**
     * Successful callback for new playlist form
     *
     * @param newPlaylist
     */
    onPlaylistFormSuccess = (newPlaylist) => {
        const playlists = [...this.state.playlists];
        playlists.push(newPlaylist);

        this.setState({newPlaylistFormVisible: false, playlists: playlists});

        notification["success"]({
            message: this.props.intl.formatMessage({...messages.playlistCreateSuccess}),
        });
    };

    render() {

        const {playlists} = this.state;

        const columns = [
            {
                title: <FormattedMessage {...messages.nameColumn} />,
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/admin/playlists/${record.id}`}>{text}</a>,
            },
            {
                title: <FormattedMessage {...messages.officeColumn} />,
                dataIndex: 'officeName',
                key: 'officeName',
            },
            {
                title: <FormattedMessage {...messages.createDateColumn} />,
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => <FormattedDate value={moment(text)}/>
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        <a href={`/playlist/${record.id}/play`}>
                            <FormattedMessage {...messages.viewTableAction} />
                        </a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title={<FormattedMessage {...messages.deleteTableActionConfirm} />}
                            onConfirm={() => this.onDelete(record.id)}
                        >
                            <a href="javascript:">
                                <FormattedMessage {...messages.deleteTableAction} />
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={this.handleMenuClick}>
                        <Icon type="plus-circle"/>
                        <FormattedMessage {...messages.newAction} />
                    </Button>
                </ButtonGroup>
                <PlaylistForm
                    visible={this.state.newPlaylistFormVisible}
                    onSuccess={this.onPlaylistFormSuccess}
                    onCancel={() => this.closeModal("newPlaylistFormVisible")}/>
                <Divider dashed/>
                <Table
                    rowKey="id"
                    title={() => <FormattedMessage {...messages.tableTitle} />}
                    columns={columns}
                    bordered={true}
                    dataSource={playlists}/>
            </div>
        );
    }
}

export default injectIntl(PlaylistTablePage);
