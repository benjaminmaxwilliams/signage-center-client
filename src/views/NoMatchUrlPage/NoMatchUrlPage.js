import React from 'react';
import './NoMatchUrlPage.css';
import Exception from 'ant-design-pro/lib/Exception';
import {Button} from "antd";
import {FormattedMessage} from "react-intl";
import messages from "./messages";
import {NavLink} from "react-router-dom";

class NoMatchUrlPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Exception
                className="exception"
                type="404"
                title={<FormattedMessage {...messages.title} />}
                desc={<FormattedMessage {...messages.description} />}
                actions={
                    <Button>
                        <NavLink to="/login">
                            <FormattedMessage {...messages.actionRedirect} />
                        </NavLink>
                    </Button>}
            />
        );
    }
}

export default NoMatchUrlPage;
