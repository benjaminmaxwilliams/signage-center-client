import React from "react";
import "./ImageSlideListItem.css";
import PropTypes from "prop-types";
import {Button, Dropdown, Icon, List, Menu} from "antd";

class ImageSlideListItem extends React.Component {
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
                    <div style={{maxWidth: 272, maxHeight: 200}}>
                        <img style={{height: "100%", width: "100%"}} alt="logo" src={slide.imageUrl}/>
                    </div>
                }>
                <List.Item.Meta
                    title={slide.name}
                    description="Image Slide"/>
                <span style={{marginRight: 15}}>
                        <Icon type="clock-circle-o" style={{marginRight: 8}}/>
                    {slide.duration + " seconds"}
                    </span>
                {slide.text &&
                <span style={{marginRight: 15}}>
                            <Icon type="message" style={{marginRight: 8}}/>
                    {slide.text}
                        </span>
                }
                <span style={{marginRight: 15}}>
                        <Dropdown overlay={menu}>
                          <Button size="small" type="dashed" shape="circle" icon="ellipsis"/>
                        </Dropdown>
                    </span>
            </List.Item>
        );
    }
}

ImageSlideListItem.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        text: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

ImageSlideListItem.defaultProps = {
    onClick: () => console.log("not implemented"),
    onDelete: () => console.log("not implemented")
};

export default ImageSlideListItem;