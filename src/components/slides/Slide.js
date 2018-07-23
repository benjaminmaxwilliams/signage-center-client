import React from "react";
import PropTypes from "prop-types";
import './Slide.css';
import ImageSlide from "./ImageSlide";
import MapSlide from "./MapSlide";
import WeatherSlide from "./WeatherSlide";
import CalendarSlide from "./CalendarSlide";
import EmptySlide from "./EmptySlide";

class Slide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slide} = this.props;

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
}

Slide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        slideType: PropTypes.string,
    }).isRequired
};

export default Slide;