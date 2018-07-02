import React, {Component} from 'react';
import './PlaylistTablePage.css';
import {Button, Divider, Icon, Table} from "antd";
import playlistApi from "../api/PlaylistApi";
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
            }
        ];

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary">
                        <Icon type="plus-circle" />New
                    </Button>
                </ButtonGroup>
                <Divider dashed />
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
