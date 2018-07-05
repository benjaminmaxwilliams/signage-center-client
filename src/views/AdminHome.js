import React from "react";
import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import "./AdminHome.css"
import PlaylistTablePage from "./PlaylistTablePage";
import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import PlaylistPage from "./PlaylistPage";
import OfficeTablePage from "./OfficeTablePage";

const { Header, Content, Sider } = Layout;

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {location} = this.props;

        const breadcrumbNameMap = {
            '/admin': 'Home',
            '/admin/playlists': 'Playlists',
            '/admin/offices': 'Offices',
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
        if (location.pathname.startsWith("/admin/offices")) {
            selectedMenuKeys = ["2"];
        } else if (location.pathname.startsWith("/admin/playlists")) {
            selectedMenuKeys = ["1"];
        }

        return (
            <Layout className="container">
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}>
                        <Menu.Item key="1">
                            <NavLink to="/admin">
                                {"Home"}
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout className="container">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                            selectedKeys={selectedMenuKeys}>
                            <Menu.Item key="1">
                                <NavLink to="/admin/playlists">
                                    {<span><Icon type="play-circle"/>Playlists</span>}
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/admin/offices">
                                    {<span><Icon type="shop"/>Offices</span>}
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100vh'}}>
                            <Switch>
                                <Route exact path="/admin/playlists" component={PlaylistTablePage}/>
                                <Route exact path="/admin/playlists/:playlistId" component={PlaylistPage}/>
                                <Route exact path="/admin/offices" component={OfficeTablePage}/>
                                <Route render={() => <div>Welcome</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AdminHome);