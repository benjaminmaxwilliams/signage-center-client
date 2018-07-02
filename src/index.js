import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import indexRoutes from "./routes";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component}/>;
            })}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
