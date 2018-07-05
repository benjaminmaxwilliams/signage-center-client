class ImageSlideApi {

    create(slide) {

        const url = process.env.REACT_APP_API_HOST + "/slide/image";

        return fetch(url, {
            body: JSON.stringify(slide),
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }

    uploadImage(file, slideId) {
        const url = process.env.REACT_APP_API_HOST + `/slide/image/attach/${slideId}`;

        return fetch(url, {
            body: file,
            method: "POST",
        })
            .then(response => {
                return response.json()
            }).catch(error => {
                return error;
            })
    }
}

const imageSlideApi = new ImageSlideApi();
export default imageSlideApi;