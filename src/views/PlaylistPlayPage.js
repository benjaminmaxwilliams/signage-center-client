import React from "react";
import slideApi from "../api/SlideApi";
import "./PlaylistPlayPage.css";
import ImageSlide from "../components/slides/ImageSlide";
import MapSlide from "../components/slides/MapSlide";
import WeatherSlide from "../components/slides/WeatherSlide";
import CalendarSlide from "../components/slides/CalendarSlide";
import EmptySlide from "../components/slides/EmptySlide";

class PlaylistPlayPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistId: null,
            slides: [],
            currentSlideIndex: -1
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.generateSlide = this.generateSlide.bind(this);
    }

    componentWillMount() {
        const playlistId = this.props.match.params.playlistId;

        slideApi.getSlidesByPlaylist(playlistId)
            .then(slides => {
                this.setState({playlistId: playlistId, slides: slides});
                this.nextSlide();
            }).catch(error => {
            console.log(error);
        })
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    startTimer() {
        const {currentSlideIndex, slides} = this.state;

        this.timer = setInterval(() => this.nextSlide(), slides[currentSlideIndex].duration * 1000);
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    nextSlide() {
        const {currentSlideIndex, slides} = this.state;

        this.stopTimer();

        if (currentSlideIndex >= slides.length - 1) {
            this.setState({currentSlideIndex: 0})
        } else {
            this.setState({currentSlideIndex: currentSlideIndex + 1})
        }
    }

    generateSlide() {
        const {currentSlideIndex, slides} = this.state;
        this.startTimer();

        const currentSlide = slides[currentSlideIndex];

        if (currentSlide.slideType === "IMAGE") {
            return <ImageSlide slide={currentSlide}/>
        } else if (currentSlide.slideType === "MAP") {
            return <MapSlide slide={currentSlide}/>
        } else if (currentSlide.slideType === "WEATHER") {
            return <WeatherSlide slide={currentSlide}/>
        } else if (currentSlide.slideType === "MAP") {
            return <CalendarSlide slide={currentSlide}/>
        }
    }

    render() {

        if (this.state.slides.length === 0 || this.state.currentSlideIndex < 0) {
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