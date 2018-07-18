import React from "react";
import "./WeatherSlideListItem.css";
import PropTypes from "prop-types";
import {Button, Dropdown, Icon, List, Menu} from "antd";
import genericWeatherImg from "../../assets/generic-weather.png";

class WeatherSlideListItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick = (e) => {
        const {onClick, onDelete, slide} = this.props;

        if (e.key === "VIEW") {
            onClick(e, slide.id);
        } else if (e.key === "DELETE") {
            onDelete(e, slide.id);
        }
    };

    render() {
        const {slide} = this.props;

        // menu options
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="VIEW">View/Edit</Menu.Item>
                <Menu.Item key="DELETE">Delete</Menu.Item>
            </Menu>
        );

        return (
            <List.Item
                key={slide.id}
                extra={
                    <img width={272} alt="logo"
                         src={genericWeatherImg}/>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Weather Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
                <span style={{marginRight: 15}}>
                        <Icon type="environment" style={{marginRight: 8}}/>
                    {slide.latCoord + ", " + slide.longCoord}
                    </span>
                <span style={{marginRight: 15}}>
                        <Dropdown overlay={menu}>
                          <Button size="small" type="dashed" shape="circle" icon="ellipsis"/>
                        </Dropdown>
                    </span>
            </List.Item>
        );
    }
}

WeatherSlideListItem.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        latCoord: PropTypes.number.isRequired,
        longCoord: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

WeatherSlideListItem.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default WeatherSlideListItem;