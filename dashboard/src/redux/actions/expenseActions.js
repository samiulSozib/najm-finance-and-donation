import axios from "axios";
import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_FAIL,
    EXPENSE_INSERT_REQUEST,
    EXPENSE_INSERT_SUCCESS,
    EXPENSE_INSERT_FAIL,
    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL,
    EXPENSE_EDIT_REQUEST,
    EXPENSE_EDIT_SUCCESS,
    EXPENSE_EDIT_FAIL,

} from '../constants/expenseConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
import { base_url } from "../../util/config"; 


export const expenseList=()=>{
    return async(dispatch)=>{
        dispatch({type:EXPENSE_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/expenses`)
           
            const {data}=response.data
          
            dispatch({type:EXPENSE_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:EXPENSE_LIST_FAIL,payload:error})
        }
    }
}

export const insertExpense = (expensesData) => {
    return async (dispatch) => {
        dispatch({ type: EXPENSE_INSERT_REQUEST });
        try {
            const response = await axios.post(`${base_url}/expenses`, expensesData);
            const { data } = response.data;
            dispatch({ type: EXPENSE_INSERT_SUCCESS, payload: data });
            toast.success("Expense Created Successfully")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: EXPENSE_INSERT_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`)
        }
    };
};


export const deleteExpense = (id) => {
    return async (dispatch) => {
        dispatch({ type: EXPENSE_DELETE_REQUEST });
        try {
            await axios.delete(`${base_url}/expenses/${id}`);
            dispatch({ type: EXPENSE_DELETE_SUCCESS, payload: id });
            toast.success("Deleted Successfully")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: EXPENSE_DELETE_FAIL, payload: errorMessage });
            toast.error(`Error : ${errorMessage}`)
        }
    };
};


export const editExpense = (id, updatedExpenseData) => {
    return async (dispatch) => {
        dispatch({ type: EXPENSE_EDIT_REQUEST });
        try {
            const response = await axios.put(`${base_url}/expenses/${id}`, updatedExpenseData);
            console.log(response)
            const { data } = response.data;
            dispatch({ type: EXPENSE_EDIT_SUCCESS, payload: data });
            toast.success("Expense Updated Successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: EXPENSE_EDIT_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};