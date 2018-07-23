import React from 'react';
import './OfficePage.css';
import {Divider, Modal, notification} from "antd";
import * as officeApi from "../api/OfficeApi";
import {withRouter} from "react-router-dom";

const confirm = Modal.confirm;

class OfficePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            office: {
                id: this.props.match.params.playlistId,
                name: "",
            },
            isLoading: false,
        };
    }

    componentWillMount() {
        let officeId = this.props.match.params.officeId;

        officeApi.getOffice(officeId)
            .then(office => {
                this.setState({office: office});
            })
            .catch(error => {
                notification["error"]({
                    message: 'Error retrieving office',
                    description: error.message
                });
                this.props.history.push("/admin/offices");
            });
    }

    render() {
        const {office} = this.state;

        return (
            <div className="container">
                <h1>{office.name}</h1>
                <Divider dashed/>
            </div>
        );
    }
}

export default withRouter(OfficePage);
