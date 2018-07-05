import React from 'react';
import './PlaylistPage.css';
import {Button, Col, Divider, Dropdown, Icon, Menu, notification, Row} from "antd";
import playlistApi from "../api/PlaylistApi";
import ImageSlideForm from "../components/forms/ImageSlideForm";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
import CalendarSlideForm from "../components/forms/CalendarSlideForm";

const ButtonGroup = Button.Group;


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
        }
    }

    componentWillMount() {
        const playlistId = this.props.match.params.playlistId;

        playlistApi.getPlaylist(playlistId)
            .then(playlist => {
                this.setState({playlist: playlist});
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
                <Row>
                    <Col span={4}>
                        <Dropdown overlay={menu}>
                            <Button type="primary">
                                <Icon type="plus-circle"/>Add Slide
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
                <Divider dashed />
                <ImageSlideForm
                    visible={this.state.imageFormVisible}
                    playlistId={playlist.id}
                    onSuccess={this.onImageFormSuccess}
                    onCancel={() => this.closeModal("imageFormVisible")}/>
                <CalendarSlideForm
                    visible={this.state.calendarFormVisible}
                    playlistId={playlist.id}
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
            </div>
        );
    }

    /**
     * Slide Form Modal Success Callback
     */
    onImageFormSuccess = (success) => {
        if (success) {
            this.setState({imageFormVisible: false});
            notification["success"]({
                message: 'Image Slide Created',
            });
        }
    };

    onCalendarFormSuccess = (success) => {
        if (success) {
            this.setState({calendarFormVisible: false});
            notification["success"]({
                message: 'Calendar Slide Created',
            });
        }
    };

    onMapFormSuccess = (success) => {
        if (success) {
            this.setState({mapFormVisible: false});
            notification["success"]({
                message: 'Map Slide Created',
            });
        }
    };

    onWeatherFormSuccess = (success) => {
        if (success) {
            this.setState({weatherFormVisible: false});
            notification["success"]({
                message: 'Weather Slide Created',
            });
        }
    };
}

export default PlaylistPage;
