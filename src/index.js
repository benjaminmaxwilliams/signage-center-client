import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route,Redirect,Switch} from "react-router-dom";
import indexRoutes from "./routes/index";
import NoMatchUrlPage from "./views/NoMatchUrlPage";
import authService from "./api/AuthService";
const Auth = new authService();
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.loggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                console.log(prop.path);
                if(prop.path == '/login' || prop.path == '/' || prop.path == '/signup'){
                    return <Route exact={prop.exact} path={prop.path} key={key} component={prop.component}/>;

                }
                else {
                    return <PrivateRoute exact={prop.exact} path={prop.path} key={key} component={prop.component}/>;
                }
            })}
            <Route component={NoMatchUrlPage}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
