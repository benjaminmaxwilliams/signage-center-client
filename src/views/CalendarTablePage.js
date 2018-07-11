import React from 'react';
import './CalendarTablePage.css';
import {Button, Divider, Icon, notification, Popconfirm, Table} from "antd";
import calendarApi from "../api/CalendarApi";
import OfficeForm from "../components/forms/OfficeForm";

const ButtonGroup = Button.Group;

class CalendarTablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendars: [
                {id: 1, type: "GOOGLE", name: "Exton", officeName: "Exton"},
                {id: 2, type: "OUTLOOK", name: "GSC", officeName: "Exton"},
                {id: 3, type: "WORKDAY", name: "GSC Birthday", officeName: "Exton"},
                {id: 3, type: "INTERNAL", name: "Dev", officeName: "Exton"}
            ],
            newCalendarModalVisible: false
        };
    }

    componentWillMount() {
        // calendarApi.getAll()
        //     .then(calendars => {
        //         this.setState({calendars: calendars});
        //     });
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
     * Form Modal Success Callback
     */
    onCalendarFormSuccess = (newCalendar) => {
        const calendars = [...this.state.calendars];
        calendars.push(newCalendar);

        this.setState({newCalendarModalVisible: false, calendars: calendars});

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
                        return (<Icon type="schedule"/>)
                    }
                }
            },
            {
                title: 'Office',
                dataIndex: 'officeName',
                key: 'officeName',
                // render: (text, record) => <a href={`/admin/offices/${record.id}`}>{text}</a>,
            },
            // {
            //     title: 'Create Date',
            //     dataIndex: 'createdAt',
            //     key: 'createdAt',
            //     render: text => new Date(text).toLocaleDateString("en-US")
            // },
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

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={() => this.showModal("newCalendarModalVisible")}>
                        <Icon type="plus-circle"/>New
                    </Button>
                </ButtonGroup>
                <OfficeForm
                    visible={this.state.newCalendarModalVisible}
                    onSuccess={this.onCalendarFormSuccess}
                    onCancel={() => this.closeModal("newCalendarModalVisible")}/>
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
