import axios from 'axios';

export async function getRequest(query, type, cb) {
    var url = "/get?";
    if (type === "name") {
        url = url + "q=" + query;
    } else if (type === "id") {
        url = url + "comp_id=" + query;
    }
    axios.get(url)
        .then(function (response) {
            if (type === "id") {
                console.log(response.data[0]);
                cb(response.data[0], "success");
            }
            else if (type === "name") {
                response.data.forEach(element => {
                    console.log(element);
                });
                cb(response.data, "success");
            }
        })
        .catch(function (error) {
            console.log(error);
            cb(error.message, "fail");
            throw new Error("Network respone was not ok.")
        })
}
