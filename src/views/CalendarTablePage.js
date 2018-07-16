import React from 'react';
import './CalendarTablePage.css';
import {Button, Divider, Dropdown, Icon, Menu, notification, Popconfirm, Table} from "antd";
import calendarApi from "../api/CalendarApi";
import InternalCalendarForm from "../components/forms/InternalCalendarForm";
import GuidewireIcon from "../assets/guidewire_icon_color_web.png";

class CalendarTablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendars: [],
            internalCalendarModalVisible: false
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.onInternalCalendarFormSuccess = this.onInternalCalendarFormSuccess.bind(this);
    }

    componentWillMount() {
        calendarApi.getAll()
            .then(calendars => {
                this.setState({calendars: calendars});
            });
    }

    handleMenuClick = (e) => {
        if (e.key === "1") {
            this.showModal("internalCalendarModalVisible");
        }
        // } else if (e.key === "2") {
        //     this.showModal("calendarFormVisible");
        // } else if (e.key === "3") {
        //     this.showModal("mapFormVisible");
        // } else if (e.key === "4") {
        //     this.showModal("weatherFormVisible");
        // }
    };

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

    onInternalCalendarFormSuccess = (newCalendar) => {
        const calendars = [...this.state.calendars];
        calendars.push(newCalendar);

        this.setState({internalCalendarModalVisible: false, calendars: calendars});

        notification["success"]({
            message: 'Calendar Created',
        });
    };

    onDelete = (id) => {
        calendarApi.delete(id)
            .then(() => {
                const calendars = [...this.state.calendars];
                this.setState({calendars: calendars.filter(item => item.id !== id)});
                notification["success"]({
                    message: 'Calendar Deleted',
                });
            }).catch(error => {
            notification["error"]({
                message: 'Error',
                description: error.message
            });
        });
    };

    render() {

        const {calendars} = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/admin/calendars/${record.id}`}>{text}</a>,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => {
                    if (record.type === "GOOGLE") {
                        return (<Icon type="google"/>)
                    } else if (record.type === "OUTLOOK") {
                        return (<Icon type="windows"/>)
                    } else if (record.type === "WORKDAY") {
                        return (<Icon type="aliyun"/>)
                    } else {
                        return (<img className="table-icon" src={GuidewireIcon}/>)
                    }
                }
            },
            {
                title: 'Office',
                dataIndex: 'officeName',
                key: 'officeName',
                // render: (text, record) => <a href={`/admin/offices/${record.id}`}>{text}</a>,
            },
            {
                title: 'Create Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => new Date(text).toLocaleDateString("en-US")
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {
                    return (
                        <Popconfirm title="Are you sure?" onConfirm={() => this.onDelete(record.id)}>
                            <a href="javascript:">Delete</a>
                        </Popconfirm>
                    )
                }
            }
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">Internal Calendar</Menu.Item>
                {/*<Menu.Item key="2">Outlook Calendar</Menu.Item>*/}
                {/*<Menu.Item key="3">Workday Calendar</Menu.Item>*/}
                {/*<Menu.Item key="4">Google Calendar</Menu.Item>*/}
            </Menu>
        );

        return (
            <div className="container">
                <Dropdown overlay={menu}>
                    <Button type="primary">
                        <Icon type="plus-circle"/>New
                    </Button>
                </Dropdown>
                <InternalCalendarForm
                    visible={this.state.internalCalendarModalVisible}
                    onSuccess={this.onInternalCalendarFormSuccess}
                    onCancel={() => this.closeModal("internalCalendarModalVisible")}/>
                <Divider dashed/>
                <Table
                    title={() => 'Calendars'}
                    columns={columns}
                    bordered={true}
                    dataSource={calendars}/>
            </div>
        );
    }
}

export default CalendarTablePage;
