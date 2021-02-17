import axios from 'axios';

/**
 * // 
 * GET request for search by component ID, component part ID & component retail ID
 * @param {string} query Query content input from search and QR scanner.
 * @param {string} type Type of query to differentiate between query by name, ID, part ID and retail ID.
 * @param cb Vanilla callback function to return results including success and fail responses.
 */
export async function getRequest(query, type, cb) {
    var url = "/api/get?";
    if (type === "name") {
        url = url + "name=" + query;
    } else if (type === "id") {
        url = url + "comp_id=" + query;
    } else if (type === "part_id") {
        url = url + "part_id=" + query;
    } else if (type === "retail_id") {
        url = url + "retail_id=" + query;
    }
    axios.get(url)
        .then(function (response) {
            if (!response || response.data.length == 0) {
                // Callback fail message if response is empty or undefined
                cb("Component not found!", "fail");
            } else {
                if (type === "id") {
                    // Callback the first result for search by ID query - Used for QR Scanner component
                    cb(response.data[0], "success");
                }
                else {
                    // Callback all results for other type of query
                    cb(response.data, "success");
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * // 
 * POST request for sending transaction details to server and to be stored in database
 * @param {Object} props Property Object contains student ID, student name and order detail which is an array of object.
 * @param cb Vanilla callback function to return results including success and fail responses.
 */
export async function update(props, cb) {
    axios.post('/api/update', {
        // Structure POST request body
        stu_id: props.student_id,
        stu_name: props.student_name,
        order_details: props.order_details,
    })
        .then(function (res) {
            cb(res, "success");
        })
        .then(function (err) {
            console.log(err)
            cb([], "failed");
        })
}

/**
 * // 
 * POST request for sending transaction details to server and to be stored in database
 * @param {Object} props Property Object contains student ID, student name and order detail which is an array of object.
 * @param cb Vanilla callback function to return results including success and fail responses.
 */
export async function insert(props, cb) {
    axios.post('/api/insert', {
        // Structure POST request body
        component_name: props.name,
        category: props.category,
        part_number: props.partID,
        retail_part_number: props.retailID,
        size: props.size,
        type: props.type,
        volt: props.volt,
        current: props.current,
        inductance: props.inductance,
        capacitance: props.capacitance,
        tolerance: props.tolerance,
        misc: props.misc,
        quantity: props.quantity,
        location: props.location,
        manufacturer: props.manufacturer
    })
        .then(function (res) {
            cb(res, "success");
        })
        .catch(function (error) {
            cb([], "failed");
        })
}

