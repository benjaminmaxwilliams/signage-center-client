import * as api from "./Api";

/**
 * Create a map slide via web service
 *
 * @param slide
 * @returns {Promise<Response>}
 */
export function create(slide) {

    const url = process.env.REACT_APP_API_HOST + "/slide/map";

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