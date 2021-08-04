import { authTypes, userTypes } from '../actions/constants';
const initialState = { authData: [], isLoading: false, isAuthenticated: false }

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.LOGIN_SUCCESS:
            return state = {
                ...state,
                authData: action?.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        // case authTypes.LOGOUT_SUCCESS:
        //     state = {
        //         ...initialState
        //     }
        //     break;
        case userTypes.USER_REGISTER_SUCCESS:
            return state = {
                ...state,
                authData: action?.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        default:
            return state;
    }
}
