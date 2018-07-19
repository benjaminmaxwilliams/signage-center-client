import React from "react";
import "./SlideViewPage.css";
import ImageSlide from "../components/slides/ImageSlide";
import MapSlide from "../components/slides/MapSlide";
import WeatherSlide from "../components/slides/WeatherSlide";
import CalendarSlide from "../components/slides/CalendarSlide";
import EmptySlide from "../components/slides/EmptySlide";
import slideApi from "../api/SlideApi";

class SlideViewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slide: null,
        };

        this.generateSlide = this.generateSlide.bind(this);
    }

    componentWillMount() {
        const slideId = this.props.match.params.slideId;

        slideApi.getSlide(slideId)
            .then(slide => {
                this.setState({slide: slide});
            }).catch(error => {
            console.log(error);
        })
    }

    generateSlide() {
        const {slide} = this.state;

        if (slide.slideType === "IMAGE") {
            return <ImageSlide slide={slide}/>
        } else if (slide.slideType === "MAP") {
            return <MapSlide slide={slide}/>
        } else if (slide.slideType === "WEATHER") {
            return <WeatherSlide slide={slide}/>
        } else if (slide.slideType === "CALENDAR") {
            return <CalendarSlide slide={slide}/>
        } else {
            return <EmptySlide/>
        }
    }

    render() {
        const {slide} = this.state;

        if (!slide) {
            return <EmptySlide/>
        }

        return (
            <div className="container">
                {this.generateSlide()}
            </div>
        );
    }
}

export default SlideViewPage;