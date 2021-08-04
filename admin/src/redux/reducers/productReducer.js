import { productTypes } from '../actions/constants';
const initialState = { productData: [], isLoading: false, isAuthenticated: false }

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productTypes.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                productData: action.payload.products,
            }
        default:
            return state;
    }
}
