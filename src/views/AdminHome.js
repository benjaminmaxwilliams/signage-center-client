import React from "react";
import {Layout, Menu, Breadcrumb, Icon, Row, Col} from 'antd';
import "./AdminHome.css"
import ImageSlideForm from "../components/forms/ImageSlideForm";
import MapSlideForm from "../components/forms/MapSlideForm";
import WeatherSlide from "../components/slides/WeatherSlide";
import WeatherSlideForm from "../components/forms/WeatherSlideForm";
import PlaylistTablePage from "./PlaylistTablePage";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class AdminHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeComponent: <h1></h1>
        }
    }

    handleMenuSelect = (e) => {
        let component;

        if (e.key === "5") {
            component = <PlaylistTablePage/>
        } else if (e.key === "9") {
            component = <ImageSlideForm/>
        } else if (e.key === "11") {
            component = <MapSlideForm/>
        } else if (e.key === "12") {
            component = <WeatherSlideForm/>
        } else {
            component = <h1>Container</h1>
        }

        this.setState({activeComponent: component})
    };

    render() {
        return (
            <Layout className="container">
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                    </Menu>
                </Header>
                <Layout className="container">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onSelect={this.handleMenuSelect}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="laptop" />Displays</span>}>
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            {/*<SubMenu key="sub2" title={<span><Icon type="play-circle" />Playlists</span>}>*/}
                                {/*<Menu.Item key="5">option5</Menu.Item>*/}
                                {/*<Menu.Item key="6">option6</Menu.Item>*/}
                                {/*<Menu.Item key="7">option7</Menu.Item>*/}
                                {/*<Menu.Item key="8">option8</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            <Menu.Item key="5">{<span><Icon type="play-circle" />Playlists</span>}</Menu.Item>
                            <SubMenu key="sub3" title={<span><Icon type="appstore" />Slides</span>}>
                                <Menu.Item key="9">New Image Slide</Menu.Item>
                                <Menu.Item key="10">New Calendar Slide</Menu.Item>
                                <Menu.Item key="11">New Map Slide</Menu.Item>
                                <Menu.Item key="12">New Weather Slide</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Playlist</Breadcrumb.Item>
                            <Breadcrumb.Item>Image Slide</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            {this.state.activeComponent}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default AdminHome;