import { api } from "../../config/apiConfig";
import { 
  CREATE_ORDER_FAILURE, 
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_SUCCESS, 
  GET_ORDER_BY_ID_FAILURE, 
  GET_ORDER_BY_ID_REQUEST, 
  GET_ORDER_BY_ID_SUCCESS 
} from "./ActionType";

// Create Order
export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post(`/api/orders/`, reqData);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    return data; // <-- important so component gets response
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data || error.message,
    });
    throw error; // rethrow for component catch
  }
};

// Get Order By ID
export const getOrderById = (order_id) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${order_id}`);

    console.log("order by id:", data);

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });

    return data; // <-- so component can use it
  } catch (error) {
    console.log("catch error:", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response?.data || error.message,
    });
    throw error;
  }
};
