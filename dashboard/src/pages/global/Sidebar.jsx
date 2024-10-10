// src/pages/global/Sidebar.js
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

const Item = ({ title, to, icon, selected, setSelected, isRTL }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        textAlign: isRTL ? "right" : "left",
      }}
      onClick={() => setSelected(title)}
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

  // Media queries for screen sizes
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTabletOrDesktop = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    // Collapse or expand based on screen size
    if (isMobile) {
      setIsCollapsed(true);
    } else if (isTabletOrDesktop) {
      setIsCollapsed(false);
    }
  }, [isMobile, isTabletOrDesktop, setIsCollapsed]);

  return (
    <Box
      sx={{
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
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && !isMobile && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER INFO */}
          {!isCollapsed && !isMobile && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="../../assets/user.png"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
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
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title={t("DASHBOARD")}
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            {(permissions.includes('manage_group_types') || permissions.includes('view_group_types')) && (
              <Item
                title={t("GROUP_TYPE")}
                to="/group-types"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isRTL={isRTL}
              />
            )}
            <Item
              title={t("MEMBERS")}
              to="/members"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            <Item
              title={t("EVENTS")}
              to="/event"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            <Item
              title={t("EXPENSE_CATEGORY")}
              to="/expense-categories"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            <Item
              title={t("EXPENSES")}
              to="/expense"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            <Item
              title={t("PAYMENTS")}
              to="/payment"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isRTL={isRTL}
            />
            {(permissions.includes("view_roles") ||
              permissions.includes("manage_roles")) && (
              <Item
                title={t("ROLES")}
                to="/role"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isRTL={isRTL}
              />
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
