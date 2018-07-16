/**
 * Functions as an abstract class. Use for Api classes
 */
class Api {

    constructor() {
        if (new.target === Api) {
            throw new TypeError("Cannot construct Api instances directly");
        }
    }

    /**
     * Determines if the response is valid
     *
     * @param response
     * @returns {{ok}|Object} response if valid
     * @throws Error if response is not valid
     */
    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}

export default Api;