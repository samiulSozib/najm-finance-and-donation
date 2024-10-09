import axios from "axios";
import { 
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL, 
  GROUP_ADD_REQUEST, 
  GROUP_ADD_SUCCESS, 
  GROUP_ADD_FAIL, 
  GROUP_EDIT_REQUEST, 
  GROUP_EDIT_SUCCESS, 
  GROUP_EDIT_FAIL, 
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS, 
  GROUP_DELETE_FAIL 
} from '../constants/groupConstants';
import { toast } from "react-toastify";

// const base_url = process.env.REACT_APP_BASE_URL;
//const base_url = 'http://localhost:1111';
const base_url='https://najm-finance-and-donation.nodescript-it.com'



// Fetch the Group list
export const groupList = (page = null, item_per_page = null,group_type='') => {
  return async (dispatch) => {
    dispatch({ type: GROUP_LIST_REQUEST });
    try {
      const query = [];
      if (page) {
          query.push(`page=${page}`);
      }
      if (item_per_page) {
          query.push(`item_per_page=${item_per_page}`);
      }
      if (group_type) {
          query.push(`group_type=${group_type}`);
      }
      const queryString = query.length ? `?${query.join('&')}` : '';
      console.log(queryString)

      const response = await axios.get(`${base_url}/groups/group-type${queryString}`);
      const { data } = response.data;
      dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: GROUP_LIST_FAIL, payload: errorMessage });
    }
  };
};

// Add Group
export const addGroup = (groupData) => {
  return async (dispatch) => {
    dispatch({ type: GROUP_ADD_REQUEST });
    try {
    
      const response = await axios.post(`${base_url}/groups`, groupData);
      const {data}=response.data
      dispatch({ type: GROUP_ADD_SUCCESS, payload: data });
      toast.success("Group added successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: GROUP_ADD_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};

// Edit Group
export const editGroup = (groupId, updatedGroupData) => {
  return async (dispatch) => {
    dispatch({ type: GROUP_EDIT_REQUEST });
    try {
     
      const response = await axios.put(`${base_url}/groups/${groupId}`, updatedGroupData);
      const {data}=response.data
      dispatch({ type: GROUP_EDIT_SUCCESS, payload: data });
      toast.success("Group updated successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: GROUP_EDIT_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};

// Delete Group
export const deleteGroup = (groupId) => {
  return async (dispatch) => {
    dispatch({ type: GROUP_DELETE_REQUEST });
    try {
      await axios.delete(`${base_url}/groups/${groupId}`);
      dispatch({ type: GROUP_DELETE_SUCCESS, payload: groupId });
      toast.success("Group deleted successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      dispatch({ type: GROUP_DELETE_FAIL, payload: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    }
  };
};
