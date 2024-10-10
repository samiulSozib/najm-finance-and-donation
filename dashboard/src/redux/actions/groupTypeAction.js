import axios from "axios";
import {
    GROUP_TYPE_LIST_REQUEST,
    GROUP_TYPE_LIST_SUCCESS,
    GROUP_TYPE_LIST_FAIL,
    GROUP_TYPE_DELETE_REQUEST,
    GROUP_TYPE_DELETE_SUCCESS,
    GROUP_TYPE_DELETE_FAIL,
    GROUP_TYPE_ADD_REQUEST,
    GROUP_TYPE_ADD_SUCCESS,
    GROUP_TYPE_ADD_FAIL,
    GROUP_TYPE_EDIT_REQUEST,
    GROUP_TYPE_EDIT_SUCCESS,
    GROUP_TYPE_EDIT_FAIL

} from '../constants/groupTypeConstant'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
import { base_url } from "../../util/config"; 






export const groupTypeList=()=>{
    return async(dispatch)=>{
        dispatch({type:GROUP_TYPE_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/group-types`)
           
            const {data}=response.data
            dispatch({type:GROUP_TYPE_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:GROUP_TYPE_LIST_FAIL,payload:error})
        }
    }
}


export const deleteGroupType = (id) => async (dispatch) => {
    dispatch({ type: GROUP_TYPE_DELETE_REQUEST });
    try {
      await axios.delete(`${base_url}/group-types/${id}`);
      dispatch({ type: GROUP_TYPE_DELETE_SUCCESS, payload: id });
      toast.success("Group Type Deleted Successfully")
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: GROUP_TYPE_DELETE_FAIL,
        payload:errorMessage});
      toast.error(`Error : ${errorMessage}`)
    }
  };


  export const insertGroupType = (groupTypeData) => async (dispatch) => {
    dispatch({ type: GROUP_TYPE_ADD_REQUEST });
    try {
      const response = await axios.post(`${base_url}/group-types`, groupTypeData);
      const { data } = response.data;
      dispatch({ type: GROUP_TYPE_ADD_SUCCESS, payload: data });
      toast.success("Group Type Added Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: GROUP_TYPE_ADD_FAIL,
        payload: errorMessage,
      });
      toast.error(`Error: ${errorMessage}`);
    }
  };
  

  export const editGroupType = (id, groupTypeData) => async (dispatch) => {
    dispatch({ type: GROUP_TYPE_EDIT_REQUEST });
    try {
      const response = await axios.put(`${base_url}/group-types/${id}`, groupTypeData);
      const { data } = response.data;
      dispatch({ type: GROUP_TYPE_EDIT_SUCCESS, payload: data });
      toast.success("Group Type Updated Successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({
        type: GROUP_TYPE_EDIT_FAIL,
        payload: errorMessage,
      });
      toast.error(`Error: ${errorMessage}`);
    }
  };
  