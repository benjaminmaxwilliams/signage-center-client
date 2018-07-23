import * as api from "./Api";

/**
 * Delete calendar via web service
 *
 * @param calendarId
 * @returns {Promise<boolean>}
 */
export function deleteCalendar(calendarId) {

    const url = process.env.REACT_APP_API_HOST + `/calendar/${calendarId}`;

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
 * Retrieve all calendars via web service
 *
 * @returns {Promise<Response>}
 */
export function getAll() {

    const url = process.env.REACT_APP_API_HOST + "/calendar/all";

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

/**
 * Retrieve calendars by office via web service
 *
 * @param officeId
 * @returns {Promise<Response>}
 */
export function getAllByOffice(officeId) {

    const url = process.env.REACT_APP_API_HOST + `/calendar/all/office/${officeId}`;

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

/**
 * Retrieve a calendar via web service
 *
 * @param calendarId
 * @returns {Promise<Response>}
 */
export function getCalendar(calendarId) {

    const url = process.env.REACT_APP_API_HOST + `/calendar/${calendarId}`;

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