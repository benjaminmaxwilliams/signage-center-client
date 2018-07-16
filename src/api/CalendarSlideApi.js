import Api from "./Api";

class CalendarSlideApi extends Api {

    constructor() {
        super();
    }

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/calendar";

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

const calendarSlideApi = new CalendarSlideApi();
export default calendarSlideApi;