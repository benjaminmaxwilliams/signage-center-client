import React from 'react';
import './OfficeTablePage.css';
import {Button, Divider, Icon, notification, Popconfirm, Table} from "antd";
import officeApi from "../api/OfficeApi";
import OfficeForm from "../components/forms/OfficeForm";

const ButtonGroup = Button.Group;

class OfficeTablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offices: [],
            newOfficeModalVisible: false
        };
    }

    componentWillMount() {
        officeApi.getAll()
            .then(offices => {
                this.setState({offices: offices});
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
     * Form Modal Success Callback
     */
    onOfficeFormSuccess = (success) => {
        if (success) {
            this.setState({newOfficeModalVisible: false});
            notification["success"]({
                message: 'Office Created',
            });
        }
    };

    onDelete = (id) => {
        officeApi.deleteOffice(id)
            .then(() => {
                const offices = [...this.state.offices];
                this.setState({offices: offices.filter(item => item.id !== id)});
                notification["success"]({
                    message: 'Office Deleted',
                });
            }).catch(error => {
            notification["error"]({
                message: 'Error',
                description: error.message
            });
        });
    };

    render() {

        const {offices} = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={() => this.showModal("newOfficeModalVisible")}>
                        <Icon type="plus-circle"/>New
                    </Button>
                </ButtonGroup>
                <OfficeForm
                    visible={this.state.newOfficeModalVisible}
                    onSuccess={this.onOfficeFormSuccess}
                    onCancel={() => this.closeModal("newOfficeModalVisible")}/>
                <Divider dashed/>
                <Table
                    title={() => 'Offices'}
                    columns={columns}
                    bordered={true}
                    dataSource={offices}/>
            </div>
        );
    }
}

export default OfficeTablePage;
