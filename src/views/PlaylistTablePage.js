import React from 'react';
import './PlaylistTablePage.css';
import {Button, Divider, Icon, Popconfirm, Table} from "antd";
import playlistApi from "../api/PlaylistApi";
import PlaylistForm from "../components/forms/PlaylistForm";
import {notification} from "antd/lib/index";

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
            });
    }

    handleMenuClick = () => {
        this.showModal("newPlaylistFormVisible");
    };

    onDelete = (id) => {
        playlistApi.delete(id)
            .then(() => {
                const playlists = [...this.state.playlists];
                this.setState({playlists: playlists.filter(item => item.id !== id)});
                notification["success"]({
                    message: 'Playlist Deleted',
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

    onPlaylistFormSuccess = (newPlaylist) => {
        const playlists = [...this.state.playlists];
        playlists.push(newPlaylist);

        this.setState({newPlaylistFormVisible: false, playlists: playlists});

        notification["success"]({
            message: 'Playlist Created',
        });
    };

    render() {

        const {playlists} = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/admin/playlists/${record.id}`}>{text}</a>,
            },
            {
                title: 'Office',
                dataIndex: 'officeName',
                key: 'officeName',
            },
            {
                title: 'Create Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => new Date(text).toLocaleDateString("en-US")
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        <a href={`/playlist/${record.id}/play`}>View</a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="Are you sure? This will delete all the sides on this playlist as well."
                            onConfirm={() => this.onDelete(record.id)}>
                            <a href="javascript:">Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={this.handleMenuClick}>
                        <Icon type="plus-circle"/>New
                    </Button>
                </ButtonGroup>
                <PlaylistForm
                    visible={this.state.newPlaylistFormVisible}
                    onSuccess={this.onPlaylistFormSuccess}
                    onCancel={() => this.closeModal("newPlaylistFormVisible")}/>
                <Divider dashed/>
                <Table
                    rowKey="id"
                    title={() => 'Playlists'}
                    columns={columns}
                    bordered={true}
                    dataSource={playlists}/>
            </div>
        );
    }
}

export default PlaylistTablePage;
