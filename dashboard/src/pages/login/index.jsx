import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import { singIn } from '../../redux/actions/authAction';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = () => {
    console.log(email, password);
    dispatch(singIn({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      console.log("login success");
    } else {
      console.log(isAuthenticated);
    }
  }, [isAuthenticated]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={colors.primary[400]}
    >
      {/* Title at the top */}
      <Box mt={2} mb={4}>
        <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
          Najm Finance and Donation
        </Typography>
      </Box>

      <Card
        sx={{
          width: { xs: '90%', sm: '400px' }, // Responsive width
          bgcolor: colors.primary[500],
          boxShadow: `0px 4px 20px ${colors.grey[800]}`,
          borderRadius: '8px',
        }}
      >
        <CardContent>
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
            disabled={loading} // Disable button while loading
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              padding: "10px",
              position: 'relative', // To position the spinner
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </CardContent>
      </Card>

      <ToastContainer />
    </Box>
  );
};

export default Login;
