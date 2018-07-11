import {  ACCESS_TOKEN } from "../constants/constant";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: process.env.REACT_APP_API_HOST  + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest),
        headers: {
            "content-type": "application/json"
        },
    });
}

export function signup(signupRequest) {
    return request({
        url: process.env.REACT_APP_API_HOST + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url:process.env.REACT_APP_API_HOST + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: process.env.REACT_APP_API_HOST + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: process.env.REACT_APP_API_HOST + "/user/me",
        method: 'GET'
    });
}