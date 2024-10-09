

const initialAuthState={
    loading:false,
    isAuthenticated:!!localStorage.getItem("token"),
    user:JSON.parse(localStorage.getItem("user"))||null,
    error:"",
    signUpSuccess:false,
    token:localStorage.getItem("token")||"",
    permissions: (JSON.parse(localStorage.getItem("user"))?.permissions) || [] 
}

const signInReducer=(state=initialAuthState,action)=>{
    switch(action.type){
        
        case "SIGN_IN_REQUEST":
            return {...state,loading:true}

        case "SIGN_IN_SUCCESS":
            localStorage.setItem("user",JSON.stringify(action.payload.user))
            localStorage.setItem("token",action.payload.token)
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user,
                token:action.payload.token,
                error:'',
                permissions:action.payload.user.permissions
            }

        case "SIGN_IN_FAIL":
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                token:'',
                permissions:[]
            }
        default:
            return state
    }
}


export default signInReducer