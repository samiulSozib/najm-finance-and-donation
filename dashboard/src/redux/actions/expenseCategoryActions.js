import axios from "axios";
import {
    EXPENSE_CATEGORY_LIST_REQUEST,
    EXPENSE_CATEGORY_LIST_SUCCESS,
    EXPENSE_CATEGORY_LIST_FAIL,
    EXPENSE_CATEGORY_DELETE_REQUEST,
    EXPENSE_CATEGORY_DELETE_SUCCESS,
    EXPENSE_CATEGORY_DELETE_FAIL,
    EXPENSE_CATEGORY_ADD_REQUEST,
    EXPENSE_CATEGORY_ADD_SUCCESS,
    EXPENSE_CATEGORY_ADD_FAIL,
    EXPENSE_CATEGORY_EDIT_REQUEST,
    EXPENSE_CATEGORY_EDIT_SUCCESS,
    EXPENSE_CATEGORY_EDIT_FAIL

} from '../constants/expenseCategoryConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
const base_url='https://najm-finance-and-donation.nodescript-it.com'

const token = localStorage.getItem('token');
const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };




export const expenseCategoryList=()=>{
    return async(dispatch)=>{
        dispatch({type:EXPENSE_CATEGORY_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/expense-categories`,config)
           
            const {data}=response.data
            dispatch({type:EXPENSE_CATEGORY_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:EXPENSE_CATEGORY_LIST_FAIL,payload:error})
        }
    }
}


export const deleteExpenseCategory = (id) => async (dispatch) => {
    dispatch({ type: EXPENSE_CATEGORY_DELETE_REQUEST });
    try {
      await axios.delete(`${base_url}/expense-categories/${id}`,config);
      dispatch({ type: EXPENSE_CATEGORY_DELETE_SUCCESS, payload: id });
      toast.success("Expense Category Deleted Successfully")
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: EXPENSE_CATEGORY_DELETE_FAIL,
        payload:errorMessage});
      toast.error(`Error : ${errorMessage}`)
    }
  };


  export const insertExpenseCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: EXPENSE_CATEGORY_ADD_REQUEST });
    try {
      const response = await axios.post(`${base_url}/expense-categories`, categoryData, config);
      const { data } = response.data;
      dispatch({ type: EXPENSE_CATEGORY_ADD_SUCCESS, payload: data });
      toast.success("Expense Category Added Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: EXPENSE_CATEGORY_ADD_FAIL,
        payload: errorMessage,
      });
      toast.error(`Error: ${errorMessage}`);
    }
  };
  

  export const editExpenseCategory = (id, categoryData) => async (dispatch) => {
    dispatch({ type: EXPENSE_CATEGORY_EDIT_REQUEST });
    try {
      const response = await axios.put(`${base_url}/expense-categories/${id}`, categoryData, config);
      const { data } = response.data;
      dispatch({ type: EXPENSE_CATEGORY_EDIT_SUCCESS, payload: data });
      toast.success("Expense Category Updated Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: EXPENSE_CATEGORY_EDIT_FAIL,
        payload: errorMessage,
      });
      toast.error(`Error: ${errorMessage}`);
    }
  };
  