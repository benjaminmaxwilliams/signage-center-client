import * as api from "./Api";

/**
 * Post weather slide via the web service
 *
 * @param slide
 * @returns {Promise<Response>}
 */
export function create(slide) {

    const url = process.env.REACT_APP_API_HOST + "/slide/weather";

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