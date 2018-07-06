class WeatherSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/weather";

        const props = {
            body: JSON.stringify(slide),
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
}

const weatherSlideApi = new WeatherSlideApi();
export default weatherSlideApi;