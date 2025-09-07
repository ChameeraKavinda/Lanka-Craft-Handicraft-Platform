import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
} from "./ActionType";

const initialState = {
  products: [],   // all products list
  product: null,  // single created/updated product
  loading: false,
  error: null,
};

const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- CREATE PRODUCT ----------------
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        products: [...state.products, action.payload], // add new product into list
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ---------------- GET ALL PRODUCTS ----------------
    case GET_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default adminProductReducer;
