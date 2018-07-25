import React from 'react';
import './OfficePage.css';
import {Divider, notification} from "antd";
import * as officeApi from "../../api/OfficeApi";
import {withRouter} from "react-router-dom";
import messages from "./messages";
import {FormattedMessage} from "react-intl";

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
                    message: <FormattedMessage {...messages.errorRetrieve} />,
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
