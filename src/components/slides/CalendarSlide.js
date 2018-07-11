import React from "react";
import PropTypes from "prop-types";
import './CalendarSlide.css';
import {Calendar, Col, Row} from "antd";

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {slide} = this.props;

        return (
            <div>
                <Row gutter={8}>
                    <Col span={18}>
                        <div style={{height: "100vh"}}>
                            <Calendar/>
                        </div>
                    </Col>
                    <Col span={6}>
                        <h1>Events</h1>
                    </Col>
                </Row>
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