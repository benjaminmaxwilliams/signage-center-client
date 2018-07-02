class SlideApi {

    getAllSlides() {

        const url = process.env.REACT_APP_API_HOST + "/slide/all";

        return fetch(url)
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }

    getSlidesByPlaylist(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/slide/playlist/${playlistId}`;

        return fetch(url)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            })

    }
}

const slideApi = new SlideApi();
export default slideApi;