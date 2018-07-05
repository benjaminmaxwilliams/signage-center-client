import React from "react";
import './EmptySlide.css';
import guidewireImg from "../../assets/guidewire_logo_color_web.png";

class CalendarSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img className="scaleimage" src={guidewireImg} alt=""/>
            </div>
        );
    }
}

export default CalendarSlide;