import * as api from "./Api";

/**
 * Create an internal calendar event via web service
 *
 * @param calendarEvent
 * @returns {Promise<Response>}
 */
export function create(calendarEvent) {

    const url = process.env.REACT_APP_API_HOST + "/calendar/event/internal";

    const props = {
        body: JSON.stringify(calendarEvent),
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
 * Delete an internal calendar event via web service
 *
 * @param calendarEventId
 * @returns {Promise<boolean>}
 */
export function deleteEvent(calendarEventId) {

    const url = process.env.REACT_APP_API_HOST + `/calendar/event/internal/${calendarEventId}`;

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