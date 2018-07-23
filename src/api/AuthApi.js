import decode from 'jwt-decode';
import * as api from "./Api";

const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Authenticate user
 *
 * @param credentials
 * @returns {Promise<Response>}
 */
export function login(credentials) {

    const url = process.env.REACT_APP_API_HOST + "/auth/signin";

    const props = {
        body: JSON.stringify(credentials),
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    };

    return fetch(url, props)
        .then(api.handleErrors)
        .then(response => {
            saveToken(response.accessToken);
            return true
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

/**
 * Log out user (remove token from local storage)
 */
export function logout() {
    removeToken()
}

/**
 * Create a new user
 *
 * @param values
 * @returns {Promise<Response>}
 */
export function signUp(values) {

    const url = process.env.REACT_APP_API_HOST + "/auth/signup";

    const props = {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    };

    return fetch(url, props)
        .then(this.handleErrors)
        .then(response => {
            return true
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

/**
 * Check the availability of the username
 *
 * @param username
 * @returns {Promise<Response>}
 */
export function checkUsernameAvailability(username) {

    const url = process.env.REACT_APP_API_HOST + `/user/checkUsernameAvailability?username=${username}`;

    return fetch(url)
        .then(this.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

/**
 * Check the availability of the email
 *
 * @param email
 * @returns {Promise<Response>}
 */
export function checkEmailAvailability(email) {

    const url = process.env.REACT_APP_API_HOST + `/user/checkEmailAvailability?email=${email}`;

    return fetch(url)
        .then(this.handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

/**
 * Checks if the user is authenticated (valid token)
 *
 * @returns {boolean}
 */
export function authenticated() {
    return !!getToken() && !isTokenExpired();
}

/**
 * Checks if the token is expired. If the token is expired, the token
 * will be removed from local storage.
 *
 * @param token
 * @returns {boolean}
 */
function isTokenExpired(token) {
    try {

        const decoded = decode(token);
        if (decoded.exp < (new Date().getTime() / 1000)) {
            removeToken();
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}

/**
 * Saves user token to local storage
 *
 * @param idToken
 */
function saveToken(idToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, idToken)
}

/**
 * Remove token from local storage
 * @param token
 */
function removeToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}

/**
 * Retrieves the user token from local storage
 *
 * @returns {string | null}
 */
function getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}