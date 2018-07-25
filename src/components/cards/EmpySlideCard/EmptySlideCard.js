import React from "react";
import "./EmpySlideCard.css";
import PropTypes from "prop-types";
import {Card, Icon} from "antd";
import {withRouter} from "react-router-dom";
import FormattedDuration from "react-intl-formatted-duration";

const {Meta} = Card;

class EmptySlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    viewSlide = () => {
        this.props.history.push(`/slide/view/${this.props.slide.id}`);
    };

    render() {
        const {slide} = this.props;

        const cover = (
            <i style={{background: "#657db6", textAlign: "center"}}
               className="material-icons md-light md-150">help_outline</i>
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
                <Meta title={slide.name}/>
                <div style={{marginTop: 10}}>
                    <span style={{marginTop: 10, marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                        <FormattedDuration seconds={slide.duration} textComponent={(props) => <span {...props} />}/>
                    </span>
                </div>
            </Card>
        );
    }
}

EmptySlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

EmptySlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default withRouter(EmptySlideCard);