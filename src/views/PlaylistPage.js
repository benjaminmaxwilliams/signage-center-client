import React, {Component} from 'react';
import './PlaylistPage.css';
import {Button, Col, Divider, Dropdown, Icon, Menu, Modal, Row, Table} from "antd";
import playlistApi from "../api/PlaylistApi";
import slideApi from "../api/SlideApi";
import ImageSlide from "../components/slides/ImageSlide";
import ImageSlideForm from "../components/forms/ImageSlideForm";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
const ButtonGroup = Button.Group;


class PlaylistPage extends Component {
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
            playlistFormVisible: false
        }
    }

    componentWillMount() {
        let playlistId = this.props.match.params.playlistId;

        playlistApi.getPlaylist(playlistId)
            .then(playlist => {
                this.setState({playlist: playlist});
            });
        slideApi.getSlidesByPlaylist(playlistId)
            .then(slides => {
                this.setState({playlistId: playlistId, slides: slides});

            });
    }

    componentDidUpdate(prevProps, prevState) {
        let playlistId = this.props.match.params.playlistId
        slideApi.getSlidesByPlaylist(playlistId)
            .then(slides => {
                this.setState({playlistId: playlistId, slides: slides});

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

    handleOk = (e, formVisible) => {
        console.log(e);
        this.setState({
            [formVisible]: false,
        });
    };

    handleCancel = (e, formVisible) => {
        console.log(e);
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
                <Modal
                    title="New Image Slide"
                    visible={this.state.imageFormVisible}
                    onOk={(e) => this.handleOk(e, "imageFormVisible")}
                    onCancel={(e) => this.handleCancel(e, "imageFormVisible")}>
                    <ImageSlideForm
                        playlistId={playlist.id}/>
                </Modal>
                <Modal
                    title="New Calendar Slide"
                    visible={this.state.calendarFormVisible}
                    onOk={(e) => this.handleOk(e, "calendarFormVisible")}
                    onCancel={(e) => this.handleCancel(e, "calendarFormVisible")}>
                    <ImageSlideForm
                        playlistId={playlist.id}/>
                </Modal>
                <Modal
                    title="New Map Slide"
                    visible={this.state.mapFormVisible}
                    onOk={(e) => this.handleOk(e, "mapFormVisible")}
                    onCancel={(e) => this.handleCancel(e, "mapFormVisible")}>
                    <MapSlideForm
                        playlistId={playlist.id}/>
                </Modal>
                <Modal
                    title="New Weather Slide"
                    visible={this.state.weatherFormVisible}
                    onOk={(e) => this.handleOk(e, "weatherFormVisible")}
                    onCancel={(e) => this.handleCancel(e, "weatherFormVisible")}>
                    <WeatherSlideForm
                        playlistId={playlist.id}/>
                </Modal>
                <div>

                    {this.state.slides ? this.state.slides.map(function(item, i){return <img className="tv_img_thumb" key={i}  src={item.imageUrl}></img>}): <span></span> }

                </div>
            </div>
        );
    }
}

export default PlaylistPage;
