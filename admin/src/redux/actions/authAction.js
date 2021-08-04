import { userTypes, authTypes } from "./constants";
import { signUpApi, signInApi, signOutApi } from "../../api/authApi";
import { validRegister } from "../../utils/Valid";

export const signUp = (formSignup, history) => async dispatch => {
    const check = validRegister(formSignup);
    if (check.errLength > 0)
        return console.log(check.errMsg);
    try {
        dispatch({ type: userTypes.USER_REGISTER_REQUEST });
        const { data } = await signUpApi(formSignup);
        console.log(data);
        dispatch({ type: userTypes.USER_REGISTER_SUCCESS, payload: data });
        // history.push('/');

    } catch (error) {
        dispatch({ type: userTypes.USER_REGISTER_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

export const signIn = (formSignin) => async dispatch => {
    console.log(formSignin);
    try {
        dispatch({ type: authTypes.LOGIN_REQUEST });
        const { data } = await signInApi(formSignin);
        console.log(data.data);
        dispatch({ type: authTypes.LOGIN_SUCCESS, payload: data });

        // localStorage.setItem('authAdmin', data);
        localStorage.setItem("authAdmin", JSON.stringify(data));

    } catch (error) {
        dispatch({ type: authTypes.LOGIN_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: authTypes.LOGOUT_REQUEST });
        const { data } = await signOutApi();
        console.log(data);
        localStorage.clear();
        // dispatch({ type: authTypes.LOGOUT_SUCCESS });
        window.location.href = "/signin";

    } catch (error) {
        // dispatch({ type: authTypes.LOGOUT_FAILURE, payload: data });
        console.log("error.response.data.error");
    }
};


export const isUserLoggedIn = () => async dispatch => {
    // const isToken = localStorage.getItem('authAdminAccessToken');
    const data = JSON.parse(localStorage.getItem('authAdmin'));
    if (!data) return;
    try {
        dispatch({ type: authTypes.LOGIN_SUCCESS, payload: data });
        console.log(data);
    } catch (error) {
        dispatch({ type: authTypes.LOGIN_FAILURE, payload: error.response.data.message });
        console.log(error.response.data.error);
    }
}
