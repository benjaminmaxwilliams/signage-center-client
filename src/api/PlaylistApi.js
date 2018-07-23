import * as api from "./Api";

/**
 * Create playlist via web service
 *
 * @param playlist
 * @returns {Promise<Response>}
 */
export function create(playlist) {

    const url = process.env.REACT_APP_API_HOST + "/playlist";

    const props = {
        body: JSON.stringify(playlist),
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
 * Delete playlist via web service
 *
 * @param playlistId
 * @returns {Promise<boolean>}
 */
export function deletePlaylist(playlistId) {

    const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

    const props = {
        method: "DELETE",
    };

    return fetch(url, props)
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
 * Unsubscribe a playlist from a playlist via web service
 *
 * @param playlistId
 * @param playlistSubscriptionId
 * @returns {Promise<boolean>}
 */
export function unsubscribe(playlistId, playlistSubscriptionId) {

    const url = process.env.REACT_APP_API_HOST + `/playlist/unsubscribe/${playlistId}?playlistSubscriptionId=${playlistSubscriptionId}`;

    const props = {
        method: "PUT",
    };

    return fetch(url, props)
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
 * Retrieve all playlists via web service
 *
 * @returns {Promise<Response>}
 */
export function getAll() {

    const url = process.env.REACT_APP_API_HOST + "/playlist/all";

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return error;
        })
}

/**
 * Retrieve a playlist with no slide or subscription data via web service
 *
 * @param playlistId
 * @returns {*}
 */
export function getPlaylist(playlistId) {
    const opts = {
        withSlides: false,
        withSubscriptions: false
    };

    return this.getPlaylistWithOptions(playlistId, opts)
}

/**
 * Retrieve a playlist with various options via web service
 *
 * Options:
 * withSlides - retrieve all the slides associated with the playlist
 * withSubscriptions = retrieve subscribed playlists
 *
 * @param playlistId
 * @param opts
 * @returns {Promise<Response>}
 */
export function getPlaylistWithOptions(playlistId, opts) {

    let withSlides = false;
    let withSubscriptions = false;

    if (opts) {
        if (opts.withSlides) {
            withSlides = true;
        }

        if (opts.withSubscriptions) {
            withSubscriptions = true;
        }
    }

    let url = process.env.REACT_APP_API_HOST +
        `/playlist/${playlistId}?withSlides=${withSlides}&withSubscriptions=${withSubscriptions}`;

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })
}

/**
 * Retrieve a playlist with all playlists to be displayed via web service
 *
 * @param playlistId
 * @returns {Promise<Response>}
 */
export function playPlaylist(playlistId) {

    const url = process.env.REACT_APP_API_HOST + `/playlist/play/${playlistId}`;

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })
}