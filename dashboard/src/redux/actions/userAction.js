import axios from "axios";
import {USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL } from '../constants/userConstant'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
const base_url='https://investment-api.nodescript-it.com'



export const userList=()=>{
    return async(dispatch)=>{
        dispatch({type:USER_LIST_REQUEST})
        try{
            // Get the token from localStorage
            const token = localStorage.getItem('token');

            const response=await axios.get(`${base_url}/users`)
            
            const {data}=response.data
            
            dispatch({type:USER_LIST_SUCCESS,payload:data})
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:USER_LIST_FAIL,payload:errorMessage})
        }
    }
}