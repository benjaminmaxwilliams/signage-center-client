import React from "react";
import PropTypes from "prop-types";
import {List} from "antd";
import "./CalendarEventList.css"
import CalendarEventListItem from "./CalendarEventListItem";

class CalendarEventList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {events, onItemClick, onItemDelete} = this.props;

        return (
            <List
                itemLayout="horizontal"
                dataSource={events}
                renderItem={event => (
                    <CalendarEventListItem
                        event={event}
                        onClick={onItemClick}
                        onDelete={onItemDelete}/>
                )}
            />
        );
    }
}

CalendarEventList.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.number.optional,
            name: PropTypes.string.isRequired,
        })
    ),
    onItemClick: PropTypes.func,
    onItemDelete: PropTypes.func,
};

export default CalendarEventList;