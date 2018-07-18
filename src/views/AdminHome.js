import React from "react";
import {Alert, Breadcrumb, Icon, Layout, Menu, Popconfirm} from 'antd';
import "./AdminHome.css"
import PlaylistTablePage from "./PlaylistTablePage";
import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import PlaylistPage from "./PlaylistPage";
import OfficeTablePage from "./OfficeTablePage";
import logo from "../assets/guidewire_logo_color_web.png";
import CalendarTablePage from "./CalendarTablePage";
import authApi from "../api/AuthApi";
import CalendarPage from "./CalendarPage";


const {Header, Content, Sider} = Layout;
const text = 'Are you sure delete this task?';

class AdminHome extends React.Component {
    constructor(props) {
        super(props);

    }
    onLogout = () =>{
        authApi.logout();
        this.props.history.push('/login');
    }

    render() {

        const {location} = this.props;

        const breadcrumbNameMap = {
            '/admin': 'Home',
            '/login' : 'Sign out',
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
                        {breadcrumbNameMap[url]}
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
                                {"Home"}
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="LOGOUT" style={{float: "right"}}>
                            <Popconfirm   title="Are you sure you want to logout?"
                                          onConfirm={() => this.onLogout()}>
                                {<span><Icon type="logout"/>Logout</span>}
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
                                    {<span><Icon type="home"/>Home</span>}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="PLAYLISTS">
                                <NavLink to="/admin/playlists">
                                    {<span><Icon type="play-circle"/>Playlists</span>}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="OFFICES">
                                <NavLink to="/admin/offices">
                                    {<span><Icon type="shop"/>Offices</span>}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="CALENDARS">
                                <NavLink to="/admin/calendars">
                                    {<span><Icon type="schedule"/>Calendars</span>}
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
                                <Route exact path="/admin/calendars" component={CalendarTablePage}/>
                                <Route path="/admin/calendars/:calendarId" component={CalendarPage}/>
                                <Route render={() => {
                                    return (
                                        <div>
                                            <h1>Welcome to SignageCenter!</h1>
                                            <Alert
                                                message="Information"
                                                description="No new updates."
                                                type="info"
                                                showIcon
                                            />
                                        </div>
                                    )
                                }}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AdminHome);