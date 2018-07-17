import React from 'react';
import './PlaylistPage.css';
import {Button, Divider, Dropdown, Icon, List, Menu, Modal, notification} from "antd";
import playlistApi from "../api/PlaylistApi";
import slideApi from "../api/SlideApi";
import ImageSlideForm from "../components/forms/ImageSlideForm";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
import CalendarSlideForm from "../components/forms/CalendarSlideForm";
import {withRouter} from "react-router-dom";
import ImageSlideListItem from "../components/slides/ImageSlideListItem";
import MapSlideListItem from "../components/slides/MapSlideListItem";
import WeatherSlideListItem from "../components/slides/WeatherSlideListItem";
import CalendarSlideListItem from "../components/slides/CalendarSlideListItem";

const confirm = Modal.confirm;

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlist: {
                id: this.props.match.params.playlistId,
                name: "",
                slides: []
            },
            imageFormVisible: false,
            calendarFormVisible: false,
            mapFormVisible: false,
            weatherFormVisible: false,
            playlistFormVisible: false,
            isLoading: false,
        };

        this.renderListItem = this.renderListItem.bind(this);
        this.handleSlideDelete = this.handleSlideDelete.bind(this);
        this.deleteSlide = this.deleteSlide.bind(this);
        this.onImageFormSuccess = this.onImageFormSuccess.bind(this);
    }

    componentWillMount() {
        let playlistId = this.props.match.params.playlistId;

        playlistApi.getPlaylist(playlistId)
            .then(playlist => {
                this.setState({playlist: playlist});
            })
            .catch(error => {
                this.props.history.push("/admin/playlists");
            });

        slideApi.getSlidesByPlaylist(playlistId)
            .then(slides => {
                const {playlist} = this.state;
                playlist.slides = slides;
                this.setState({playlist: playlist});
            })
            .catch(error => {
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

    renderListItem = (slide) => {
        const {isLoading} = this.state;

        if (slide.slideType === "IMAGE") {
            return <ImageSlideListItem slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "MAP") {
            return <MapSlideListItem slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "WEATHER") {
            return <WeatherSlideListItem slide={slide} onDelete={this.handleSlideDelete}/>
        } else if (slide.slideType === "CALENDAR") {
            return <CalendarSlideListItem slide={slide} onDelete={this.handleSlideDelete}/>
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
                    <Divider dashed/>
                    <List
                        bordered={true}
                        itemLayout="vertical"
                        size="large"
                        dataSource={playlist.slides}
                        renderItem={this.renderListItem}/>
                </div>
            </div>
        );
    }

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
}

export default withRouter(PlaylistPage);
