class CalendarSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/calendar";

        const props = {
            body: JSON.stringify(slide),
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        };

        return fetch(url, props)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error("Error");
                }
            }).then(response => {
                return response.json();
            }).catch(error => {
                console.log(error);
                throw error;
            })
    }
}

const calendarSlideApi = new CalendarSlideApi();
export default calendarSlideApi;