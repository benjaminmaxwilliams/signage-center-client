import React from "react";
import "./SlideViewPage.css";
import EmptySlide from "../components/slides/EmptySlide";
import * as slideApi from "../api/SlideApi";
import Slide from "../components/slides/Slide";

/**
 * Display a singular slide as it would be displayed in a playlist
 */
class SlideViewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slide: null,
        };
    }

    componentWillMount() {
        const slideId = this.props.match.params.slideId;

        slideApi.getSlide(slideId)
            .then(slide => {
                this.setState({slide: slide});
            }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const {slide} = this.state;

        if (!slide) {
            return <EmptySlide/>
        }

        return (
            <div className="container">
                <Slide slide={slide}/>
            </div>
        );
    }
}

export default SlideViewPage;