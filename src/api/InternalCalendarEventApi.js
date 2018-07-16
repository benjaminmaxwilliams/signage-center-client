import Api from "./Api";

class InternalCalendarEventApi extends Api {

    constructor() {
        super();
    }

    create(calendarEvent) {

        const url = process.env.REACT_APP_API_HOST + "/calendar/event/internal";

        const props = {
            body: JSON.stringify(calendarEvent),
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

    delete(calendarEventId) {

        const url = process.env.REACT_APP_API_HOST + `/calendar/event/internal/${calendarEventId}`;

        return fetch(url, {method: "DELETE",})
            .then(this.handleErrors)
            .then(response => {
                return true
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
    }
}

const internalCalendarEventApi = new InternalCalendarEventApi();
export default internalCalendarEventApi;