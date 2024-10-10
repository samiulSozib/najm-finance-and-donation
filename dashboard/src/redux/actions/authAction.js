import axios from "axios"
import { toast } from 'react-toastify';
//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1111'
//const base_url='https://najm-finance-and-donation.nodescript-it.com'
import { base_url } from "../../util/config"; 


const loginUrl=`${base_url}/auth/sign-in`

export const singIn=(signInInfo)=>{
    return async(dispatch)=>{
        //console.log(signInInfo)
        dispatch({type:"SIGN_IN_REQUEST"})
        try{
            const response=await axios.post(loginUrl,signInInfo)
            console.log(response)
            const {token,user}=response.data
           
            // const isAdmin = user.user_role.some(roleObj => roleObj.role === "admin");
            // if(!isAdmin){
            //     toast.error("Log In Fail, You are not admin")
            //     throw new Error("Not authorized");
            // }
            dispatch({type:"SIGN_IN_SUCCESS",payload:{token,user}})
            toast.success("Login Success")
        }catch(error){
            console.log(error)
            dispatch({type:"SIGN_IN_FAIL",payload:error.message})
            toast.error(`Login Fail ${error.message}`)
        }
    }
}


export const logout = () => {
    return (dispatch) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    };
  };