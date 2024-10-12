import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSidebar } from "../../context/SidebarContext"; // Import the context

const Item = ({ title, to, icon, selected, setSelected, isRTL, isMobile, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    setSelected(title);
    if (isMobile) {
      setIsCollapsed(true); // Collapse sidebar on mobile after item is clicked
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        textAlign: isRTL ? "right" : "left",
      }}
      onClick={handleClick}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed, setIsCollapsed } = useSidebar(); // Use the context
  const [selected, setSelected] = useState("Dashboard");
  const { t, i18n } = useTranslation();
  const { permissions } = useSelector((state) => state.auth);

  // Detect if current language is RTL
  const isRTL = i18n.language === "ar" || i18n.language === "fa";

  // Media query to determine mobile state
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
    {isMobile && !isCollapsed && (
      <Box
        onClick={() => setIsCollapsed(true)} // Close sidebar when clicking on the overlay
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
          zIndex: 1000, // Position it above the content
        }}
      />
    )}
    <Box
    sx={{
      // Control visibility and sizing
      visibility: isMobile ? (isCollapsed ? 'hidden' : 'visible') : 'visible',
      opacity: isMobile ? (isCollapsed ? 0 : 1) : 1,
      transition: 'visibility 0s, opacity 0.5s linear',
      width: isCollapsed ? '0' : '350px',
      
      paddingTop: '90px', // Add padding to the top of the sidebar
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`,
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: isRTL ? "5px 20px 5px 35px !important" : "5px 35px 5px 20px !important",
        textAlign: isRTL ? "right" : "left",
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important",
      },
    }}
    >
      <ProSidebar collapsed={isCollapsed} rtl={isRTL}>
        <Menu iconShape="square">
          {/* USER INFO */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Add user profile image here */}
                <img src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-File.png" alt="" width={80} height={80}/>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {t("SIDEBAR_TITLE_NAME")}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : ""}>
            <Item
              title={t("DASHBOARD")}
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed} // Pass function to close sidebar
            />
            {(permissions.includes('manage_group_types') || permissions.includes('view_group_types')) && (
              <Item
                title={t("GROUP_TYPE")}
                to="/group-types"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isRTL={isRTL}
                isMobile={isMobile}
                setIsCollapsed={setIsCollapsed}
              />
            )}
            <Item
              title={t("MEMBERS")}
              to="/members"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title={t("EVENTS")}
              to="/event"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title={t("EXPENSE_CATEGORY")}
              to="/expense-categories"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title={t("EXPENSES")}
              to="/expense"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title={t("PAYMENTS")}
              to="/payment"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
            />
            {(permissions.includes("view_roles") || permissions.includes("manage_roles")) && (
              <Item
                title={t("ROLES")}
                to="/role"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isRTL={isRTL}
                isMobile={isMobile}
                setIsCollapsed={setIsCollapsed}
              />
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </>
  );
};

export default Sidebar;
