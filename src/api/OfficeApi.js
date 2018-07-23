import * as api from "./Api";

/**
 * Create an office via web service
 *
 * @param office
 * @returns {Promise<Response>}
 */
export function create(office) {

    const url = process.env.REACT_APP_API_HOST + "/office";

    const props = {
        body: JSON.stringify(office),
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

/**
 * Delete an office via web service
 *
 * @param officeId
 * @returns {Promise<boolean>}
 */
export function deleteOffice(officeId) {

    const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

    const props = {
        method: "DELETE",
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            return true
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

/**
 * Retrieve all offices via web service
 *
 * @returns {Promise<Response>}
 */
export function getAll() {

    const url = process.env.REACT_APP_API_HOST + "/office/all";

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })
}

/**
 * Retrieve an office via web service
 *
 * @param officeId
 * @returns {Promise<Response>}
 */
export function getOffice(officeId) {

    const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

    return fetch(url)
        .then(api.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })

}