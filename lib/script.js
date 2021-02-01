import axios from 'axios';

export async function getRequest(query, type, cb) {
    var url = "/get?";
    if (type === "name") {
        url = url + "q=" + query;
    } else if (type === "id") {
        url = url + "comp_id=" + query;
    }
    axios.get(url)
        .then(function (response){
            console.log(response.data[0]);
            cb(response.data[0], "success");
        })
        .catch(function (error) {
            console.log(error);
            cb(error.message, "fail");
            throw new Error("Network response was not ok.");
        })
}