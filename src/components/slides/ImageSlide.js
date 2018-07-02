import React from "react";
import PropTypes from "prop-types";
import './ImageSlide.css';

class ImageSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slide} = this.props;

        return (
            <div>
                <img className="scaleimage" src={slide.imageUrl} alt=""/>
            </div>
        );
    }
}

ImageSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired
    })
};

export default ImageSlide;