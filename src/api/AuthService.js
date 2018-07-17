import {ACCESS_TOKEN} from "../constants/constant";
import decode from 'jwt-decode';
export default class AuthService {


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = localStorage.getItem(ACCESS_TOKEN)
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

   isTokenExpired(token) {
        try {
      // check if the token expired and login again
            const decoded = decode(token);
         // compare the date and set the second and


            if (decoded.exp <(new Date().getTime() / 1000)) {
              // Checking if token is expired. N
                this.logout();
                return true;
            }
            else
                return false;
        }
        catch (err) {;
        // see for the error and return the false
            return false;
        }
    }



    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }



    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('ACCESS_TOKEN')
    }



    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem(ACCESS_TOKEN);

    }
    checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

const authService = new AuthService();