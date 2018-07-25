import React from "react";
import "./PlaylistPlayPage.css";
import EmptySlide from "../../components/slides/EmptySlide/EmptySlide";
import * as playlistApi from "../../api/PlaylistApi";
import Slide from "../../components/slides/Slide/Slide";
import {Spin} from "antd";

class PlaylistPlayPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlist: {
                id: "",
                slides: []
            },
            currentSlideIndex: -1
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.generateSlide = this.generateSlide.bind(this);
    }

    componentWillMount() {
        const playlistId = this.props.match.params.playlistId;

        playlistApi.playPlaylist(playlistId)
            .then(playlist => {
                this.setState({playlist: playlist});
                this.nextSlide();
            }).catch(error => {
            console.log(error);
        })
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    /**
     * Start timer based on slide duration
     */
    startTimer() {
        const {currentSlideIndex, playlist} = this.state;

        const currentSlide = playlist.slides[currentSlideIndex];
        this.timer = setInterval(() => this.nextSlide(), currentSlide.duration * 1000);
    }

    /**
     * Stops the timer
     */
    stopTimer() {
        clearInterval(this.timer)
    }

    /**
     * Increments the currentSlideIndex by one or resets to zero
     * if the currentSlideIndex is at the end.
     */
    nextSlide() {
        const {currentSlideIndex, playlist} = this.state;

        this.stopTimer();

        if (currentSlideIndex >= playlist.slides.length - 1) {
            this.setState({currentSlideIndex: 0})
        } else {
            this.setState({currentSlideIndex: currentSlideIndex + 1})
        }
    }

    /**
     * Retrieves the next slide in rotation and restarts the timer
     *
     * @returns {*}
     */
    generateSlide() {
        const {currentSlideIndex, playlist} = this.state;
        this.startTimer();

        const currentSlide = playlist.slides[currentSlideIndex];
        return <Slide slide={currentSlide}/>
    }

    render() {

        /**
         * Display loading indicator while retrieving playlist and slides
         */
        if (this.state.currentSlideIndex < 0) {
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
        if (this.state.playlist.slides.length === 0) {
            return (
                <div className="container">
                    <EmptySlide/>
                </div>
            );
        }

        return (
            <div className="container">
                {this.generateSlide()}
            </div>
        );
    }
}

export default PlaylistPlayPage;