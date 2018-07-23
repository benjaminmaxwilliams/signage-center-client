/**
 * Determines if the response is valid
 *
 * @param response
 * @returns {{ok}|Object} response if valid
 * @throws Error if response is not valid
 */
export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}