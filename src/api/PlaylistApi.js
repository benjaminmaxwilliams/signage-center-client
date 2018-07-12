class PlaylistApi extends Api {

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

        const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            })

    }
    postloginData(loginData) {
        const url = process.env.REACT_APP_API_HOST + "/auth/signin";

        return fetch(url, {
            body: JSON.stringify(loginData),
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(response => response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
            );
    }


}



const playlistApi = new PlaylistApi();
export default playlistApi;