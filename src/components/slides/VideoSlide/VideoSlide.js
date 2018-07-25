import React from "react";
import './VideoSlide.css';
import PropTypes from "prop-types";

class VideoSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="video">
                <video autoPlay={true} muted={true}>
                    <source src={slide.url} type={slide.fileType}/>
                </video>
            </div>
        );
    }
}

VideoSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        fileType: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    }).isRequired,
};

export default VideoSlide;