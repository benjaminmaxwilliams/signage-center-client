import React from 'react';
import './CalendarPage.css';
import {Button, Calendar, Col, Divider, Icon, Modal, notification, Row} from "antd";
import * as calendarApi from "../../api/CalendarApi";
import {withRouter} from "react-router-dom";
import CalendarEvent from "../../components/calendar/CalendarEvent/CalendarEvent";
import InternalCalendarEventForm from "../../components/forms/InternalCalendarEventForm/InternalCalendarEventForm";
import moment from "moment";
import CalendarEventList from "../../components/calendar/CalendarEventList/CalendarEventList";
import GuidewireIcon from "../../assets/guidewire_icon_color_web.png";
import * as internalCalendarEventApi from "../../api/InternalCalendarEventApi";
import {FormattedDate, FormattedMessage, injectIntl} from 'react-intl';
import messages from "./messages";

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendar: {
                id: this.props.match.params.calendarId,
                name: "",
                description: "",
                events: [],
                type: "INTERNAL"
            },
            isLoading: false,
            internalCalendarEventModalVisible: false,
            selectedDate: moment()
        };

        this.onInternalCalendarEventFormSuccess = this.onInternalCalendarEventFormSuccess.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.onEventSelect = this.onEventSelect.bind(this);
        this.onDateSelect = this.onDateSelect.bind(this);
        this.handleEventDelete = this.handleEventDelete.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
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

    /**
     * Internal Calendar Event Form Callback
     *
     * @param newEvent
     */
    onInternalCalendarEventFormSuccess = (newEvent) => {
        const events = [...this.state.calendar.events];
        events.push(newEvent);

        const calendar = {...this.state.calendar};
        calendar.events = events;

        this.setState({internalCalendarEventModalVisible: false, calendar: calendar});

        notification["success"]({
            message: this.props.intl.formatMessage({...messages.eventCreated}),
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
            return moment(e.date).format("MM/DD/YYYY") === value.format("MM/DD/YYYY")
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

    /**
     * Calendar date selection callback
     *
     * @param value (moment)
     */
    onDateSelect = (value) => {
        this.setState({selectedDate: value});
    };

    /**
     * Calendar Event List Callback
     *
     * @param event (moment)
     */
    onEventSelect = (event) => {
        alert(event.name + " selected")
    };

    /**
     * Calendar Event List Item Delete Handler
     *
     * @param id
     */
    handleEventDelete = (id) => {
        confirm({
            title: this.props.intl.formatMessage({...messages.deleteModalTitle}),
            okText: this.props.intl.formatMessage({...messages.deleteModalOk}),
            cancelText: this.props.intl.formatMessage({...messages.deleteModalCancel}),
            okType: "danger",
            onOk: () => this.deleteEvent(id),
        });
    };

    deleteEvent = (id) => {
        return internalCalendarEventApi.deleteEvent(id)
            .then(() => {
                const calendar = {...this.state.calendar};
                calendar.events = calendar.events.filter(item => item.id !== id);
                this.setState({calendar: calendar});
                notification["success"]({
                    message: this.props.intl.formatMessage({...messages.eventDeleted}),
                });
            }).catch(error => {
                notification["error"]({
                    message: this.props.intl.formatMessage({...messages.error}),
                    description: error.message
                });
            });
    };

    /**
     * Retrieve an array of events for a certain date
     *
     * @param value (moment)
     * @returns {T[]} (array of events)
     */
    getEvents = (value) => {
        const {events} = this.state.calendar;
        return events.filter(e => moment(e.date).format("MM/DD/YYYY") === value.format("MM/DD/YYYY"))
    };

    render() {

        const {calendar, selectedDate} = this.state;

        let icon;
        switch (calendar.type) {
            case "INTERNAL": {
                icon = GuidewireIcon;
                break;
            }
            case "OUTLOOK": {
                break;
            }
            case "WORKDAY": {
                break;
            }
            case "GMAIL": {
                break;
            }
            default: {
                break;
            }
        }

        return (
            <div className="container">
                <h1>{calendar.name}</h1>
                <h3>{calendar.description}</h3>
                {icon &&
                <img className="calendar-icon" src={icon} alt=""/>
                }
                <InternalCalendarEventForm
                    calendarId={calendar.id}
                    defaultDate={selectedDate}
                    visible={this.state.internalCalendarEventModalVisible}
                    onSuccess={this.onInternalCalendarEventFormSuccess}
                    onCancel={() => this.closeModal("internalCalendarEventModalVisible")}/>
                <Divider dashed/>
                <ButtonGroup>
                    <Button type="primary" onClick={() => this.showModal("internalCalendarEventModalVisible")}>
                        <Icon type="plus-circle"/>
                        <FormattedMessage {...messages.addEvent}/>
                    </Button>
                </ButtonGroup>
                <div style={{height: "100%", overflow: "auto"}}>
                    <Row style={{height: "100%", overflow: "auto"}} gutter={16}>
                        <Col span={18}>
                            <Calendar
                                dateCellRender={this.dateCellRender}
                                onSelect={this.onDateSelect}/>
                        </Col>
                        <Col style={{height: "100%", overflow: "auto"}} span={6}>
                            <div className="event-list-section">
                                <h1 className="event-list-title">
                                    <FormattedDate
                                        value={selectedDate}
                                        year='2-digit'
                                        month='2-digit'
                                        day='2-digit'
                                    />
                                </h1>
                                <CalendarEventList
                                    events={this.getEvents(selectedDate)}
                                    onItemClick={this.onEventSelect}
                                    onItemDelete={this.handleEventDelete}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(injectIntl(CalendarPage));
