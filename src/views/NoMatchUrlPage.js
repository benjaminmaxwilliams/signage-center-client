import React from 'react';
import './NoMatchUrlPage.css';
import Exception from 'ant-design-pro/lib/Exception';
import {Button} from "antd";

class NoMatchUrlPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <Exception
                    type="404"
                    title="Error"
                    desc="Not a valid url"
                    actions={<Button>Ok</Button>}/>
            </div>
        );
    }
}

export default NoMatchUrlPage;
