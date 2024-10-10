// src/pages/global/Topbar.js
import { Box, IconButton, MenuItem, Select, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { useSidebar } from "../../context/SidebarContext"; // Import the context

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const { setIsCollapsed } = useSidebar(); // Use the context

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    // Collapse and reopen sidebar when language is changed
    setIsCollapsed(true); // Collapse the sidebar
    setTimeout(() => setIsCollapsed(false), 1000); // Reopen the sidebar after a short delay
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        {/* Search bar logic can go here */}
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
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
