import {
    EXPENSE_CATEGORY_LIST_REQUEST,
    EXPENSE_CATEGORY_LIST_SUCCESS,
    EXPENSE_CATEGORY_LIST_FAIL,
    EXPENSE_CATEGORY_DELETE_REQUEST,
    EXPENSE_CATEGORY_DELETE_SUCCESS,
    EXPENSE_CATEGORY_DELETE_FAIL,
    EXPENSE_CATEGORY_ADD_REQUEST,
    EXPENSE_CATEGORY_ADD_SUCCESS,
    EXPENSE_CATEGORY_ADD_FAIL,
    EXPENSE_CATEGORY_EDIT_REQUEST,
    EXPENSE_CATEGORY_EDIT_SUCCESS,
    EXPENSE_CATEGORY_EDIT_FAIL
   
} from '../constants/expenseCategoryConstants'

const initialState={
    expenseCategories:[],
    error:null ,
    loading:false
}

const expenseCategoryReducer=(state=initialState,action)=>{
    switch(action.type){
        case EXPENSE_CATEGORY_LIST_REQUEST:
            return {...state,loading:true}
        case EXPENSE_CATEGORY_LIST_SUCCESS:
            return {...state,loading:false,expenseCategories:action.payload}
        case EXPENSE_CATEGORY_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case EXPENSE_CATEGORY_DELETE_REQUEST:
            return { ...state, loading: true };
        case EXPENSE_CATEGORY_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenseCategories: state.expenseCategories.filter(category => category.id !== action.payload),
            };
        case EXPENSE_CATEGORY_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        case EXPENSE_CATEGORY_ADD_REQUEST:
            return { ...state, loading: true };
            case EXPENSE_CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                expenseCategories: [...state.expenseCategories, action.payload],
            };
        case EXPENSE_CATEGORY_ADD_FAIL:
            return { ...state, loading: false, error: action.payload };
          
        case EXPENSE_CATEGORY_EDIT_REQUEST:
            return { ...state, loading: true };
        case EXPENSE_CATEGORY_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                expenseCategories: state.expenseCategories.map((category) =>
                category.id === action.payload.id ? action.payload : category
                ),
            };
        case EXPENSE_CATEGORY_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state
    }
}


export default expenseCategoryReducer