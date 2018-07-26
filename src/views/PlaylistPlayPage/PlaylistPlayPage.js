import React from "react";
import "./PlaylistPlayPage.css";
import EmptySlide from "../../components/slides/EmptySlide/EmptySlide";
import * as playlistApi from "../../api/PlaylistApi";
import Slide from "../../components/slides/Slide/Slide";
import {Spin} from "antd";
import stompClient from "../../api/websocket";

class PlaylistPlayPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlist: {
                id: "",
                slides: []
            },
            slideDeletes: [],
            calendarEventDeletes: [],
            requiresUpdate: false,
            currentSlideIndex: -1
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.restartPlayback = this.restartPlayback.bind(this);
    }

    componentDidMount() {
        this.getPlaylistAndStart();
        this.connectToWebSocket();
    }

    /**
     * Connect to websocket and subscribe to the specific playlist topic
     */
    connectToWebSocket = () => {
        const props = this.props;

        stompClient.connect({}, () => {
            stompClient.subscribe(`/topic/playlist-${props.match.params.playlistId}`,
                (payload) => {
                    this.handleMessage(payload)
                })
        });
    };

    /**
     * Handles messages from web socket
     *
     * @param payload
     */
    handleMessage = (payload) => {
        console.debug(payload);

        const {playlist, slideDeletes, calendarEventDeletes} = this.state;
        const data = JSON.parse(payload.body);

        if (typeof playlist.slides === "undefined" || playlist.slides.length === 0) {
            this.getPlaylistAndStart();
        } else {
            console.log(data.messageType);
            switch (data.messageType) {
                case "SLIDE_ADD":
                case "SLIDE_UPDATE":
                case "CALENDAR_EVENT_ADD":
                case "CALENDAR_EVENT_UPDATE":
                    this.setState({requiresUpdate: true});
                    break;
                case "SLIDE_DELETE":
                    const newSlideDeletes = [{...slideDeletes}];
                    newSlideDeletes.push(data.id);
                    this.setState({slideDeletes: newSlideDeletes});
                    break;
                case "CALENDAR_EVENT_DELETE":
                    const newCalendarEventDeletes = [{...calendarEventDeletes}];
                    newCalendarEventDeletes.push(data.id);
                    this.setState({calendarEventDeletes: newCalendarEventDeletes});
                    break;
            }
        }
    };

    /**
     * Retrieves the playlist and starts the playback
     */
    getPlaylistAndStart = () => {
        const playlistId = this.props.match.params.playlistId;

        playlistApi.playPlaylist(playlistId)
            .then(playlist => {
                this.setState({playlist: playlist, currentSlideIndex: 0});
                this.startTimer();
            }).catch(error => {
            console.log(error);
        })
    };

    componentWillUnmount() {
        this.stopTimer()
    }

    /**
     * Start timer based on slide duration
     */
    startTimer() {
        const {currentSlideIndex, playlist} = this.state;
        console.log("START TIMER: " + currentSlideIndex);

        // only continue the process if slides are not empty
        if (playlist.slides.length > 0) {
            const currentSlide = playlist.slides[currentSlideIndex];
            this.timer = setInterval(this.nextSlide, (currentSlide.duration || 5) * 1000);
        }
    }

    /**
     * Stops the timer
     */
    stopTimer() {
        console.log("STOP TIMER");
        clearInterval(this.timer)
    }

    /**
     * Increments the currentSlideIndex by one or resets to zero
     * if the currentSlideIndex is at the end.
     */
    nextSlide() {
        console.log("NEXT SLIDE");
        const {currentSlideIndex, playlist} = this.state;

        this.stopTimer();

        if (currentSlideIndex >= playlist.slides.length - 1) {
            this.restartPlayback();
        } else {
            this.setState({currentSlideIndex: currentSlideIndex + 1});
            this.startTimer()
        }
    }

    /**
     * Detects what should happen at the end of playback.
     */
    restartPlayback = () => {
        const {playlist, requiresUpdate, slideDeletes, calendarEventDeletes} = this.state;

        if (requiresUpdate) {
            this.setState({requiresUpdate: false, slideDeletes: [], calendarEventDeletes: [], currentSlideIndex: 0});
            this.getPlaylistAndStart();
        } else if (slideDeletes.length > 0 && calendarEventDeletes.length > 0) {
            const newPlaylist = playlist;
            newPlaylist.slides = this.handleSlideDeletes(newPlaylist, slideDeletes);
            newPlaylist.slides = this.handleCalendarEventDeletes(newPlaylist, calendarEventDeletes);
            this.setState({
                playlist: newPlaylist,
                requiresUpdate: false,
                slideDeletes: [],
                calendarEventDeletes: [],
                currentSlideIndex: 0
            });
            this.startTimer()
        } else if (slideDeletes.length > 0) {
            const newPlaylist = playlist;
            newPlaylist.slides = this.handleSlideDeletes(newPlaylist, slideDeletes);
            this.setState({
                playlist: newPlaylist,
                requiresUpdate: false,
                slideDeletes: [],
                calendarEventDeletes: [],
                currentSlideIndex: 0
            });
            this.startTimer()
        } else if (calendarEventDeletes.length > 0) {
            const newPlaylist = playlist;
            newPlaylist.slides = this.handleCalendarEventDeletes(newPlaylist, calendarEventDeletes);
            this.setState({
                playlist: newPlaylist,
                requiresUpdate: false,
                slideDeletes: [],
                calendarEventDeletes: [],
                currentSlideIndex: 0
            });
            this.startTimer()
        } else {
            this.setState({currentSlideIndex: 0});
            this.startTimer()
        }
    };

    /**
     * Removes slides marked for deletion
     *
     * @param playlist
     * @param slideDeletes
     * @returns {*[]}
     */
    handleSlideDeletes = (playlist, slideDeletes) => {
        const slides = [...playlist.slides];
        return slides.filter(s => !slideDeletes.includes(s.id));
    };

    /**
     * Removes calendar events marked for deletion
     *
     * @param playlist
     * @param calendarEventDeletes
     * @returns {*[]}
     */
    handleCalendarEventDeletes = (playlist, calendarEventDeletes) => {
        const slides = [...playlist.slides];
        slides.forEach(s => {
            if (s.events) {
                s.events = s.events.filter(e => !calendarEventDeletes.includes(e.id))
            }
        });

        return slides;
    };

    render() {
        const {playlist, currentSlideIndex} = this.state;

        /**
         * Display loading indicator while retrieving playlist and slides
         */
        if (currentSlideIndex < 0) {
            return (
                <div className="container">
                    <Spin style={{textAlign: "center"}} size="large"/>
                </div>
            );
        }

        /**
         * If there was an error retrieving the playlist and slide (i.e. server error, playlist doesn't
         * exist), display and empty slide with Guidewire logo
         */
        if (typeof playlist.slides === "undefined" || playlist.slides.length === 0) {
            return (
                <div className="container">
                    <EmptySlide/>
                </div>
            );
        }

        return (
            <div className="container">
                {playlist.slides.map((s, i) => {
                    return (
                        <div key={i} className={currentSlideIndex === i ? "visible" : "invisible"}>
                            <Slide slide={s}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default PlaylistPlayPage;