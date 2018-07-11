class SlideApi extends Api {

    delete(slideId) {

        const url = process.env.REACT_APP_API_HOST + `/slide/${slideId}`;

        const props = {
            method: "DELETE",
        };

        return fetch(url, props)
            .then(this.handleErrors)
            .then(response => {
                return response.ok;
            })
            .catch(error => {
                console.log(error);
                throw error;
            })

    }

    getAllSlides() {

        const url = process.env.REACT_APP_API_HOST + "/slide/all";

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }

    getSlidesByPlaylist(playlistId) {

        const url = process.env.REACT_APP_API_HOST + `/slide/playlist/${playlistId}`;

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }
}

const slideApi = new SlideApi();
export default slideApi;