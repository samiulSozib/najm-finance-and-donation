import { Box, IconButton, MenuItem, Select, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language"; // Import Language icon
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  
  const { t, i18n } = useTranslation(); // Access translation functions
  const [language, setLanguage] = useState(i18n.language); // Set initial language from i18n

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change the language
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* Search bar logic can go here */}
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        {/* Theme toggle button */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        {/* Language change option */}
        <Box display="flex" alignItems="center" ml={2}>
          <LanguageIcon />
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ ml: 1, color: colors.grey[100] }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>
        </Box>

        {/* Logout button */}
        <IconButton onClick={handleLogout} color="error">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
