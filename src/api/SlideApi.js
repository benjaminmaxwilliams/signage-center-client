class SlideApi {

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    getAllSlides() {

        const url = process.env.REACT_APP_API_HOST + "/slide/all";

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            }).catch(error => {
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
            }).catch(error => {
                console.log(error);
                throw error;
            })
    }

    /**
     * Delete slide
     *
     * @param slideId
     * @returns {Promise<Response>}
     */
    delete(slideId) {

        const url = process.env.REACT_APP_API_HOST + `/slide/${slideId}`;

        return fetch(url, {method: "DELETE",})
            .then(this.handleErrors)
            .then(response => {
                return response.ok;
            })
            .catch(error => {
                console.log(error);
                throw error;
            })

    }
}

const slideApi = new SlideApi();
export default slideApi;