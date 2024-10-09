import {USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL } from '../constants/userConstant'

const initialState={
    users:[],
    error:null ,
    loading:false
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {...state,loading:true}
        case USER_LIST_SUCCESS:
            return {...state,loading:false,users:action.payload}
        case USER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        default:
            return state
    }
}


export default userReducer