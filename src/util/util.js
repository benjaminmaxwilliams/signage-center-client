/**
 * Returns locale code.
 *
 * Defaults to en-US if locale could not be found.
 *
 * @returns {ReadonlyArray<string> | string}
 */
export function getLanguage() {
    return (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || "en-US";

}