import React from "react";
import PropTypes from "prop-types";
import {Badge, Icon} from "antd";
import "./CalendarEvent.css";

/**
 * Component to be displayed within the calendar day
 */
class CalendarEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {event} = this.props;

        let icon;
        let color;

        switch (event.type) {
            case "GENERAL": {
                color = "#00739d";
                icon = "notification";
                break;
            }
            case "ANNIVERSARY": {
                color = "#14b14b";
                icon = "gift";
                break;
            }
            case "BIRTHDAY": {
                color = "#14b14b";
                icon = "gift";
                break;
            }
            case "MEETING": {
                color = "#f5861f";
                icon = "solution";
                break;
            }
            default: {
                color = "#CCCCCC";
                icon = "notification";
                break;
            }
        }

        return (
            <Badge dot style={{backgroundColor: color}} text={event.name}>
                {icon &&
                <Icon type={icon}/>
                }
            </Badge>
        );
    }
}

CalendarEvent.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.number.optional,
        name: PropTypes.string.isRequired,
    })
};

export default CalendarEvent;