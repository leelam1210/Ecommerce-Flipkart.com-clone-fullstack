import { pageTypes } from "../actions/constants";
const initialState = {
    page: {},
    isLoading: false,
    isAuthenticated: false,
};

export const pageRuducer = (state = initialState, action) => {
    switch (action.type) {
        case pageTypes.CREATE_PAGE_REQUEST:
            return (state = {
                ...state,
                isLoading: true,
            });
        case pageTypes.CREATE_PAGE_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
            });
        case pageTypes.CREATE_PAGE_FAILURE:
            return (state = {
                ...state,
                isLoading: false,
            });
        default:
            return state;
    }
};
