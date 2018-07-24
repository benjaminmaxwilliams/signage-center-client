/**
 * Returns locale code
 *
 * @returns {ReadonlyArray<string> | string}
 */
export function getLanguage() {
    return (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

}