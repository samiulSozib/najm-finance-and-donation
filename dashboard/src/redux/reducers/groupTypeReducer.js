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

const initialState={
    groupTypes:[],
    error:null ,
    loading:false
}

const groupTypeReducer=(state=initialState,action)=>{
    switch(action.type){
        case GROUP_TYPE_LIST_REQUEST:
            return {...state,loading:true}
        case GROUP_TYPE_LIST_SUCCESS:
            return {...state,loading:false,groupTypes:action.payload}
        case GROUP_TYPE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case GROUP_TYPE_DELETE_REQUEST:
            return { ...state, loading: true };
        case GROUP_TYPE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                groupTypes: state.groupTypes.filter(groupType => groupType.id !== action.payload),
            };
        case GROUP_TYPE_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        case GROUP_TYPE_ADD_REQUEST:
            return { ...state, loading: true };
            case GROUP_TYPE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                groupTypes: [...state.groupTypes, action.payload],
            };
        case GROUP_TYPE_ADD_FAIL:
            return { ...state, loading: false, error: action.payload };
          
        case GROUP_TYPE_EDIT_REQUEST:
            return { ...state, loading: true };
        case GROUP_TYPE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                groupTypes: state.groupTypes.map((groupType) =>
                    groupType.id === action.payload.id ? action.payload : groupType
                ),
            };
        case GROUP_TYPE_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state
    }
}


export default groupTypeReducer