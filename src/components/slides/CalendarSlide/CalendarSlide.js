import React from "react";
import PropTypes from "prop-types";
import './CalendarSlide.css';
import {Col, Icon, Row} from "antd";
import moment from "moment";
import * as Scroll from 'react-scroll';
import {FormattedDate} from "react-intl";

const Events = Scroll.Events;
const scroll = Scroll.animateScroll;

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);

        // week one
        const weekOneStart = moment().startOf("week");
        const weekOneEnd = moment().endOf("week");
        let weekOneDates = [];
        while (weekOneEnd > weekOneStart || weekOneStart.format('MM/DD') === weekOneEnd.format('MM/DD')) {
            weekOneDates.push(weekOneStart.add(1, 'days').clone());
        }

        // week two
        const weekTwoStart = moment().add(1, "week").startOf("week");
        const weekTwoEnd = moment().add(1, "week").endOf("week");
        let weekTwoDates = [];
        while (weekTwoEnd > weekTwoStart || weekTwoStart.format('MM/DD') === weekTwoEnd.format('MM/DD')) {
            weekTwoDates.push(weekTwoStart.add(1, 'days').clone());
        }

        this.state = {
            weekOneDates: weekOneDates,
            weekTwoDates: weekTwoDates
        }
    }

    componentDidMount() {
        this.beginAutomatedScrolling();
    }

    /**
     * Starts the scrolling of the event lists if there is overflow
     */
    beginAutomatedScrolling = () => {
        const {weekOneDates, weekTwoDates} = this.state;

        let dates = weekOneDates.concat(weekTwoDates);

        let promiseChain = [];
        for (let i = 0; i < dates.length; i++) {
            promiseChain.push(this.scrollEventList(dates[i].format("MM/DD")));
        }

        Promise.all(promiseChain);
    };

    /**
     * Scrolls the event list to the bottom and back to top
     *
     * @param eventListId
     * @returns {Promise<any>}
     */
    scrollEventList = (eventListId) => {

        let scrollContainer = new Promise((resolve, reject) => {

            Events.scrollEvent.register('end', () => {
                resolve();
                Events.scrollEvent.remove('end');
            });

            scroll.scrollToBottom({
                containerId: eventListId,
                smooth: true,
                delay: 5000,
                duration: 10000
            });
        });

        scrollContainer.then(() =>
            scroll.scrollToTop({
                containerId: eventListId,
                smooth: true,
                delay: 5000,
                duration: 10000
            })
        );

        return scrollContainer;
    };

    /**
     * Retrieve the events for the specified date
     *
     * @param date
     * @returns {*}
     */
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
                            <FormattedDate value={e.date} hour="numeric" minute="numeric"/>
                        </div>
                        }
                    </li>
                )}
            </ul>
        )
    };

    getDateColStyle = (date) => {
        let className = "date-row-col";

        if (this.isToday(date)) {
            className = "date-row-col-today"
        }

        // else if (this.isWeekend(date)) {
        //     className = "date-row-col-weekend"
        // }

        return className;
    };

    getEventColStyle = (date) => {
        let className = "event-row-col";

        if (this.isToday(date)) {
            className = "event-row-col-today"
        }

        // else if (this.isWeekend(date)) {
        //     className = "event-row-col-weekend"
        // }

        return className;
    };

    /**
     * Check if date is today
     *
     * @param date
     * @returns {boolean}
     */
    isToday = (date) => {
        const today = moment();
        return date.format("MM/DD") === today.format("MM/DD");
    };

    /**
     * Check if date is a weekend date
     *
     * @param date
     * @returns {boolean}
     */
    isWeekend = (date) => {
        const day = date.day();
        return day === 6 || day === 0;
    };

    render() {
        const {weekOneDates, weekTwoDates} = this.state;

        return (
            <div className="calendar-container">
                <Row className="date-row" type="flex" justify="center">
                    {weekOneDates.map(m => {
                        return (
                            <Col id={m.format("MM/DD")} className={this.getDateColStyle(m)} span={3}>
                                <h1>
                                    <FormattedDate value={m} month="2-digit" day="2-digit"/>
                                </h1>
                            </Col>
                        );
                    })}
                </Row>
                <Row className="event-row" type="flex" justify="center">
                    {weekOneDates.map(m => {
                        return (
                            <Col id={m.format("MM/DD")} className={this.getEventColStyle(m)} span={3}>
                                <div className="calendar-slide-events">
                                    {this.getEvents(m)}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                <Row className="date-row" type="flex" justify="center">
                    {weekTwoDates.map(m => {
                        return (
                            <Col id={m.format("MM/DD")} className={this.getDateColStyle(m)} span={3}>
                                <h1>
                                    <FormattedDate value={m} month="2-digit" day="2-digit"/>
                                </h1>
                            </Col>
                        );
                    })}
                </Row>
                <Row className="event-row" type="flex" justify="center">
                    {weekTwoDates.map(m => {
                        return (
                            <Col id={m.format("MM/DD")} className={this.getEventColStyle(m)} span={3}>
                                <div className="calendar-slide-events">
                                    {this.getEvents(m)}
                                </div>
                            </Col>
                        );
                    })}
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