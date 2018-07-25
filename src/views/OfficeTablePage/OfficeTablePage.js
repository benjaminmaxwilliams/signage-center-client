import React from 'react';
import './OfficeTablePage.css';
import {Button, Divider, Icon, notification, Popconfirm, Table} from "antd";
import * as officeApi from "../../api/OfficeApi";
import OfficeForm from "../../components/forms/OfficeForm/OfficeForm";
import {FormattedDate, FormattedMessage} from "react-intl";
import messages from "./messages";
import * as moment from "moment";

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
    onOfficeFormSuccess = (newOffice) => {
        const offices = [...this.state.offices];
        offices.push(newOffice);

        this.setState({newOfficeModalVisible: false, offices: offices});

        notification["success"]({
            message: <FormattedMessage {...messages.createSuccess} />,
        });
    };

    onDelete = (id) => {
        officeApi.deleteOffice(id)
            .then(() => {
                const offices = [...this.state.offices];
                this.setState({offices: offices.filter(item => item.id !== id)});
                notification["success"]({
                    message: <FormattedMessage {...messages.deleteSuccess} />,
                });
            }).catch(error => {
            notification["error"]({
                message: <FormattedMessage {...messages.error} />,
                description: error.message
            });
        });
    };

    render() {

        const {offices} = this.state;

        const columns = [
            {
                title: <FormattedMessage {...messages.nameColumn} />,
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a href={`/admin/offices/${record.id}`}>{text}</a>,
            },
            {
                title: <FormattedMessage {...messages.createDateColumn} />,
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
                            title={<FormattedMessage {...messages.deleteConfirm} />}
                            onConfirm={() => this.onDelete(record.id)}>
                            <a href="javascript:">
                                <FormattedMessage {...messages.deleteAction} />
                            </a>
                        </Popconfirm>
                    )
                }
            }
        ];

        return (
            <div className="container">
                <ButtonGroup>
                    <Button type="primary" onClick={() => this.showModal("newOfficeModalVisible")}>
                        <Icon type="plus-circle"/>
                        <FormattedMessage {...messages.new} />
                    </Button>
                </ButtonGroup>
                <OfficeForm
                    visible={this.state.newOfficeModalVisible}
                    onSuccess={this.onOfficeFormSuccess}
                    onCancel={() => this.closeModal("newOfficeModalVisible")}/>
                <Divider dashed/>
                <Table
                    rowKey="id"
                    title={() => <FormattedMessage {...messages.tableTitle} />}
                    columns={columns}
                    bordered={true}
                    dataSource={offices}/>
            </div>
        );
    }
}

export default OfficeTablePage;
