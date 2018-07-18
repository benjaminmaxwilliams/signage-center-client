import React from "react";
import PropTypes from "prop-types";
import './CalendarSlide.css';
import {Col, Icon, Row} from "antd";
import moment from "moment";
import * as Scroll from 'react-scroll';

const Events = Scroll.Events;
const scroll = Scroll.animateScroll;

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        this.beginAutomatedScrolling();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    beginAutomatedScrolling = () => {

        scroll.scrollToBottom({
            containerId: "date1_1",
            smooth: true,
            delay: 3000,
            duration: 10000
        });

        scroll.scrollToBottom({
            containerId: "date1_2",
            smooth: true,
            delay: 3000,
            duration: 10000,
        });

        scroll.scrollToBottom({
            containerId: "date1_3",
            smooth: true,
            delay: 3000,
            duration: 10000
        });

        scroll.scrollToBottom({
            containerId: "date2_3",
            smooth: true,
            delay: 3000,
            duration: 10000
        });
    };

    getEvents = (date) => {
        const {slide} = this.props;
        const events = slide.events.filter(e => moment(e.date).format("MM/DD/YYYY") === date.format("MM/DD/YYYY"));

        return (
            <ul>
                {events.map(e =>
                    <li className={e.type.toLowerCase() + "-event"} key={e.id}>
                        {e.name}
                        {!e.allDay &&
                        <div>
                            <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                            {moment(e.date).format("HH:mm")}
                        </div>
                        }
                    </li>
                )}
            </ul>
        )
    };

    render() {
        // week one dates
        const date1_1 = moment();
        const date1_2 = moment().add(1, "days");
        const date1_3 = moment().add(2, "days");
        const date1_4 = moment().add(3, "days");
        const date1_5 = moment().add(4, "days");

        // week two dates
        const date2_1 = moment().add(7, "days");
        const date2_2 = moment().add(8, "days");
        const date2_3 = moment().add(9, "days");
        const date2_4 = moment().add(10, "days");
        const date2_5 = moment().add(11, "days");

        return (
            <div className="calendar-container">
                <Row className="date-row" type="flex" justify="center">
                    <Col className="date-row-col-today" span={4}>
                        <h1>{date1_1.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date1_2.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date1_3.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date1_4.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date1_5.format("MM/DD")}</h1>
                    </Col>
                </Row>
                <Row className="event-row" type="flex" justify="center">
                    <Col className="event-row-col-today" span={4}>
                        <div id="date1_1" className="calendar-slide-events">
                            {this.getEvents(date1_1)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date1_2" className="calendar-slide-events">
                            {this.getEvents(date1_2)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date1_3" className="calendar-slide-events">
                            {this.getEvents(date1_3)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date1_4" className="calendar-slide-events">
                            {this.getEvents(date1_4)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date1_5" className="calendar-slide-events">
                            {this.getEvents(date1_5)}
                        </div>
                    </Col>
                </Row>
                <Row className="date-row" type="flex" justify="center">
                    <Col className="date-row-col" span={4}>
                        <h1>{date2_1.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date2_2.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date2_3.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date2_4.format("MM/DD")}</h1>
                    </Col>
                    <Col className="date-row-col" span={4}>
                        <h1>{date2_5.format("MM/DD")}</h1>
                    </Col>
                </Row>
                <Row className="event-row" type="flex" justify="center">
                    <Col className="event-row-col" span={4}>
                        <div id="date2_1" className="calendar-slide-events">
                            {this.getEvents(date2_1)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date2_2" className="calendar-slide-events">
                            {this.getEvents(date2_2)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date2_3" className="calendar-slide-events">
                            {this.getEvents(date2_3)}
                        </div>
                    </Col>
                    <Col className="event-row-col" span={4}>
                        <div id="date2_4" className="calendar-slide-events">
                            {this.getEvents(date2_4)}
                        </div>
                    </Col>
                    <Col id="date2_5" className="event-row-col" span={4}>
                        <div className="calendar-slide-events">
                            {this.getEvents(date2_5)}
                        </div>
                    </Col>
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