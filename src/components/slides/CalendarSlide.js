import React from "react";
import PropTypes from "prop-types";
import './CalendarSlide.css';
import {Calendar} from "antd";

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slide} = this.props;

        return (
            <div>
                <Calendar/>
            </div>
        );
    }
}

CalendarSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    })
};

export default CalendarSlide;