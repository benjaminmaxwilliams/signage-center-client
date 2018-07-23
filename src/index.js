import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import indexRoutes from "./routes/index";
import NoMatchUrlPage from "./views/NoMatchUrlPage";
import PrivateRoute from "./routes/PrivateRoute";
// localization
import {LocaleProvider} from 'antd';
import {addLocaleData, IntlProvider} from "react-intl";

import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';
import {messages} from "./localization/messages";

addLocaleData([...locale_en, ...locale_es]);

ReactDOM.render(
    <LocaleProvider locale="en">
        <IntlProvider locale="en" messages={messages["en"]}>
            <BrowserRouter>
                <Switch>
                    {indexRoutes.map((prop, key) => {
                        if (prop.private) {
                            return <PrivateRoute exact={prop.exact} path={prop.path} key={key}
                                                 component={prop.component}/>;
                        } else {
                            return <Route exact={prop.exact} path={prop.path} key={key} component={prop.component}/>;
                        }
                    })}
                    <Route component={NoMatchUrlPage}/>
                </Switch>
            </BrowserRouter>
        </IntlProvider>
    </LocaleProvider>,
    document.getElementById('root'));
