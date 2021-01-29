import axios from 'axios';

export async function getRequest(query, type) {
    var url = "/search?";
    if (type === "name") {
        url = url + "q=" + query;
    } else if (type === "id") {
        url = url + "comp_id=" + query;
    }
    axios.get(url)
        .then(function (response) {
            console.log(response.data[0]);
        })
        .catch(function (error) {
            console.log(error);
        })
}