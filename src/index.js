import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import indexRoutes from "./routes/index";
import NoMatchUrlPage from "./views/NoMatchUrlPage";
import PrivateRoute from "./routes/PrivateRoute";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                console.log(prop.path);
                if (prop.private) {
                    return <PrivateRoute exact={prop.exact} path={prop.path} key={key} component={prop.component}/>;
                } else {
                    return <Route exact={prop.exact} path={prop.path} key={key} component={prop.component}/>;
                }
            })}
            <Route component={NoMatchUrlPage}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));
