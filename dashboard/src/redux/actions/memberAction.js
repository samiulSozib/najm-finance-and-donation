import axios from "axios";
import {MEMBER_LIST_REQUEST,
    MEMBER_LIST_SUCCESS,
    MEMBER_LIST_FAIL,
    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAIL,
    MEMBER_STATUS_CHANGE_REQUEST,
    MEMBER_STATUS_CHANGE_SUCCESS,
    MEMBER_STATUS_CHANGE_FAIL,
    MEMBER_ADD_REQUEST, 
    MEMBER_ADD_SUCCESS, 
    MEMBER_ADD_FAIL,
    MEMBER_EDIT_REQUEST,
    MEMBER_EDIT_SUCCESS,
    MEMBER_EDIT_FAIL,
    MEMBER_UNPAYMENT_LIST_REQUEST,
    MEMBER_UNPAYMENT_LIST_SUCCESS,
    MEMBER_UNPAYMENT_LIST_FAIL,
} from '../constants/memberConstants'
import { toast } from "react-toastify";


//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
const base_url='https://najm-finance-and-donation.nodescript-it.com'




export const memberList = (page = null, item_per_page = null, group_id = '') => {
  return async (dispatch) => {
      dispatch({ type: MEMBER_LIST_REQUEST });
      try {
          const query = [];
          if (page) {
              query.push(`page=${page}`);
          }
          if (item_per_page) {
              query.push(`item_per_page=${item_per_page}`);
          }
          if (group_id) {
              query.push(`group_id=${group_id}`);
          }

          const queryString = query.length ? `?${query.join('&')}` : '';
          const response = await axios.get(`${base_url}/members${queryString}`);
          const data = response.data.data;
          const totalItems = response.data.payload.pagination.total_items;

          dispatch({ type: MEMBER_LIST_SUCCESS, payload: { data, totalItems } });
      } catch (error) {
          const errorMessage = error.response ? error.response.data.message : error.message;
          dispatch({ type: MEMBER_LIST_FAIL, payload: errorMessage });
      }
  };
};


export const addMember = (memberData) => {
  return async (dispatch) => {
      dispatch({ type: MEMBER_ADD_REQUEST });
      try {
          const response = await axios.post(`${base_url}/members`, memberData);
          const {data}=response.data
          dispatch({ type: MEMBER_ADD_SUCCESS, payload: data });
          toast.success("Member added successfully");
      } catch (error) {
          const errorMessage = error.response ? error.response.data.message : error.message;
          dispatch({ type: MEMBER_ADD_FAIL, payload: errorMessage });
          toast.error(`Error: ${errorMessage}`);
      }
  };
};

export const editMember = (id, memberData) => {
  return async (dispatch) => {
      dispatch({ type: MEMBER_EDIT_REQUEST });
      try {
          const response = await axios.put(`${base_url}/members/${id}`, memberData);
          const {data}=response.data
          dispatch({ type: MEMBER_EDIT_SUCCESS, payload: data });
          toast.success("Member updated successfully");
      } catch (error) {
          const errorMessage = error.response ? error.response.data.message : error.message;
          dispatch({ type: MEMBER_EDIT_FAIL, payload: errorMessage });
          toast.error(`Error: ${errorMessage}`);
      }
  };
};


export const deleteMember = (id) => {
    return async (dispatch) => {
      dispatch({ type: MEMBER_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/members/${id}`);
        dispatch({ type: MEMBER_DELETE_SUCCESS, payload: id });
        toast.success("Member Detele Successfully")
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: MEMBER_DELETE_FAIL, payload: error });
        toast.error(`Error : ${errorMessage}`)
      }
    };
  };


  export const updateMemberStatus = (id, status) => {
    return async (dispatch) => {
        dispatch({ type: MEMBER_STATUS_CHANGE_REQUEST });
        try {
            await axios.patch(`${base_url}/members/${id}/status`, { status });
            dispatch({ type: MEMBER_STATUS_CHANGE_SUCCESS, payload: { id, status } });
            toast.success("member status updated successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: MEMBER_STATUS_CHANGE_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};


export const unPaymentList = () => {
    return async (dispatch) => {
        dispatch({ type: MEMBER_UNPAYMENT_LIST_REQUEST });
        try {
            const response = await axios.get(`${base_url}/members/payment-left`);
            const {data}=response.data
            
            dispatch({ type: MEMBER_UNPAYMENT_LIST_SUCCESS, payload: data });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: MEMBER_UNPAYMENT_LIST_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};