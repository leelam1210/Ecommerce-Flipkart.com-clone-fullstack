import { createPageApi } from "../../api/pageApi";
import { pageTypes } from "./constants";


export const createPage = (form) => async dispatch => {
    try {
        dispatch({ type: pageTypes.CREATE_PAGE_REQUEST, payload: null });
        const { data } = await createPageApi(form);
        console.log(data);
        dispatch({ type: pageTypes.CREATE_PAGE_SUCCESS, payload: data.page });
    } catch (error) {
        dispatch({ type: pageTypes.CREATE_PAGE_FAILURE, payload: null });
        console.log(error.response.data);
    }
};
