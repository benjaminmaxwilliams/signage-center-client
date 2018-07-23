import Geocode from "react-geocode";

/**
 * Retrieve the formatted address for coordinates
 *
 * @param latCoord
 * @param longCoord
 */
export function getAddress(latCoord, longCoord) {
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

/**
 * Retrieve coordinates for an address
 *
 * @param address
 */
export function getLatLong(address) {
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