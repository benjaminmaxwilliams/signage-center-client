import Api from "./Api";

class OfficeApi extends Api {

    constructor() {
        super();
    }

    create(office) {

        const url = process.env.REACT_APP_API_HOST + "/office";

        const props = {
            body: JSON.stringify(office),
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

    deleteOffice(officeId) {

        const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

        const props = {
            method: "DELETE",
        };

        return fetch(url, props)
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

        const url = process.env.REACT_APP_API_HOST + "/office/all";

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            })
    }

    getOffice(officeId) {

        const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

        return fetch(url)
            .then(this.handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            })

    }
}

const officeApi = new OfficeApi();
export default officeApi;