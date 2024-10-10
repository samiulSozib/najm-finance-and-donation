import axios from "axios";
import {
    ROLE_PERMISSION_LIST_REQUEST,
    ROLE_PERMISSION_LIST_SUCCESS,
    ROLE_PERMISSION_LIST_FAIL,
    PERMISSION_LIST_REQUEST,
    PERMISSION_LIST_SUCCESS,
    PERMISSION_LIST_FAIL,
    ROLE_PERMISSION_ADD_REQUEST,
    ROLE_PERMISSION_ADD_SUCCESS,
    ROLE_PERMISSION_ADD_FAIL,
    ROLE_PERMISSION_EDIT_REQUEST,
    ROLE_PERMISSION_EDIT_SUCCESS,
    ROLE_PERMISSION_EDIT_FAIL,
    ROLE_PERMISSION_DELETE_REQUEST,
    ROLE_PERMISSION_DELETE_SUCCESS,
    ROLE_PERMISSION_DELETE_FAIL,

} from '../constants/roleConstant'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
import { base_url } from "../../util/config"; 



export const rolePermissionList=()=>{
    return async(dispatch)=>{
        dispatch({type:ROLE_PERMISSION_LIST_REQUEST})
        try{
          
            const response=await axios.get(`${base_url}/role-permission`)
            
            const {data}=response.data
            
            dispatch({type:ROLE_PERMISSION_LIST_SUCCESS,payload:data})
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:ROLE_PERMISSION_LIST_FAIL,payload:errorMessage})
        }
    }
}





export const permissionList=()=>{
    return async(dispatch)=>{
        dispatch({type:PERMISSION_LIST_REQUEST})
        try{
          
            const response=await axios.get(`${base_url}/role-permission/permissions`)
           
            const {data}=response.data
            
            dispatch({type:PERMISSION_LIST_SUCCESS,payload:data})
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:PERMISSION_LIST_FAIL,payload:errorMessage})
        }
    }
}


export const addRoleWithPermissions = (roleData) => {
    return async (dispatch) => {
        dispatch({ type: ROLE_PERMISSION_ADD_REQUEST });
        try {
            const response = await axios.post(`${base_url}/role-permission`, roleData);
            const { data } = response.data;
            
            dispatch({ type: ROLE_PERMISSION_ADD_SUCCESS, payload: data });
            toast.success("Role and permissions added successfully!");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: ROLE_PERMISSION_ADD_FAIL, payload: errorMessage });
            toast.error(`Failed to add role and permissions: ${errorMessage}`);
        }
    };
};

export const editRoleWithPermissions = (roleId, updatedRoleData) => {
    return async (dispatch) => {
        dispatch({ type: ROLE_PERMISSION_EDIT_REQUEST });
        try {
            const response = await axios.put(`${base_url}/role-permission/${roleId}`, updatedRoleData);
            const { data } = response.data;

            dispatch({ type: ROLE_PERMISSION_EDIT_SUCCESS, payload: data });
            toast.success("Role and permissions updated successfully!");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: ROLE_PERMISSION_EDIT_FAIL, payload: errorMessage });
            toast.error(`Failed to update role and permissions: ${errorMessage}`);
        }
    };
};


export const deleteRoleWithPermissions = (roleId) => {
    return async (dispatch) => {
        dispatch({ type: ROLE_PERMISSION_DELETE_REQUEST });
        try {
            await axios.delete(`${base_url}/role-permission/${roleId}`);
            
            dispatch({ type: ROLE_PERMISSION_DELETE_SUCCESS, payload: roleId });
            toast.success("Role and permissions deleted successfully!");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: ROLE_PERMISSION_DELETE_FAIL, payload: errorMessage });
            toast.error(`Failed to delete role and permissions: ${errorMessage}`);
        }
    };
};