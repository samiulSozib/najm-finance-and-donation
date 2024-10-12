// src/pages/global/Footer.js
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.primary[400],
       padding:"10px",
        textAlign: "center",
        color: colors.grey[100],
      }}
    >
      <Typography variant="body2">
        Developed by Woosat © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
