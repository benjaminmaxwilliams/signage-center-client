import Api from "./Api";

class CalendarApi extends Api {

    constructor() {
        super();
    }

    delete(calendarId) {

        const url = process.env.REACT_APP_API_HOST + `/calendar/${calendarId}`;

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

        const url = process.env.REACT_APP_API_HOST + "/calendar/all";

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

    getAllByOffice(officeId) {

        const url = process.env.REACT_APP_API_HOST + `/calendar/all/office/${officeId}`;

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

    getCalendar(calendarId) {

        const url = process.env.REACT_APP_API_HOST + `/calendar/${calendarId}`;

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

const calendarApi = new CalendarApi();
export default calendarApi;