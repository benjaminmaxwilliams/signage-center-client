import * as api from "./Api";

/**
 * Create calendar slide via web service
 *
 * @param slide
 * @returns {Promise<Response>}
 */
export function create(slide) {

    const url = process.env.REACT_APP_API_HOST + "/slide/calendar";

    const props = {
        body: JSON.stringify(slide),
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