import Api from "./Api";

class InternalCalendarApi extends Api {

    constructor() {
        super();
    }

    create(calendar) {

        const url = process.env.REACT_APP_API_HOST + "/calendar/internal";

        const props = {
            body: JSON.stringify(calendar),
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

    delete(calendarId) {

        const url = process.env.REACT_APP_API_HOST + `/calendar/internal/${calendarId}`;

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

    getAll() {

        const url = process.env.REACT_APP_API_HOST + "/calendar/internal/all";

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

const internalCalendarApi = new InternalCalendarApi();
export default internalCalendarApi;