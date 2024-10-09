import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import {useDispatch,useSelector} from 'react-redux'
import {singIn} from '../../redux/actions/authAction'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch();
  const {loading,error,isAuthenticated} =useSelector((state)=>state.auth)


  const handleLogin = () => {
    console.log(email,password)
    dispatch(singIn({email,password}))
  };

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
      console.log("login success")
    }else{
      console.log(isAuthenticated)
    }
  },[isAuthenticated])

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={colors.primary[400]}
    >
      <Box
        width="400px"
        p="30px"
        borderRadius="8px"
        bgcolor={colors.primary[500]}
        boxShadow={`0px 4px 20px ${colors.grey[800]}`}
      >
        <Typography
          variant="h4"
          mb="20px"
          color={colors.grey[100]}
          textAlign="center"
        >
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.grey[300],
              },
              "&:hover fieldset": {
                borderColor: colors.blueAccent[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[300],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.blueAccent[500],
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.grey[300],
              },
              "&:hover fieldset": {
                borderColor: colors.blueAccent[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[300],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.blueAccent[500],
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            padding: "10px",
            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Login
        </Button>
        
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default Login;
