import React from "react";
import "./CalendarSlideCard.css";
import PropTypes from "prop-types";
import {Card, Icon} from "antd";
import {withRouter} from "react-router-dom";

const {Meta} = Card;

class CalendarSlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    viewSlide = () => {
        this.props.history.push(`/slide/view/${this.props.slide.id}`);
    };

    render() {
        const {slide} = this.props;

        const cover = (
            <i style={{background: "#657db6", textAlign: "center"}} className="material-icons md-light md-150">event</i>
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
            </Card>
        );
    }
}

CalendarSlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

CalendarSlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default withRouter(CalendarSlideCard);