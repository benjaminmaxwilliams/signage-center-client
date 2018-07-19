import React from "react";
import "./ImageSlideCard.css";
import PropTypes from "prop-types";
import {Card, Icon} from "antd";
import {withRouter} from "react-router-dom";

const {Meta} = Card;

class ImageSlideCard extends React.Component {
    constructor(props) {
        super(props);
    }

    viewSlide = () => {
        this.props.history.push(`/slide/view/${this.props.slide.id}`);
    };

    render() {
        const {slide} = this.props;

        const cover = (
            <img alt="" src={slide.imageUrl}/>
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
                {slide.text &&
                <span style={{marginRight: 15}}>
                            <Icon type="message" style={{marginRight: 8}}/>
                    {slide.text}
                        </span>
                }
            </Card>
        );
    }
}

ImageSlideCard.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        text: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

ImageSlideCard.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default withRouter(ImageSlideCard);