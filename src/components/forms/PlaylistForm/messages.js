import {defineMessages} from "react-intl";

const messages = defineMessages({
    error: {
        id: "error",
        defaultMessage: "Error"
    },
    title: {
        id: "playlist.form.title",
        defaultMessage: "New Playlist"
    },
    submit: {
        id: "playlist.form.submit",
        defaultMessage: "Create"
    },
    nameLabel: {
        id: "playlist.form.name.label",
        defaultMessage: "Name"
    },
    nameValidationMessage: {
        id: "playlist.form.name.validation.message",
        defaultMessage: "Please input a name!"
    },
    officeLabel: {
        id: "playlist.form.office.label",
        defaultMessage: "Office"
    },
    officeValidationMessage: {
        id: "playlist.form.office.validation.message",
        defaultMessage: "Please select an office!"
    },
    playlistsLabel: {
        id: "playlist.form.playlists.label",
        defaultMessage: "Calendars"
    },
    playlistsPlaceholder: {
        id: "playlist.form.playlists.placeholder",
        defaultMessage: "Select which playlists to subscribe to"
    },
});

export default messages;