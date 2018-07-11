class MapSlideApi extends Api {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/map";

        const props = {
            body: JSON.stringify(slide),
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
}

const mapSlideApi = new MapSlideApi();
export default mapSlideApi;