import React from "react";
import "./MapSlideCard.css";
import PropTypes from "prop-types";
import {Card, Icon} from "antd";
import "../../shared/material-design-icon.css"

const {Meta} = Card;

class MapSlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    viewSlide = () => {
        this.props.history.push(`/slide/view/${this.props.slide.id}`);
    };

    render() {
        const {slide} = this.props;

        const cover = (
            <i style={{background: "#657db6", textAlign: "center"}} className="material-icons md-light md-150">map</i>
        );

        const actions = [
            <Icon type="desktop" onClick={this.viewSlide}/>,
            <Icon type="edit" onClick={(e) => this.props.onClick(e, slide.id)}/>,
            <Icon type="delete" onClick={(e) => this.props.onDelete(e, slide.id)}/>
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
                    {slide.address ? slide.address : (slide.latCoord + ", " + slide.longCoord)}
                    </span>
            </Card>
        );
    }
}

MapSlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        latCoord: PropTypes.number.isRequired,
        longCoord: PropTypes.number.isRequired,
        address: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

MapSlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default MapSlideCard;