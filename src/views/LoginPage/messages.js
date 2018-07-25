import {defineMessages} from "react-intl";

const messages = defineMessages({
    appName: {
        id: "appname",
        defaultMessage: "SignageCenter"
    },
    loginError: {
        id: "login.page.login.error",
        defaultMessage: "Sorry! An error occurred. Please try again."
    },
    loginError403: {
        id: "login.page.login.error.403",
        defaultMessage: "Your username or password are incorrect. Please try again."
    },
    usernameValidationMessage: {
        id: "login.page.form.username.validation.message",
        defaultMessage: "Please input your username or email!"
    },
    usernamePlaceholder: {
        id: "login.page.form.username.placeholder",
        defaultMessage: "Username or Email"
    },
    passwordValidationMessage: {
        id: "login.page.form.password.validation.message",
        defaultMessage: "Please input your password!"
    },
    passwordPlaceholder: {
        id: "login.page.form.password.placeholder",
        defaultMessage: "Password"
    },
    submit: {
        id: "login.page.form.submit",
        defaultMessage: "Login"
    },
    register: {
        id: "login.page.register",
        defaultMessage: "Register Now!"
    }
});

export default messages;