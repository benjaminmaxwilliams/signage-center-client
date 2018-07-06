class ImageSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/image";

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

    uploadImage(file, slideId) {
        const url = process.env.REACT_APP_API_HOST + `/slide/image/attach/${slideId}`;

        const props = {
            body: file,
            method: "POST",
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
            });
    }
}

const imageSlideApi = new ImageSlideApi();
export default imageSlideApi;