import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from 'react-redux';
import { groupTypeList, deleteGroupType, insertGroupType, editGroupType } from '../../redux/actions/groupTypeAction';
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 


const GroupType = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, i18n } = useTranslation();
  const isMobileOrTablet = window.innerWidth <= 900;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedUsra, setSelectedUsra] = useState(null);
  const [editGroupTypeId, setEditGroupTypeId] = useState(null);
  const navigate = useNavigate();

  // State for add/edit dialog
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const dispatch = useDispatch();
  const { loading,groupTypes } = useSelector((state) => state.groupType);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(groupTypeList());
  }, [dispatch]);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setFormData({ name: "" }); // Reset form for add
    setOpenAddEditDialog(true);
  };

  const handleEdit = (id) => {
    const usra = groupTypes.find((groupType) => groupType.id === id);
    setFormData(usra); // Fill the form with the selected row data
    setIsEditing(true);
    setOpenAddEditDialog(true);
    setEditGroupTypeId(id);
    handleMenuClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteGroupType(id));
    handleMenuClose();
  };

  const handleDetails = (id) => {
    navigate(`/group-types/details/${id}`);
    handleMenuClose();
  };

  const handleAddEditSubmit = () => {
    if (isEditing) {
      dispatch(editGroupType(editGroupTypeId, formData)); // Edit Group Type
    } else {
      dispatch(insertGroupType(formData)); // Add new Group Type
    }
    setOpenAddEditDialog(false);
    setFormData({ name: "" }); // Reset the form
  };

  const handleAddEditClose = () => {
    setOpenAddEditDialog(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Detect if the language is Arabic (RTL)
  const isRtl = i18n.language === 'ar' || i18n.language==='fa';

  // Responsive breakpoints for different devices
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const columns = [
    { 
      field: "id", 
      headerName: t('ID'), 
      flex: 0, // Flex size depends on screen size
      widht:80
    },
    { 
      field: "name", 
      headerName: t('GROUP_TYPE_NAME'), 
      width: 120,flex:isMobileOrTablet?0:1,
    },
    
    {
      field: "actions",
      headerName: t('ACTIONS'),
      width: 150,flex:isMobileOrTablet?0:1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
          {/* Edit Icon Button */}
          <IconButton color="success" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>

          {/* Delete Icon Button */}
          <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>

          {/* View/Details Icon Button */}
          <IconButton color="default" onClick={() => handleDetails(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
      </Box>
      ),
    },
  ];

  return (
    <Box paddingBottom="20px"  m={isMobile ? "10px" : "20px"} dir={isRtl ? 'rtl' : 'ltr'}>
      <Box display="flex" justifyContent="space-between" alignItems="start" flexDirection={isMobile ? 'column' : 'row'}>
        <Header title={t('GROUP_TYPE')} subtitle={t('GROUP_TYPE_LIST')} />
        <Button
          onClick={handleAdd}
          size={isMobile ? "small" : "medium"}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            padding: isMobile ? "8px 16px" : "10px 20px",
            marginTop: isMobile ? "10px" : "0",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          {t('ADD_GROUP_TYPE')}
        </Button>
      </Box>
      <Box
        m={isMobile ? "20px 0" : "40px 0"}
        height={isMobile ? "60vh" : "75vh"}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={60} />
            <Typography variant="h6" ml={2}>
              Loading ...
            </Typography>
          </Box>
        ) : (
        <DataGrid
          rows={groupTypes}
          columns={columns}
          components={{ Toolbar: isDesktop && GridToolbar }} // Only show toolbar on desktop
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              textAlign: isRtl ? 'right' : 'left',
            },
            "& .MuiDataGrid-cell": {
              textAlign: isRtl ? 'right' : 'left',
            },
          }}
        />
        )}
      </Box>

      {/* Add/Edit Group Type Dialog */}
      <Dialog open={openAddEditDialog} onClose={handleAddEditClose} dir={isRtl ? 'rtl' : 'ltr'}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>
          {isEditing ? t('EDIT_GROUP_TYPE') : t('ADD_GROUP_TYPE')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label={t('GROUP_TYPE_NAME')}
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            dir={isRtl ? 'rtl' : 'ltr'}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
          <Button 
            onClick={handleAddEditClose} 
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: isMobile ? "6px 12px" : "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] },
              marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'
            }}
          >
            {t("CANCEL")}
          </Button>
          <Button 
            onClick={handleAddEditSubmit} 
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: isMobile ? "6px 12px" : "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] }
            }}
          >
            {t(isEditing ? "EDIT" : "ADD")}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default GroupType;
