import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Dropdown, Icon, List, Menu} from "antd";
import "./CalendarEventListItem.css"
import moment from "moment";

class CalendarEventListItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick = (e) => {
        const {onDelete, event} = this.props;

        if (e.key === "1") {

        } else if (e.key === "2") {
            onDelete(event.id);
        }
    };

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

        // event menu options
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">View/Edit</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
        );

        // determine the time of day for the event
        let time = "All Day";
        if (!event.allDay) {
            time = moment(event.date).format("HH:mm");
        }

        return (
            <List.Item
                key={event.id}
                actions={[
                    <span>
                        <Dropdown overlay={menu}>
                          <Button shape="circle" icon="ellipsis"/>
                        </Dropdown>
                    </span>,
                ]}>
                <List.Item.Meta
                    avatar={<Avatar icon={icon} style={{backgroundColor: color}}/>}
                    title={<a href="#" onClick={() => this.props.onClick(event)}>{event.name}</a>}
                    description={
                        <span style={{marginTop: 15}}>
                            {event.description}
                            <div>
                                <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                                {time}
                            </div>
                        </span>
                    }
                />
            </List.Item>
        );
    }
}

CalendarEventListItem.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.number.optional,
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        allDay: PropTypes.bool.isRequired
    }),
    onClick: PropTypes.func,
    onDelete: PropTypes.func
};

export default CalendarEventListItem;