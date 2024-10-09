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

const initialState={
    events:[],
    error:null ,
    loading:false,
}

const eventReducer=(state=initialState,action)=>{
    switch(action.type){
        case EVENT_LIST_REQUEST:
            return {...state,loading:true}
        case EVENT_LIST_SUCCESS:
            return {...state,loading:false,events:action.payload}
        case EVENT_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case EVENT_CREATE_REQUEST:
            return {...state,loading:true}
        case EVENT_CREATE_SUCCESS:
            return {...state,loading:false,events:[...state.events,action.payload]}
        case EVENT_CREATE_FAIL:
            return {...state,loading:false,error:action.payload}
        case EVENT_DELETE_REQUEST:
            return { ...state, loading: true };
        case EVENT_DELETE_SUCCESS:
            return { ...state, loading: false, events: state.events.filter(event => event.id !== action.payload) 
            };
        case EVENT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case EVENT_UPDATE_REQUEST:
            return { ...state, loading: true };
        case EVENT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };
        case EVENT_UPDATE_FAIL:
             return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default eventReducer