import React from "react";
import PropTypes from "prop-types";
import './CalendarSlide.css';
import {Col, Row} from "antd";

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gutter-example">
                <Row gutter={2} style={{height: "10%"}}>
                    <Col span={2}/>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Monday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Tuesday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Wednesday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Thursday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Friday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col span={2}/>
                </Row>
                <Row gutter={2} style={{height: "40%"}}>
                    <Col span={2}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col span={2}/>
                </Row>
                <Row gutter={2} style={{height: "10%"}}>
                    <Col span={2}/>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Monday</h4>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Tuesday</h4>
                        <ul>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                            <li>Example Item</li>
                        </ul>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Wednesday</h4>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Thursday</h4>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <h4 className="gutter-box">Friday</h4>
                    </Col>
                    <Col span={2}/>
                </Row>
                <Row gutter={2} style={{height: "40%"}}>
                    <Col span={2}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col className="gutter-row" span={4}/>
                    <Col span={2}/>
                </Row>
            </div>
        );
    }
}

CalendarSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired
    })
};

export default CalendarSlide;