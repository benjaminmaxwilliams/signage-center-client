import React, {Component} from 'react';
import './PlaylistTablePage.css';
import {Button, Divider, Icon, Table,Modal} from "antd";
import playlistApi from "../api/PlaylistApi";
import PlaylistSlideForm from "../components/forms/PlaylistSlideForm";
import * as playlist from "antd";
import slideApi from "../api/SlideApi";
const ButtonGroup = Button.Group;

class PlaylistTablePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: []
        }
    }

    componentWillMount() {
        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists});
            });
    }


    handleMenuClick = () => {
        this.showModal("playlistFormVisible");
    };

    handleDelete = (i) => {
       // alert(i)
        playlistApi.delete(i).then(
        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists});
            }));
    }

    showModal = (formVisible) => {
        this.setState({
            [formVisible]: true,
        });
    };

    handleOk = (formVisible) => {
        playlistApi.getAll()
            .then(playlists => {
                this.setState({playlists: playlists,
                    [formVisible]: false});
            });
        // this.setState({
        //     [formVisible]: fal
        // });
    };

    handleCancel = (formVisible) => {
        this.setState({
            [formVisible]: false,
        });
    };

    render() {

        const {playlists} = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/playlist/${record.id}`}>{text}</a>,
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
                render: (text, record) => <a href={`/playlist/${record.id}/play`}>View</a>,
            },
            {
                title: '',
                dataIndex: '',
                key: 'y',
                render: (record) => <a href="#" onClick={e=> {
                    e.preventDefault()
                    this.handleDelete(`${record.id}`)
                }}><Icon type="minus-circle"/>Delete</a>
            }
        ];

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={this.handleMenuClick}>
                        <Icon type="plus-circle" />New
                    </Button>
                </ButtonGroup>
                <Modal
                    title=" New Playlist"
                    visible={this.state.playlistFormVisible}
                    onOk={() => this.handleOk("playlistFormVisible")}
                    onCancel={() => this.handleCancel("playlistFormVisible")}>
                    <PlaylistSlideForm/>
                </Modal>
                <Table
                    title={() => 'Playlists'}
                    columns={columns}
                    bordered={true}
                    dataSource={playlists}/>
            </div>
        );
    }
}

export default PlaylistTablePage;
