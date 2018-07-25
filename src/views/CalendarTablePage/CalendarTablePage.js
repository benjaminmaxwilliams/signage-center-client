import React from 'react';
import './CalendarTablePage.css';
import {Button, Divider, Dropdown, Icon, Menu, notification, Popconfirm, Table} from "antd";
import * as calendarApi from "../../api/CalendarApi";
import InternalCalendarForm from "../../components/forms/InternalCalendarForm/InternalCalendarForm";
import GuidewireIcon from "../../assets/guidewire_icon_color_web.png";
import {FormattedDate, FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";
import * as moment from "moment";

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
            message: this.props.intl.formatMessage({...messages.createSuccess}),
        });
    };

    onDelete = (id) => {
        calendarApi.deleteCalendar(id)
            .then(() => {
                const calendars = [...this.state.calendars];
                this.setState({calendars: calendars.filter(item => item.id !== id)});
                notification["success"]({
                    message: this.props.intl.formatMessage({...messages.deleteSuccess}),
                });
            }).catch(error => {
            notification["error"]({
                message: this.props.intl.formatMessage({...messages.error}),
                description: error.message
            });
        });
    };

    render() {

        const {calendars} = this.state;

        const columns = [
            {
                title: <FormattedMessage {...messages.tableNameColumn}/>,
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/admin/calendars/${record.id}`}>{text}</a>,
            },
            {
                title: <FormattedMessage {...messages.tableTypeColumn}/>,
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
                        return (<img className="table-icon" alt="" src={GuidewireIcon}/>)
                    }
                }
            },
            {
                title: <FormattedMessage {...messages.tableOfficeColumn}/>,
                dataIndex: 'officeName',
                key: 'officeName',
                // render: (text, record) => <a href={`/admin/offices/${record.id}`}>{text}</a>,
            },
            {
                title: <FormattedMessage {...messages.tableCreateDateColumn}/>,
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => <FormattedDate value={moment(text)}/>
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {
                    return (
                        <Popconfirm
                            title={<FormattedMessage {...messages.deleteConfirm}/>}
                            onConfirm={() => this.onDelete(record.id)}
                        >
                            <a href="javascript:">
                                <FormattedMessage {...messages.deleteAction}/>
                            </a>
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
                        <Icon type="plus-circle"/><FormattedMessage {...messages.new}/>
                    </Button>
                </Dropdown>
                <InternalCalendarForm
                    visible={this.state.internalCalendarModalVisible}
                    onSuccess={this.onInternalCalendarFormSuccess}
                    onCancel={() => this.closeModal("internalCalendarModalVisible")}/>
                <Divider dashed/>
                <Table
                    rowKey="id"
                    title={() => <FormattedMessage {...messages.tableTitle}/>}
                    columns={columns}
                    bordered={true}
                    dataSource={calendars}/>
            </div>
        );
    }
}

export default injectIntl(CalendarTablePage);
