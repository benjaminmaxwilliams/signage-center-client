class MapSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/map";

        return fetch(url, {
                body: JSON.stringify(slide),
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
}

const mapSlideApi = new MapSlideApi();
export default mapSlideApi;