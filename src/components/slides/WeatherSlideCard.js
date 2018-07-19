import React from "react";
import "./WeatherSlideCard.css";
import PropTypes from "prop-types";
import {Card, Icon} from "antd";

const {Meta} = Card;

class WeatherSlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    viewSlide = () => {
        this.props.history.push(`/slide/view/${this.props.slide.id}`);
    };

    render() {
        const {slide} = this.props;

        const cover = (
            <i style={{background: "#657db6", textAlign: "center", padding: "5px"}}
               className="material-icons md-light md-150">wb_sunny</i>
        );

        const actions = [
            <Icon type="desktop" onClick={this.viewSlide}/>,
            <Icon type="edit" onClick={this.props.onClick}/>,
            <Icon type="delete" onClick={this.props.onDelete}/>
        ];

        return (
            <Card
                style={{width: 300}}
                cover={cover}
                actions={actions}
            >
                <Meta
                    title={slide.name}
                />
                <span style={{marginRight: 15}}>
                <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                </span>
                <span style={{marginRight: 15}}>
                    <Icon type="environment" style={{marginRight: 8}}/>
                    {slide.latCoord + ", " + slide.longCoord}
                    </span>
            </Card>
        );
    }
}

WeatherSlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        latCoord: PropTypes.number.isRequired,
        longCoord: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

WeatherSlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default WeatherSlideCard;