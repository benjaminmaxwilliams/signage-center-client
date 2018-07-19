import Api from "./Api";

class PlaylistApi extends Api {

    constructor() {
        super();
    }

    create(playlist) {

        const url = process.env.REACT_APP_API_HOST + "/playlist";

        const props = {
            body: JSON.stringify(playlist),
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        };

        return fetch(url, props)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }

    delete(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

        const props = {
            method: "DELETE",
        };

        return fetch(url, props)
            .then(this.handleErrors)
            .then(response => {
                return true
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }

    unsubscribe(playlistId, playlistSubscriptionId) {

        const url = process.env.REACT_APP_API_HOST + `/playlist/unsubscribe/${playlistId}?playlistSubscriptionId=${playlistSubscriptionId}`;

        const props = {
            method: "PUT",
        };

        return fetch(url, props)
            .then(this.handleErrors)
            .then(response => {
                return true
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }

    getAll() {

        const url = process.env.REACT_APP_API_HOST + "/playlist/all";

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error;
            })
    }

    getPlaylist(playlistId) {
        const opts = {
            withSlides: false,
            withSubscriptions: false
        };

        return this.getPlaylistWithOptions(playlistId, opts)
    }

    getPlaylistWithOptions(playlistId, opts) {

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
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            })
    }

    playPlaylist(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/playlist/play/${playlistId}`;

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            })
    }
}


const playlistApi = new PlaylistApi();
export default playlistApi;