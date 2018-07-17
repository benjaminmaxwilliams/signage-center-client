import React from 'react';
import './PlaylistPage.css';
import {Button, Divider, Dropdown, Icon, List, Menu, notification} from "antd";
import playlistApi from "../api/PlaylistApi";
import slideApi from "../api/SlideApi";
import ImageSlideForm from "../components/forms/ImageSlideForm";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
import CalendarSlideForm from "../components/forms/CalendarSlideForm";
import genericMapImg from "../assets/generic-map.png";
import genericWeatherImg from "../assets/generic-weather.png";
import genericCalendarImg from "../assets/generic-calendar.svg";
import {withRouter} from "react-router-dom";

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

        this.renderItem = this.renderItem.bind(this);
        this.renderImageSlideItem = this.renderImageSlideItem.bind(this);
        this.onDelete = this.onDelete.bind(this);
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

    renderItem = (slide) => {
        if (slide.slideType === "IMAGE") {
            return this.renderImageSlideItem(slide);
        } else if (slide.slideType === "MAP") {
            return this.renderMapSlideItem(slide);
        } else if (slide.slideType === "WEATHER") {
            return this.renderWeatherSlideItem(slide);
        } else if (slide.slideType === "CALENDAR") {
            return this.renderCalendarSlideItem(slide);
        } else {
            return (<h1></h1>);
        }
    };

    renderImageSlideItem = (slide) => {
        return (
            <List.Item
                key={slide.id}
                actions={[
                    <span>
                         <Button type="danger" shape="circle" icon="delete" loading={this.state.isLoading}
                                 onClick={(e) => this.onDelete(e, slide.id)}>
                        </Button>
                    </span>,
                ]}
                extra={
                    <div style={{maxWidth: 272, maxHeight: 200}}>
                        <img style={{height: "100%", width: "100%"}} alt="logo" src={slide.imageUrl}/>
                    </div>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Image Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
                {slide.text &&
                <span style={{marginRight: 15}}>
                            <Icon type="message" style={{marginRight: 8}}/>
                    {slide.text}
                        </span>
                }
            </List.Item>
        );
    };

    renderMapSlideItem = (slide) => {
        return (
            <List.Item
                key={slide.id}
                actions={[
                    <span>
                         <Button type="danger" shape="circle" icon="delete" loading={this.state.isLoading}
                                 onClick={(e) => this.onDelete(e, slide.id)}>
                        </Button>
                    </span>
                ]}
                extra={
                    <img width={272} alt="logo"
                         src={genericMapImg}/>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Map Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
            </List.Item>
        );
    };

    renderWeatherSlideItem = (slide) => {
        return (
            <List.Item
                key={slide.id}
                actions={[
                    <span>
                         <Button type="danger" shape="circle" icon="delete" loading={this.state.isLoading}
                                 onClick={(e) => this.onDelete(e, slide.id)}>
                        </Button>
                    </span>
                ]}
                extra={
                    <img width={272} alt="logo"
                         src={genericWeatherImg}/>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Weather Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
            </List.Item>
        );
    };

    renderCalendarSlideItem = (slide) => {
        return (
            <List.Item
                key={slide.id}
                actions={[
                    <span>
                         <Button type="danger" shape="circle" icon="delete" loading={this.state.isLoading}
                                 onClick={(e) => this.onDelete(e, slide.id)}>
                        </Button>
                    </span>
                ]}
                extra={
                    <img width={272} alt="logo"
                         src={genericCalendarImg}/>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Calendar Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
            </List.Item>
        );
    };

    onDelete = (e, id) => {
        this.setState({isLoading: true});

        slideApi.delete(id)
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
        }).finally(() => {
            this.setState({isLoading: false});
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
                        renderItem={this.renderItem}/>
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
