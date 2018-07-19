import React from 'react';
import './PlaylistPage.css';
import {Button, Divider, Dropdown, Icon, List, Menu, Modal, notification, Popconfirm, Table} from "antd";
import playlistApi from "../api/PlaylistApi";
import slideApi from "../api/SlideApi";
import ImageSlideForm from "../components/forms/ImageSlideForm";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
import CalendarSlideForm from "../components/forms/CalendarSlideForm";
import {withRouter} from "react-router-dom";
import MapSlideCard from "../components/slides/MapSlideCard";
import WeatherSlideCard from "../components/slides/WeatherSlideCard";
import ImageSlideCard from "../components/slides/ImageSlideCard";
import CalendarSlideCard from "../components/slides/CalendarSlideCard";

const confirm = Modal.confirm;

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlist: {
                id: this.props.match.params.playlistId,
                name: "",
                slides: [],
                subscribedPlaylists: []
            },
            imageFormVisible: false,
            calendarFormVisible: false,
            mapFormVisible: false,
            weatherFormVisible: false,
            playlistFormVisible: false,
            isLoading: false,
        };

        this.renderCardItem = this.renderCardItem.bind(this);
        this.handleSlideDelete = this.handleSlideDelete.bind(this);
        this.deleteSlide = this.deleteSlide.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.onImageFormSuccess = this.onImageFormSuccess.bind(this);
    }

    componentWillMount() {
        let playlistId = this.props.match.params.playlistId;

        const opts = {
            withSlides: true,
            withSubscriptions: true
        };

        playlistApi.getPlaylistWithOptions(playlistId, opts)
            .then(playlist => {
                this.setState({playlist: playlist});
            })
            .catch(error => {
                notification["error"]({
                    message: 'Error retrieving playlist',
                    description: error.message
                });
                this.props.history.push("/admin/playlists");
            });
    }

    handleMenuClick = (e) => {
        if (e.key === "1") {
            this.showModal("imageFormVisible");
        } else if (e.key === "2") {
            this.showModal("calendarFormVisible");
        } else if (e.key === "3") {
            this.showModal("mapFormVisible");
        } else if (e.key === "4") {
            this.showModal("weatherFormVisible");
        }
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

    renderCardItem = (slide) => {
        if (slide.slideType === "IMAGE") {
            return <ImageSlideCard slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "MAP") {
            return <MapSlideCard slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "WEATHER") {
            return <WeatherSlideCard slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "CALENDAR") {
            return <CalendarSlideCard slide={slide} onDelete={this.handleSlideDelete}/>
        } else {
            return (<h1></h1>);
        }
    };

    /**
     * Slide List Item Delete Handler
     *
     * @param id
     */
    handleSlideDelete = (e, id) => {
        confirm({
            title: "Are you sure you want to delete this slide?",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => this.deleteSlide(id),
        });
    };

    /**
     * API call to delete the slide
     *
     * @param id
     * @returns {Promise<T> | *}
     */
    deleteSlide = (id) => {
        return slideApi.delete(id)
            .then(() => {
                const {playlist} = this.state;
                let slides = playlist.slides;
                slides = slides.filter(item => item.id !== id);
                playlist.slides = slides;
                this.setState({playlist: playlist});
                notification["success"]({
                    message: 'Slide Deleted',
                });
            }).catch(error => {
                notification["error"]({
                    message: 'Error',
                    description: error.message
                })
            });
    };

    /**
     * Slide Form Modal Success Callback
     */
    onImageFormSuccess = (newSlide) => {
        const playlist = this.state.playlist;
        const slides = [...this.state.playlist.slides];
        slides.push(newSlide);
        playlist.slides = slides;

        this.setState({imageFormVisible: false, playlist: playlist});

        notification["success"]({
            message: 'Image Slide Created',
        });
    };

    /**
     * Slide Form Modal Success Callback
     */
    onCalendarFormSuccess = (newSlide) => {
        const playlist = this.state.playlist;
        const slides = [...this.state.playlist.slides];
        slides.push(newSlide);
        playlist.slides = slides;

        this.setState({calendarFormVisible: false, playlist: playlist});

        notification["success"]({
            message: 'Calendar Slide Created',
        });
    };

    /**
     * Slide Form Modal Success Callback
     */
    onMapFormSuccess = (newSlide) => {
        const playlist = this.state.playlist;
        const slides = [...this.state.playlist.slides];
        slides.push(newSlide);
        playlist.slides = slides;

        this.setState({mapFormVisible: false, playlist: playlist});

        notification["success"]({
            message: 'Map Slide Created',
        });
    };

    /**
     * Slide Form Modal Success Callback
     */
    onWeatherFormSuccess = (newSlide) => {
        const playlist = this.state.playlist;
        const slides = [...this.state.playlist.slides];
        slides.push(newSlide);
        playlist.slides = slides;

        this.setState({weatherFormVisible: false, playlist: playlist});

        notification["success"]({
            message: 'Weather Slide Created',
        });
    };

    /**
     * Unscribe from playlist
     *
     * @param id
     */
    unsubscribe = (id) => {
        const {playlist} = this.state;

        playlistApi.unsubscribe(playlist.id, id)
            .then(() => {
                const {playlist} = this.state;
                const subscribedPlaylists = [...playlist.subscribedPlaylists];
                playlist.subscribedPlaylists = subscribedPlaylists.filter(item => item.id !== id)
                this.setState({playlist: playlist});
                notification["success"]({
                    message: 'Playlist Unsubscribed',
                });
            })
            .catch(error => {
                notification["error"]({
                    message: 'An error occured',
                    description: error.message
                });
            });
    };

    render() {

        const {playlist} = this.state;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">Image Slide</Menu.Item>
                <Menu.Item key="2">Calendar Slide</Menu.Item>
                <Menu.Item key="3">Map Slide</Menu.Item>
                <Menu.Item key="4">Weather Slide</Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                // render: (text, record) => <a href={`/admin/playlists/${record.id}`}>{text}</a>,
            },
            {
                title: 'Office',
                dataIndex: 'officeName',
                key: 'officeName',
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
                            title="Are you sure you want to unsubscribe from this playlist?"
                            onConfirm={() => this.unsubscribe(record.id)}>
                            <a href="javascript:">Unsubscribe</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        return (
            <div className="container">
                <Button type="primary" style={{marginRight: "5px"}} href={`/playlist/${playlist.id}/play`}>
                    View
                </Button>
                <Dropdown overlay={menu}>
                    <Button type="primary">
                        <Icon type="plus-circle"/>Add Slide
                    </Button>
                </Dropdown>
                <Divider dashed/>
                <ImageSlideForm
                    visible={this.state.imageFormVisible}
                    playlistId={playlist.id}
                    onSuccess={this.onImageFormSuccess}
                    onCancel={() => this.closeModal("imageFormVisible")}/>
                <CalendarSlideForm
                    visible={this.state.calendarFormVisible}
                    playlist={playlist}
                    onSuccess={this.onCalendarFormSuccess}
                    onCancel={() => this.closeModal("calendarFormVisible")}/>
                <MapSlideForm
                    visible={this.state.mapFormVisible}
                    playlistId={playlist.id}
                    onSuccess={this.onMapFormSuccess}
                    onCancel={() => this.closeModal("mapFormVisible")}/>
                <WeatherSlideForm
                    visible={this.state.weatherFormVisible}
                    playlistId={playlist.id}
                    onSuccess={this.onWeatherFormSuccess}
                    onCancel={() => this.closeModal("weatherFormVisible")}/>
                <div>
                    <h1>{playlist.name}</h1>
                    <Divider dashed>Slides</Divider>
                    <List
                        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                        dataSource={playlist.slides}
                        renderItem={(item) => (
                            <List.Item>
                                {this.renderCardItem(item)}
                            </List.Item>
                        )}
                    />
                    <Divider dashed>Subscribed Playlists</Divider>
                    <Table
                        rowKey="id"
                        columns={columns}
                        bordered={true}
                        dataSource={playlist.subscribedPlaylists}/>
                </div>
            </div>
        );
    }
}

export default withRouter(PlaylistPage);
