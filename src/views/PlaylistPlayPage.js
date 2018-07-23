import React from "react";
import "./PlaylistPlayPage.css";
import EmptySlide from "../components/slides/EmptySlide";
import * as playlistApi from "../api/PlaylistApi";
import Slide from "../components/slides/Slide";

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

    startTimer() {
        const {currentSlideIndex, playlist} = this.state;

        this.timer = setInterval(() => this.nextSlide(), playlist.slides[currentSlideIndex].duration * 1000);
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    nextSlide() {
        const {currentSlideIndex, playlist} = this.state;

        this.stopTimer();

        if (currentSlideIndex >= playlist.slides.length - 1) {
            this.setState({currentSlideIndex: 0})
        } else {
            this.setState({currentSlideIndex: currentSlideIndex + 1})
        }
    }

    generateSlide() {
        const {currentSlideIndex, playlist} = this.state;
        this.startTimer();

        const currentSlide = playlist.slides[currentSlideIndex];
        return <Slide slide={currentSlide}/>
    }

    render() {

        if (this.state.playlist.slides.length === 0 || this.state.currentSlideIndex < 0) {
            return <EmptySlide/>
        }

        return (
            <div className="container">
                {this.generateSlide()}
            </div>
        );
    }
}

export default PlaylistPlayPage;