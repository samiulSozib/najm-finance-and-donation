import axios from "axios";
import {PAYMENT_LIST_REQUEST,
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_FAIL,
    PAYMENT_ADD_REQUEST,
    PAYMENT_ADD_SUCCESS,
    PAYMENT_ADD_FAIL,
    PAYMENT_EDIT_REQUEST,
    PAYMENT_EDIT_SUCCESS,
    PAYMENT_EDIT_FAIL
    } from '../constants/paymentConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
import { base_url } from "../../util/config"; 




export const paymentList=(page,item_per_page)=>{
    return async(dispatch)=>{
      
        dispatch({type:PAYMENT_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/payments?page=${page}&item_per_page=${item_per_page}`)
            //console.log(response.data)
            const data=response.data.data
            const totalItems=response.data.payload.pagination.total_items
           
            dispatch({type:PAYMENT_LIST_SUCCESS,payload: {data,totalItems}})
        }catch(error){
            dispatch({type:PAYMENT_LIST_FAIL,payload:error})
        }
    }
}


export const deletePayment = (paymentId) => {
    return async (dispatch) => {
      dispatch({ type: PAYMENT_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/payments/${paymentId}`);
        dispatch({ type: PAYMENT_DELETE_SUCCESS, payload: paymentId });
        toast.success("Payment Deleted Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: PAYMENT_DELETE_FAIL, payload: errorMessage });
        toast.error(`Error: ${errorMessage}`)
      }
    };
  };


  // Add Payment
export const addPayment = (formData) => {
  return async (dispatch) => {
    dispatch({ type: PAYMENT_ADD_REQUEST });
    try {
      const response = await axios.post(`${base_url}/payments`, formData);
      const { data } = response.data;
      console.log(data)
      dispatch({ type: PAYMENT_ADD_SUCCESS, payload: data });
      toast.success("Payment Added Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: PAYMENT_ADD_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};

// Edit Payment
export const editPayment = (paymentId, formData) => {
  return async (dispatch) => {
    dispatch({ type: PAYMENT_EDIT_REQUEST });
    try {
        const response = await axios.put(`${base_url}/payments/${paymentId}`, formData );
      const { data } = response.data;
      console.log(data)
      dispatch({ type: PAYMENT_EDIT_SUCCESS, payload: data });
      toast.success("Payment Updated Successfully");
    } catch (error) {
     
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.log(errorMessage)
      dispatch({ type: PAYMENT_EDIT_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};