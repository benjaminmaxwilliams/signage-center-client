import * as api from "./Api";

/**
 * Delete slide via web service
 */
export function deleteSlide(slideId) {

    const url = process.env.REACT_APP_API_HOST + `/slide/${slideId}`;

    const props = {
        method: "DELETE",
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            return response.ok;
        })
        .catch(error => {
            console.log(error);
            throw error;
        })

}

/**
 * Retrieve slide via web service
 *
 * @param slideId
 * @returns {Promise<Response>}
 */
export function getSlide(slideId) {

    const url = process.env.REACT_APP_API_HOST + `/slide/${slideId}`;

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
 * Retrieve all slides via web service
 *
 * @returns {Promise<Response>}
 */
export function getAllSlides() {

    const url = process.env.REACT_APP_API_HOST + "/slide/all";

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
 * Retrieve all slides for a playlist via web service
 *
 * @param playlistId
 * @returns {Promise<Response>}
 */
export function getSlidesByPlaylist(playlistId) {

    const url = process.env.REACT_APP_API_HOST + `/slide/playlist/${playlistId}`;

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