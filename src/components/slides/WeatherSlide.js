import React from "react";
import PropTypes from "prop-types";
import './WeatherSlide.css';
import * as weatherApi from "../../api/WeatherApi";

import weatherImages from "../../assets/weather/weather";

class WeatherSlide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherConditionId: 0,
            temperature: null,
            temperatureUnit: process.env.REACT_APP_WEATHER_UNITS
        }
    }

    componentWillMount() {
        const {slide} = this.props;

        weatherApi.getWeather(slide.latCoord, slide.longCoord)
            .then(weather => {
                this.setState({weatherConditionId: weather.weather[0].id, temperature: weather.main.temp});
            });
    }

    buildImage() {
        const {weatherConditionId} = this.state;

        let image;

        if (weatherConditionId >= 200 && weatherConditionId < 300) {
            image = weatherImages.cloudy;
        } else if (weatherConditionId >= 300 && weatherConditionId < 600) {
            image = weatherImages.rainy;
        } else if (weatherConditionId >= 600 && weatherConditionId < 700) {
            image = weatherImages.snowy;
        } else if (weatherConditionId >= 700 && weatherConditionId < 800) {
            image = weatherImages.foggy;
        } else if (weatherConditionId >= 800 && weatherConditionId < 805) {
            image = weatherImages.sunny;
        }

        return (
            <img className="scaleimage" src={image} alt=""/>
        )
    }

    buildText() {
        const {temperature, temperatureUnit} = this.state;

        if (temperature === "undefined") {
            return (
                <div className="text-block">
                    <h1 className="h1">Could not retrieve weather information.</h1>
                </div>
            )
        }

        let units;
        if (temperatureUnit === "imperial") {
            units = "F"
        } else {
            units = "C"
        }

        return (
            <div className="text-block">
                <h1 className="h1">{temperature} &deg;{units}</h1>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.buildImage()}
                {this.buildText()}
            </div>
        );
    }
}

WeatherSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        latCoord: PropTypes.number.isRequired,
        longCoord: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    }),
};

export default WeatherSlide;