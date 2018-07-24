import React from "react";
import {Breadcrumb, Icon, Layout, Menu, Popconfirm} from 'antd';
import "./AdminDashboard.css"
import PlaylistTablePage from "../PlaylistTablePage/PlaylistTablePage";
import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import OfficeTablePage from "../OfficeTablePage/OfficeTablePage";
import logo from "../../assets/guidewire_logo_color_web.png";
import CalendarTablePage from "../CalendarTablePage/CalendarTablePage";
import * as authApi from "../../api/AuthApi";
import CalendarPage from "../CalendarPage/CalendarPage";
import OfficePage from "../OfficePage/OfficePage";
import {FormattedMessage} from 'react-intl';
import AdminHome from "../AdminHome/AdminHome";
import messages from "./messages";

const {Header, Content, Sider} = Layout;

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogout = () =>{
        authApi.logout();
        this.props.history.push('/login');
    };

    render() {

        const {location} = this.props;

        const breadcrumbNameMap = {
            '/admin': 'Home',
            '/admin/playlists': 'Playlists',
            '/admin/offices': 'Offices',
            '/admin/calendars': 'Calendars',
        };

        const pathSnippets = location.pathname.split('/').filter(i => i);
        const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url] ? breadcrumbNameMap[url] : "TODO"}
                    </Link>
                </Breadcrumb.Item>
            );
        });

        let selectedMenuKeys = [];
        if (location.pathname.startsWith("/admin/calendars")) {
            selectedMenuKeys = ["CALENDARS"];
        } else if (location.pathname.startsWith("/admin/offices")) {
            selectedMenuKeys = ["OFFICES"];
        } else if (location.pathname.startsWith("/admin/playlists")) {
            selectedMenuKeys = ["PLAYLISTS"];
        } else if (location.pathname.startsWith("/admin")) {
            selectedMenuKeys = ["HOME"];
        }

        return (
            <Layout style={{position: "absolute", width: "100%", height: "100%"}} className="container">
                <Header className="header">
                    <img className="logo" src={logo} alt=""/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['HOME']}
                        selectedKeys={["HOME"]}
                        style={{lineHeight: '64px'}}>
                        <Menu.Item key="HOME">
                            <NavLink to="/admin">
                                <FormattedMessage {...messages.menuHome}/>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="LOGOUT" style={{float: "right"}}>
                            <Popconfirm title={<FormattedMessage {...messages.logoutConfirm}/>}
                                        onConfirm={() => this.onLogout()}
                            >
                                <span>
                                    <Icon type="logout"/>
                                    <FormattedMessage {...messages.logout}/>
                                </span>
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout className="container">
                    <Sider width={250} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            style={{height: '100%', borderRight: 0}}
                            selectedKeys={selectedMenuKeys}>
                            <Menu.Item key="HOME">
                                <NavLink to="/admin">
                                    <span>
                                        <Icon type="home"/>
                                        <FormattedMessage {...messages.menuHome}/>
                                    </span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="OFFICES">
                                <NavLink to="/admin/offices">
                                    <span>
                                        <Icon type="shop"/>
                                        <FormattedMessage {...messages.menuOffices}/>
                                    </span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="CALENDARS">
                                <NavLink to="/admin/calendars">
                                    <span>
                                        <Icon type="schedule"/>
                                        <FormattedMessage {...messages.menuCalendars}/>
                                    </span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="PLAYLISTS">
                                <NavLink to="/admin/playlists">
                                    <span>
                                        <Icon type="play-circle"/>
                                        <FormattedMessage {...messages.menuPlaylists}/>
                                    </span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{margin: '24px 16px 0'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff',
                            padding: 24,
                            margin: "5px",
                            minHeight: 280,
                            height: "100%",
                            overflow: "auto"
                        }}>
                            <Switch>
                                <Route exact path="/admin/playlists" component={PlaylistTablePage}/>
                                <Route exact path="/admin/playlists/:playlistId" component={PlaylistPage}/>
                                <Route exact path="/admin/offices" component={OfficeTablePage}/>
                                <Route exact path="/admin/offices/:officeId" component={OfficePage}/>
                                <Route exact path="/admin/calendars" component={CalendarTablePage}/>
                                <Route exact path="/admin/calendars/:calendarId" component={CalendarPage}/>
                                <Route componenent={AdminHome}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AdminDashboard);