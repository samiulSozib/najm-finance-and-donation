import axios from "axios";
import {
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL ,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
} from '../constants/eventConstants'
import { toast } from 'react-toastify';

//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
//const base_url='https://najm-finance-and-donation.nodescript-it.com'

import { base_url } from "../../util/config"; 

export const eventList=()=>{
    return async(dispatch)=>{
        dispatch({type:EVENT_LIST_REQUEST})
        try{
            const response=await axios.get(`${base_url}/events`)
            const {data}=response.data
            dispatch({type:EVENT_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({type:EVENT_LIST_FAIL,payload:error})
            
        }
    }
}


export const insertEvent=(eventInfo)=>{
    return async(dispatch)=>{
        dispatch({type:EVENT_CREATE_REQUEST})
        try{
            const response=await axios.post(`${base_url}/events`,eventInfo)
            const {data}=response.data
            dispatch({type:EVENT_CREATE_SUCCESS,payload:data})
            toast.success("Event add successfully")
        }catch(error){
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({type:EVENT_CREATE_FAIL,payload:errorMessage})
            toast.error(`Error : ${errorMessage}`)
        }
    }
}


export const deleteEvent = (eventId) => {
    return async (dispatch) => {
      dispatch({ type: EVENT_DELETE_REQUEST });
      try {
        await axios.delete(`${base_url}/events/${eventId}`);
        dispatch({ type: EVENT_DELETE_SUCCESS, payload: eventId });
        toast.success('Event deleted successfully');
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: EVENT_DELETE_FAIL, payload: errorMessage });
        toast.error(`Error: ${errorMessage}`);
      }
    };
  };


  export const editEvent = (eventId, eventInfo) => {
    return async (dispatch) => {
        dispatch({ type: EVENT_UPDATE_REQUEST });
        try {
            const response = await axios.put(`${base_url}/events/${eventId}`, eventInfo);
            const { data } = response.data;
            dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
            toast.success("event updated successfully");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch({ type: EVENT_UPDATE_FAIL, payload: errorMessage });
            toast.error(`Error: ${errorMessage}`);
        }
    };
};