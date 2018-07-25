import {defineMessages} from "react-intl";

const messages = defineMessages({
    error: {
        id: "error",
        defaultMessage: "Error"
    },
    title: {
        id: "calendar.slide.form.title",
        defaultMessage: "New Calendar Slide"
    },
    submit: {
        id: "calendar.slide.form.submit",
        defaultMessage: "Create"
    },
    nameLabel: {
        id: "calendar.slide.form.name.label",
        defaultMessage: "Slide Name"
    },
    nameValidationMessage: {
        id: "calendar.slide.form.name.validation.message",
        defaultMessage: "Please input a slide name!"
    },
    durationLabel: {
        id: "calendar.slide.form.duration.label",
        defaultMessage: "Duration (seconds)"
    },
    durationValidationMessage: {
        id: "calendar.slide.form.duration.validation.message",
        defaultMessage: "Please input a duration"
    },
    displayScheduleLabel: {
        id: "calendar.slide.form.displayschedule.label",
        defaultMessage: "Display Schedule"
    },
    startPlaceholder: {
        id: "calendar.slide.form.start.placeholder",
        defaultMessage: "Start"
    },
    endPlaceholder: {
        id: "calendar.slide.form.end.placeholder",
        defaultMessage: "End"
    },
    calendarsLabel: {
        id: "calendar.slide.form.calendars.label",
        defaultMessage: "Calendars"
    },
    calendarsValidationMessage: {
        id: "calendar.slide.form.calendars.validation.message",
        defaultMessage: "Please select at least one calendar"
    },
    calendarsPlaceholder: {
        id: "calendar.slide.form.calendars.placeholder",
        defaultMessage: "Please select which calendars to display"
    }
});

export default messages;