class PlaylistApi {

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
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error("Error");
                }
            }).then(response => {
                return response.json();
            }).catch(error => {
                console.log(error);
                throw error;
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

        return fetch(url, {method: "DELETE",})
            .then(response => {
                if (response.ok) {
                    return response.ok;
                } else {
                    throw new Error("Error");
                }
            }).catch(error => {
                console.log(error);
                throw error;
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
}

const playlistApi = new PlaylistApi();
export default playlistApi;