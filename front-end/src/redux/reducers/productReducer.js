import { productTypes } from "../actions/constants";

const initialStateProduct = {
    products: [],
    priceRange: {},
    productsByPrice: {
        // under5k: [],
        // under10k: [],
        // under15k: [],
        // under20k: [],
        // under30k: [],
    },
    page: {},
    productDetails: {},
    isLoading: false,
};

export const productReducer = (state = initialStateProduct, action) => {
    switch (action.type) {
        case productTypes.GET_PRODUCTS_BY_SLUG:
            return (state = {
                ...state,
                products: action.payload.products,
                priceRange: action.payload.priceRange,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                }
            });
        case productTypes.GET_PRODUCT_PAGE_REQUEST:
            return (state = {
                ...state,
                isLoading: true,
            });
        case productTypes.GET_PRODUCT_PAGE_SUCCESS:
            return (state = {
                ...state,
                page: action.payload,
                isLoading: false,
            });
        case productTypes.GET_PRODUCT_PAGE_FAILURE:
            return (state = {
                ...state,
                isLoading: false,
            });
        // case productTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
        //     state = {
        //         ...state,
        //         isLoading: true,
        //     }
        //     break;
        case productTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                productDetails: action.payload,
            })
        case productTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                isLoading: false,
            }
            break;
        default:
            return state;
    }
};