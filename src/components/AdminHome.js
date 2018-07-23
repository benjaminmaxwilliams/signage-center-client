import React from "react";
import {Alert} from 'antd';
import "./AdminHome.css"
import {defineMessages, FormattedMessage} from 'react-intl';

const messages = defineMessages({
    title: {
        id: "admin.home.title",
        defaultMessage: "Welcome to SignageCenter"
    },
    alertTitle: {
        id: "admin.home.alert.title",
        defaultMessage: "Information"
    },
    alertDescription: {
        id: "admin.home.alert.description",
        defaultMessage: "No new updates."
    },
});

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>
                    <FormattedMessage {...messages.title} />
                </h1>
                <Alert
                    message={<FormattedMessage {...messages.alertTitle} />}
                    description={<FormattedMessage {...messages.alertDescription} />}
                    type="info"
                    showIcon
                />
            </div>
        );
    }
}

export default AdminHome;