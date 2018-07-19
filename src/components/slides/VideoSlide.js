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
                    <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4"/>
                </video>
            </div>
        );
    }
}

VideoSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    }).isRequired,
};

export default VideoSlide;