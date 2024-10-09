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

const initialState={
    members:[],
    error:null ,
    loading:false,
    totalItems:0,
    unPaymentMembers: [],
}

const memberReducer=(state=initialState,action)=>{
    switch(action.type){
        case MEMBER_LIST_REQUEST:
            return {...state,loading:true}
        case MEMBER_LIST_SUCCESS:
            return {...state,loading:false,members:action.payload.data,totalItems:action.payload.totalItems}
        case MEMBER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case MEMBER_DELETE_REQUEST:
            return {
                    ...state,
                    loading: true,
                    };
        case MEMBER_DELETE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    members: state.members.filter((member) => member.id !== action.payload),
                    };
        case MEMBER_DELETE_FAIL:
            return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    };

        case MEMBER_STATUS_CHANGE_REQUEST:
            return { ...state, loading: true };
        case MEMBER_STATUS_CHANGE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    members: state.members.map((member) =>
                        member.id === action.payload.id
                    ? { ...member, status: action.payload.status }
                    : member
                ),
            };
        case MEMBER_STATUS_CHANGE_FAIL:
            return { ...state, loading: false, error: action.payload };

        case MEMBER_ADD_REQUEST:
            return { ...state, loading: true }
        case MEMBER_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                members: [...state.members, action.payload], // Add new member to the list
            }
        case MEMBER_ADD_FAIL:
            return { ...state, loading: false, error: action.payload }

        case MEMBER_EDIT_REQUEST:
            return { ...state, loading: true }
        case MEMBER_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                members: state.members.map((member) =>
                    member.id === action.payload.id
                        ? { ...member, ...action.payload } // Update the member with the new data
                        : member
                    ),
                }
        case MEMBER_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload }

        case MEMBER_UNPAYMENT_LIST_REQUEST:
            return { ...state, loading: true };
        case MEMBER_UNPAYMENT_LIST_SUCCESS:
            return { ...state, loading: false, unPaymentMembers: action.payload };
        case MEMBER_UNPAYMENT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
            

        default:
            return state
    }
}


export default memberReducer