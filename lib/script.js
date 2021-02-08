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
            if (!response || response.data.length == 0) {
                cb("Component not found!", "fail");
            } else {
                if (type === "id") {
                    cb(response.data[0], "success");
                }
                else if (type === "name") {
                    cb(response.data, "success");
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        })
}

export async function update(props, cb) {
    console.log(props)
    axios.post('/update', {
        stu_id: props.student_id,
        stu_name: props.student_name,
        order_details: props.order_details,
    })
        .then(function (res) {
            console.log(res)
            cb(res, "success");
        })
        .then(function (err) {
            console.log(err)
            cb([], "failed");
        })
}

