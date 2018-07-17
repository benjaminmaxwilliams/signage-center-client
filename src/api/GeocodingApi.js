import Api from "./Api";
import Geocode from "react-geocode";

class GeocodingApi extends Api {

    constructor() {
        super();
    }

    getAddress(latCoord, longCoord) {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
        Geocode.fromLatLng(latCoord, longCoord).then(
            response => {
                return response.results[0].formatted_address;
            },
            error => {
                console.error(error);
                throw error;
            }
        );
    }

    getLatLong(address) {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
        Geocode.fromAddress(address).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                return [lat, lng];
            },
            error => {
                console.error(error);
                throw error;
            });

    }
}

const geocodingApi = new GeocodingApi();
export default geocodingApi;