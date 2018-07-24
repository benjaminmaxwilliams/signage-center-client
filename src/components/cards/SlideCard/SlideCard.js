import React from "react";
import PropTypes from "prop-types";
import './SlideCard.css';
import ImageSlideCard from "../ImageSlideCard/ImageSlideCard";
import MapSlideCard from "../MapSlideCard/MapSlideCard";
import WeatherSlideCard from "../WeatherSlideCard";
import CalendarSlideCard from "../CalendarSlideCard/CalendarSlideCard";
import EmptySlideCard from "../EmpySlideCard/EmptySlideCard";

class SlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slide, onClick, onDelete} = this.props;

        if (slide.slideType === "IMAGE") {
            return <ImageSlideCard slide={slide} onClick={onClick} onDelete={onDelete}/>
        } else if (slide.slideType === "MAP") {
            return <MapSlideCard slide={slide} onClick={onClick} onDelete={onDelete}/>
        } else if (slide.slideType === "WEATHER") {
            return <WeatherSlideCard slide={slide} onClick={onClick} onDelete={onDelete}/>
        } else if (slide.slideType === "CALENDAR") {
            return <CalendarSlideCard slide={slide} onClick={onClick} onDelete={onDelete}/>
        } else {
            return (<EmptySlideCard slide={slide} onClick={onClick} onDelete={onDelete}/>);
        }
    }
}

SlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        slideType: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func
};

SlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default SlideCard;