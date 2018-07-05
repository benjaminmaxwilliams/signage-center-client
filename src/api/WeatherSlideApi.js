class WeatherSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/weather";

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

const weatherSlideApi = new WeatherSlideApi();
export default weatherSlideApi;