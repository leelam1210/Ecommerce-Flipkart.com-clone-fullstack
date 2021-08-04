import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    cart: cartReducer,
});