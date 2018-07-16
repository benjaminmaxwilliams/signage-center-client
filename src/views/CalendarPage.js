import React from 'react';
import './CalendarPage.css';
import {Calendar, Divider, notification} from "antd";
import calendarApi from "../api/CalendarApi";
import {withRouter} from "react-router-dom";
import CalendarEvent from "../components/CalendarEvent";
import InternalCalendarEventForm from "../components/forms/InternalCalendarEventForm";

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendar: {
                id: this.props.match.params.calendarId,
                name: "",
                description: "",
                events: []
            },
            isLoading: false,
            internalCalendarEventModalVisible: false,
            selectedDate: null
        };

        this.onInternalCalendarEventFormSuccess = this.onInternalCalendarEventFormSuccess.bind(this);
    }

    componentWillMount() {
        let calendarId = this.props.match.params.calendarId;

        calendarApi.getCalendar(calendarId)
            .then(calendar => {
                this.setState({calendar: calendar});
            })
            .catch(error => {
                this.props.history.push("/admin/calendars");
            });
    }

    showModal = (formVisible) => {
        this.setState({
            [formVisible]: true,
        });
    };

    closeModal = (formVisible) => {
        this.setState({
            [formVisible]: false,
        });
    };

    onInternalCalendarEventFormSuccess = (newEvent) => {
        const events = [...this.state.calendar.events];
        events.push(newEvent);

        const calendar = {...this.state.calendar};
        calendar.events = events;

        this.setState({internalCalendarEventModalVisible: false, calendar: calendar});

        notification["success"]({
            message: 'Event Created',
        });
    };

    /**
     * Render date cell components
     *
     * @param value (moment)
     */
    dateCellRender = (value) => {
        const {events} = this.state.calendar;

        const data = events.filter(e => {
            return e.date === value.format("YYYY-MM-DD")
        });
        return (
            <ul className="events">
                {
                    data.map(item => (
                        <li key={item.id}>
                            <CalendarEvent
                                event={item}/>
                        </li>
                    ))
                }
            </ul>
        );
    };

    onDateSelect = (value) => {
        this.showModal("internalCalendarEventModalVisible");
    };

    render() {

        const {calendar} = this.state;

        return (
            <div className="container">
                <h1>{calendar.name}</h1>
                <h3>{calendar.description}</h3>
                <InternalCalendarEventForm
                    calendarId={calendar.id}
                    visible={this.state.internalCalendarEventModalVisible}
                    onSuccess={this.onInternalCalendarEventFormSuccess}
                    onCancel={() => this.closeModal("internalCalendarEventModalVisible")}/>
                <Divider dashed/>
                <div>
                    <Calendar
                        dateCellRender={this.dateCellRender}
                        onSelect={this.onDateSelect}/>
                </div>
            </div>
        );
    }
}

export default withRouter(CalendarPage);
