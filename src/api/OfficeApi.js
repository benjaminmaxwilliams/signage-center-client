class OfficeApi {

    create(office) {

        const url = process.env.REACT_APP_API_HOST + "/office";

        const props = {
            body: JSON.stringify(office),
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

    deleteOffice(officeId) {

        const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

        return fetch(url, {method: "DELETE",})
            .then(response => {
                if (response.ok) {
                    return response.ok;
                } else {
                    throw new Error("Error");
                }
            }).catch(error => {
                console.log(error);
                throw error;
            })
    }

    getAll() {

        const url = process.env.REACT_APP_API_HOST + "/office/all";

        return fetch(url)
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }

    getOffice(officeId) {

        const url = process.env.REACT_APP_API_HOST + `/office/${officeId}`;

        return fetch(url)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            })

    }
}

const officeApi = new OfficeApi();
export default officeApi;