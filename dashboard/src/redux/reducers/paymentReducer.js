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

const initialState={
    payments:[],
    error:null ,
    loading:false,
    totalItems:0
}

const paymentReducer=(state=initialState,action)=>{
   
    switch(action.type){
        
        case PAYMENT_LIST_REQUEST:
            return {...state,loading:true}
        case PAYMENT_LIST_SUCCESS:
            return {...state,loading:false,payments:action.payload.data,totalItems:action.payload.totalItems}
        case PAYMENT_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case PAYMENT_DELETE_REQUEST:
            return { ...state, loading: true };
        case PAYMENT_DELETE_SUCCESS:
            return {
                  ...state,
                  loading: false,
                  payments: state.payments.filter(payment => payment.id !== action.payload), // Remove deleted blog
                };
        case PAYMENT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        
        case PAYMENT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            };
            case PAYMENT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: [...state.payments, action.payload], // Append the new blog
            };
        case PAYMENT_ADD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case PAYMENT_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
            };
            case PAYMENT_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: state.payments.map((payment) =>
                    payment.id === action.payload.id ? action.payload : payment
                ), // Update the edited blog
            };
        case PAYMENT_EDIT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state
    }
}


export default paymentReducer