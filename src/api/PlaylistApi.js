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


    delete(playlistId){
        const url = process.env.REACT_APP_API_HOST + `/playlist/${playlistId}`;

        return fetch(url,{
            method: "DELETE",
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     "Access-Control-Allow-Credentials": "*",
            //     "Access-Control-Allow-Methods" :"*",
            //     "Access-Control-Allow-Origin":"*",
            //     "Access-Control-Allow-Headers":"*",
            //     "content-type": "application/json"
            // },
        });
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