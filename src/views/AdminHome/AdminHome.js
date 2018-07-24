import React from "react";
import {Alert} from 'antd';
import "./AdminHome.css"
import {FormattedMessage} from 'react-intl';
import messages from "./messages";


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
                    message={<FormattedMessage {...messages.alertTitle}/>}
                    description={<FormattedMessage {...messages.alertDescription} />}
                    type="info"
                    showIcon
                />
            </div>
        );
    }
}

export default AdminHome;