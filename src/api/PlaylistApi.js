class PlaylistApi {

    create(playlist) {

        const url = process.env.REACT_APP_API_HOST + "/playlist";

        return fetch(url, {
            body: JSON.stringify(playlist),
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }

    getAll() {

        const url = process.env.REACT_APP_API_HOST + "/playlist/all";

        return fetch(url)
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }


    delete(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

        return fetch(url, {
            method: "DELETE",
        })
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            })
    }

    getPlaylist(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

        return fetch(url)
            .then(response => {
                return response.json();
            }).catch(error => {
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