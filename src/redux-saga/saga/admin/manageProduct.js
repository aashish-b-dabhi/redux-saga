import { call, put } from "redux-saga/effects";
import { delete_product, get_product, post_product, update_product } from "../../admin/api";
import { GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS, POST_PRODUCT_ERROR, POST_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR } from "../../admin/action";

function* handle_get_product(action) {
    try {
        // console.log(action, "action manage");
        let { status, data } = yield call(get_product, action)

        if (status == 200) {

            yield put({ type: GET_PRODUCT_SUCCESS, payload: data })
        }
    }
    catch (err) {
        yield put({ type: GET_PRODUCT_ERROR, payload: err })
    }
}

function* handle_post_product(action) {
    try {

        let { data, status } = yield call(post_product, action)

        yield put({ type: POST_PRODUCT_SUCCESS, payload: data })
    }
    catch (err) {
        yield put({ type: POST_PRODUCT_ERROR, payload: err })
    }
}

function* handle_delete_product(action) {
    try {

        let { data, status } = yield call(delete_product, action)

        yield put({ type: DELETE_PRODUCT_SUCCESS, payload: data })
    }
    catch (err) {
        yield put({ type: DELETE_PRODUCT_ERROR, payload: err })
    }
}

function* handle_update_product(action) {
    try {

        let { data, status } = yield call(update_product, action);

        yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        
    } catch (err) {
        yield put({ type: UPDATE_PRODUCT_ERROR, payload: err });
    }
}
export { handle_get_product, handle_post_product, handle_delete_product, handle_update_product }