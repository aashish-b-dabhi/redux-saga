import axios from "axios";
import { BASE_URL, DELETE_PRODUCT, GET_PRODUCT, POST_PRODUCT, PUT_PRODUCT } from "../constant";


let get_product = async (action) => {

    // console.log(action, "action get api");

    let res = await axios.get(BASE_URL + GET_PRODUCT)
    // console.log(res, "res get api");

    let data = res.data
    let status = res.status

    return { data, status }

}

let post_product = async (action) => {
    // console.log(action,"FROM POST API");

    let { data, status } = await axios.post(BASE_URL + POST_PRODUCT, action.payload)

    return { data, status }

}

let delete_product = async (action) => {
    console.log(action, "FROM delete API");

    let { data, status } = await axios.delete(BASE_URL + DELETE_PRODUCT + action.payload)

    return { data, status }

}

let update_product = async (action) => {
    console.log(action, "from update api");

    let { data, status } = await axios.put(BASE_URL + PUT_PRODUCT + action.payload.id, action.payload
    );
    return { data, status };
};

export { get_product, post_product, delete_product,update_product }