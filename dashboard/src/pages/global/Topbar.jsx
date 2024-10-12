import { Box, IconButton, Select, useTheme,MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { useSidebar } from "../../context/SidebarContext"; 
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const { setIsCollapsed } = useSidebar(); // Get setIsCollapsed function

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    // Collapse and reopen sidebar when language is changed
    setIsCollapsed(true); // Collapse the sidebar
    setTimeout(() => setIsCollapsed(false), 1000); 
  };

  // Handle opening the sidebar from the menu icon click
  const handleSidebarToggle = () => {
    setIsCollapsed((prev) => !prev); 
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
     
      position: 'fixed', // Make the Topbar fixed
      top: 0, // Position it at the top
      left: 0, // Align to the left
      right: 0, // Align to the right
      backgroundColor: theme.palette.background.default, // Ensure it has a background
      zIndex: 1100, // Ensure it's above other elements
    }}>
      <Box display="flex">
      <IconButton onClick={handleSidebarToggle} >
          <MenuIcon />
        </IconButton>
        
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        {/* Mobile Menu Icon */}
        

        <Box display="flex" alignItems="center" ml={2}>
          <LanguageIcon />
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ ml: 1, color: colors.grey[100] }}
          >
            <MenuItem value="en" disabled={language === 'en'}>
              English
            </MenuItem>
            <MenuItem value="ar" disabled={language === 'ar'}>
              Arabic
            </MenuItem>
            <MenuItem value="fa" disabled={language === 'fa'}>
              Persian
            </MenuItem>
          </Select>
        </Box>
        
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
