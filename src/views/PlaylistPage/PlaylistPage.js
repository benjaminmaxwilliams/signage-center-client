import React from 'react';
import './PlaylistPage.css';
import {Button, Divider, Dropdown, Icon, List, Menu, Modal, notification, Popconfirm, Table} from "antd";
import * as playlistApi from "../../api/PlaylistApi";
import * as slideApi from "../../api/SlideApi";
import ImageSlideForm from "../../components/forms/ImageSlideForm/ImageSlideForm";
import WeatherSlideForm from "../../components/forms/WeatherSlideForm";
import MapSlideForm from "../../components/forms/MapSlideForm/MapSlideForm";
import CalendarSlideForm from "../../components/forms/CalendarSlideForm/CalendarSlideForm";
import {withRouter} from "react-router-dom";
import PlaylistSlideOrderForm from "../../components/forms/PlaylistSlideOrderForm/PlaylistSlideOrderForm";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";
import SlideCard from "../../components/cards/SlideCard/SlideCard";

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
            slideOrderFormVisible: false,
            isLoading: false,
        };

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
                    message: this.props.intl.formatMessage({...messages.errorRetrieve}),
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

    /**
     * Slide List Item Delete Handler
     *
     * @param id
     */
    handleSlideDelete = (e, id) => {
        e.preventDefault();
        confirm({
            title: this.props.intl.formatMessage({...messages.slideDeleteConfirmTitle}),
            okText: this.props.intl.formatMessage({...messages.slideDeleteConfirmOk}),
            cancelText: this.props.intl.formatMessage({...messages.slideDeleteConfirmCancel}),
            okType: "danger",
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
        return slideApi.deleteSlide(id)
            .then(() => {
                const {playlist} = this.state;
                let slides = playlist.slides;
                slides = slides.filter(item => item.id !== id);
                playlist.slides = slides;
                this.setState({playlist: playlist});
                notification["success"]({
                    message: this.props.intl.formatMessage({...messages.slideDeleteSuccess}),
                });
            }).catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
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
            message: this.props.intl.formatMessage({...messages.slideCreateSuccess},
                {slideType: this.props.intl.formatMessage({...messages.imageSlide})}),
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
            message: this.props.intl.formatMessage({...messages.slideCreateSuccess},
                {slideType: this.props.intl.formatMessage({...messages.calendarSlide})}),
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
            message: this.props.intl.formatMessage({...messages.slideCreateSuccess},
                {slideType: this.props.intl.formatMessage({...messages.mapSlide})}),
        });
    };

    // TODO: delete
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
     * Unsubscribe from playlist
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
                    message: this.props.intl.formatMessage({...messages.unsubscribeSuccess}),
                });
            })
            .catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                    description: error.message
                });
            });
    };

    render() {

        const {playlist} = this.state;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <FormattedMessage {...messages.imageSlide} />
                </Menu.Item>
                <Menu.Item key="2">
                    <FormattedMessage {...messages.calendarSlide} />
                </Menu.Item>
                <Menu.Item key="3">
                    <FormattedMessage {...messages.mapSlide} />
                </Menu.Item>
                <Menu.Item key="4">Weather Slide</Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title: <FormattedMessage {...messages.nameColumn} />,
                dataIndex: 'name',
                key: 'name',
                // render: (text, record) => <a href={`/admin/playlists/${record.id}`}>{text}</a>,
            },
            {
                title: <FormattedMessage {...messages.officeColumn} />,
                dataIndex: 'officeName',
                key: 'officeName',
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
                            title={<FormattedMessage {...messages.unsubscribeConfirm} />}
                            onConfirm={() => this.unsubscribe(record.id)}>
                            <a href="javascript:">
                                <FormattedMessage {...messages.unsubscribeTableAction} />
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        return (
            <div className="container">
                <h1>{playlist.name}</h1>
                <Button type="primary" style={{marginRight: "5px"}} href={`/playlist/${playlist.id}/play`}>
                    <FormattedMessage {...messages.view} />
                </Button>
                <Button
                    type="primary"
                    style={{marginRight: "5px"}}
                    onClick={() => this.setState({slideOrderFormVisible: true})}
                >
                    <FormattedMessage {...messages.changeOrder} />
                </Button>
                <Dropdown overlay={menu}>
                    <Button type="primary">
                        <Icon type="plus-circle"/>
                        <FormattedMessage {...messages.addSlide} />
                    </Button>
                </Dropdown>
                <PlaylistSlideOrderForm
                    visible={this.state.slideOrderFormVisible}
                    onCancel={() => this.setState({slideOrderFormVisible: false})}
                    slides={playlist.slides}/>
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
                    <Divider dashed/>
                    <h2>
                        <FormattedMessage {...messages.slidesSectionTitle} />
                    </h2>
                    <List
                        grid={{gutter: 4, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 4}}
                        dataSource={playlist.slides}
                        renderItem={(item) => (
                            <List.Item>
                                <SlideCard slide={item} onDelete={this.handleSlideDelete}/>
                            </List.Item>
                        )}
                    />
                    <Divider dashed/>
                    <h2>
                        <FormattedMessage {...messages.subscriptionsSectionTitle} />
                    </h2>
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

export default withRouter(injectIntl(PlaylistPage));
