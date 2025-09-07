import { api } from "../../config/apiConfig";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS } from "./ActionType";

export const createProduct = (reqData) => async (dispatch) =>{
     dispatch({type: CREATE_PRODUCT_REQUEST});
    try {
        const {data} =await api.post(
            `/api/admin/products/`,
            reqData.address,
        );
        if (data.id){
            reqData.navigate({ search: `step=3&order_id=${data}`});
        }
        console.log("created product - ",data);
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,
        });

        
    } catch (error) {
        console.log("catch error : ", error);
        dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload:
            error.message,
        });
        
    }
};