import React from "react";
import PropTypes from "prop-types";
import {GoogleMap, Marker, TrafficLayer, withGoogleMap, withScriptjs} from "react-google-maps";
import './MapSlide.css';
import MapStyle from "../../assets/mapStyle.json";

const MapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={11}
        defaultCenter={{lat: props.slide.latCoord, lng: props.slide.longCoord}}
        clickableIcons={false}
        defaultOptions={{styles: MapStyle, gestureHandling: "none", zoomControl: false, disableDefaultUI: true}}>
        <Marker
            position={{lat: props.slide.latCoord, lng: props.slide.longCoord}}/>
        <TrafficLayer autoUpdate/>
    </GoogleMap>
));

class MapSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapComponent
                slide={this.props.slide}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div className="google-map-container"/>}
                mapElement={<div style={{height: `100%`, margin: `0px`}}/>}
            />
        );
    }
}

MapSlide.propTypes = {
    slide: PropTypes.shape({
        id: PropTypes.number.isRequired,
        latCoord: PropTypes.number.isRequired,
        longCoord: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    })
};

export default MapSlide;