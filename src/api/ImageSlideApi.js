import * as api from "./Api";

/**
 * Create image slide via web service
 *
 * @param slide
 * @returns {Promise<Response>}
 */
export function create(slide) {

    const url = process.env.REACT_APP_API_HOST + "/slide/image";

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

/**
 * Upload an image to a slide via web services
 *
 * @param file
 * @param slideId
 * @returns {Promise<Response>}
 */
export function uploadImage(file, slideId) {

    const url = process.env.REACT_APP_API_HOST + `/slide/image/attach/${slideId}`;

    const props = {
        body: file,
        method: "POST",
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}