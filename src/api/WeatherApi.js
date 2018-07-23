import * as api from "./Api";

/**
 * Retrieve weather information from OpenMapWeather
 *
 * @param latCoord
 * @param longCoord
 * @returns {Promise<Response>}
 */
export function getWeather(latCoord, longCoord) {

    const url = process.env.REACT_APP_OPEN_WEATHER_API_HOST + "/weather"
        + `?lat=${latCoord}&lon=${longCoord}`
        + `&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
        + `&units=${process.env.REACT_APP_WEATHER_UNITS}`;

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json()
        }).catch(error => {
            return error;
        })
}