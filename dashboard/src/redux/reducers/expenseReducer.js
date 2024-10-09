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


const initialState={
    expenses:[],
    error:null ,
    loading:false
}

const expenseReducer=(state=initialState,action)=>{
    switch(action.type){
        case EXPENSE_LIST_REQUEST:
            return {...state,loading:true}
        case EXPENSE_LIST_SUCCESS:
            return {...state,loading:false,expenses:action.payload}
        case EXPENSE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case EXPENSE_INSERT_REQUEST:
            return { ...state, loading: true };
        case EXPENSE_INSERT_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: [...state.expenses, action.payload],
            };
        case EXPENSE_INSERT_FAIL:
             return { ...state, loading: false, error: action.payload };

        case EXPENSE_DELETE_REQUEST:
            return { ...state, loading: true };
        case EXPENSE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        case EXPENSE_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
            
        case EXPENSE_EDIT_REQUEST:
            return { ...state, loading: true };
        case EXPENSE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: state.expenses.map((expense) =>
                    expense.id === action.payload.id ? action.payload : expense
                ),
            };
        case EXPENSE_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export default expenseReducer