import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { pageRuducer } from "./pageRuducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageRuducer,
    order: ordersReducer,
});
