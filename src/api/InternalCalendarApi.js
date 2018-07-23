import * as api from "./Api";

/**
 * Create an internal calendar via web service
 *
 * @param calendar
 * @returns {Promise<Response>}
 */
export function create(calendar) {

    const url = process.env.REACT_APP_API_HOST + "/calendar/internal";

    const props = {
        body: JSON.stringify(calendar),
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

/**
 * Delete an internal calendar via web service
 *
 * @param calendarId
 * @returns {Promise<boolean>}
 */
export function deleteCalendar(calendarId) {

    const url = process.env.REACT_APP_API_HOST + `/calendar/internal/${calendarId}`;

    return fetch(url, {method: "DELETE",})
        .then(api.handleErrors)
        .then(response => {
            return true
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

/**
 * Retrieve all internal calendars via web service
 *
 * @returns {Promise<Response>}
 */
export function getAll() {

    const url = process.env.REACT_APP_API_HOST + "/calendar/internal/all";

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}