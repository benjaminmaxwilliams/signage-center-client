import {defineMessages} from "react-intl";

const messages = defineMessages({
    error: {
        id: "error",
        defaultMessage: "Error"
    },
    errorRetrieve: {
        id: "playlist.page.error.retrieve",
        defaultMessage: "Error retrieving playlists"
    },
    slideDeleteConfirmTitle: {
        id: "playlist.page.delete.slide.confirm.title",
        defaultMessage: "Are you sure you want to delete this slide?"
    },
    slideDeleteConfirmOk: {
        id: "playlist.page.delete.slide.confirm.ok",
        defaultMessage: "Delete"
    },
    slideDeleteConfirmCancel: {
        id: "playlist.page.delete.slide.confirm.cancel",
        defaultMessage: "Cancel"
    },
    slideDeleteSuccess: {
        id: "playlist.page.delete.slide.success",
        defaultMessage: "Slide Deleted"
    },
    slideCreateSuccess: {
        id: "playlist.page.create.slide.success",
        defaultMessage: "{slideType} Created"
    },
    unsubscribeSuccess: {
        id: "playlist.page.unsubscribe.success",
        defaultMessage: "Playlist Unsubscribed"
    },
    nameColumn: {
        id: "playlist.page.subscription.table.column.name",
        defaultMessage: "Name"
    },
    officeColumn: {
        id: "playlist.page.subscription.table.column.office",
        defaultMessage: "Office"
    },
    unsubscribeConfirm: {
        id: "playlist.page.unsubscribe.confirm",
        defaultMessage: "Are you sure you want to unsubscribe from this playlist?"
    },
    unsubscribeTableAction: {
        id: "playlist.page.subscription.table.action.unsubscribe",
        defaultMessage: "Unsubscribe"
    },
    viewTableAction: {
        id: "playlist.page.subscription.table.action.view",
        defaultMessage: "View"
    },
    view: {
        id: "playlist.page.action.view",
        defaultMessage: "View"
    },
    changeOrder: {
        id: "playlist.page.action.changeorder",
        defaultMessage: "Change Slide Order"
    },
    slidesSectionTitle: {
        id: "playlist.page.section.slides.title",
        defaultMessage: "Slides"
    },
    subscriptionsSectionTitle: {
        id: "playlist.page.section.subscriptions.title",
        defaultMessage: "Playlist Subscriptions"
    },
    addSlide: {
        id: "playlist.page.action.add",
        defaultMessage: "Add Slide"
    },
    imageSlide: {
        id: "slide.type.image",
        defaultMessage: "Image Slide"
    },
    calendarSlide: {
        id: "slide.type.calendar",
        defaultMessage: "Calendar Slide"
    },
    mapSlide: {
        id: "slide.type.map",
        defaultMessage: "Map Slide"
    }
});

export default messages;