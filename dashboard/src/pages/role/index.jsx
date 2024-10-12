import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  rolePermissionList,
  permissionList,
  addRoleWithPermissions,
  editRoleWithPermissions,
  deleteRoleWithPermissions
} from "../../redux/actions/roleAction"; // Include necessary actions
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const Role = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t,i18n}=useTranslation()
  const isMobileOrTablet = window.innerWidth <= 900;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "", // Added description to formData
    permissions: [],
  });

  const dispatch = useDispatch();
  const { role_permissions, permissions, loading } = useSelector(
    (state) => state.role
  );


  useEffect(() => {
    if (role_permissions.length === 0) {
      dispatch(rolePermissionList());
    }
    dispatch(permissionList());
  }, [dispatch]);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    const roleToEdit = role_permissions.find((role) => role.id === id);
    if (roleToEdit) {
      setFormData({
        name: roleToEdit.name,
        description: roleToEdit.description, // Set description from the selected role
        permissions: roleToEdit.Permissions.map((p) => p.id),
      });
      setEditRoleId(id);
      setIsEditing(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteRoleWithPermissions(id)); // Ensure you have a delete action
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setFormData({ name: "",description: "", permissions: [] }); // Reset description
    setEditRoleId(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ name: "", description: "", permissions: [] }); // Reset description
    setIsEditing(false);
    setEditRoleId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handlePermissionsChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     permissions: typeof value === "string" ? value.split(",") : value,
  //   }));
  // };

  const handleFormSubmit = () => {
    if (isEditing) {
      dispatch(editRoleWithPermissions(editRoleId, formData)); // Ensure you have an action to edit a role
    } else {
      console.log(formData);
      dispatch(addRoleWithPermissions(formData)); // Assuming you have an action to add a role
    }
    handleDialogClose();
  };


  const isRtl = i18n.language === 'ar' || i18n.language==='fa';
  const columns = [
    { field: "id", headerName: t('ID'), flex: 0,width:80 },
    { field: "name", headerName: t('ROLE_NAME'),width: 150, flex:isMobileOrTablet?0:1 },
    { field: "description", headerName: t('ROLE_DESCRIPTION'),width: 150, flex:isMobileOrTablet?0:1 },
    {
      field: "actions",
      headerName: t('ACTIONS'),
     width: 150, flex:isMobileOrTablet?0:1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
        
        <IconButton color="success" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
      

       
        <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      
      </Box>
      ),
    },
  ];

  return (
    <Box paddingBottom="20px" m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('ROLES')} subtitle={t('ROLE_LIST')} />
        <Button
          onClick={handleDialogOpen}
          size="small"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          {t('ADD_ROLE')}
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
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
            rows={role_permissions}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                textAlign: isRtl ? 'right' : 'left', // Ensure header text alignment is right or left
              },
              "& .MuiDataGrid-cell": {
                textAlign: isRtl ? 'right' : 'left', // Ensure cell content is also right or left aligned
              },
            }}
          />
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>
          {isEditing ? t('EDIT_ROLE') : t('ADD_ROLE')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label={t('ROLE_NAME')}
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="description" // Added description field
            label={t('ROLE_DESCRIPTION')}
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="permission-select-label">{t('ROLE_PERMISSION')}</InputLabel>
            <Box sx={{ pt: 5 }}>
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={formData.permissions.length === permissions.length}
                  onChange={() => {
                    if (formData.permissions.length === permissions.length) {
                      setFormData((prevState) => ({
                        ...prevState,
                        permissions: [],
                      }));
                    } else {
                      setFormData((prevState) => ({
                        ...prevState,
                        permissions: permissions.map((permission) => permission.id),
                      }));
                    }
                  }}
                />
                <ListItemText primary="Select All" />
              </Box>

              <Grid container spacing={2} sx={{ pt: 1 }}>
                {permissions.map((permission) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={permission.id}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={formData.permissions.indexOf(permission.id) > -1}
                        onChange={() => {
                          const currentIndex = formData.permissions.indexOf(permission.id);
                          const newPermissions = [...formData.permissions];
                          if (currentIndex === -1) {
                            newPermissions.push(permission.id);
                          } else {
                            newPermissions.splice(currentIndex, 1);
                          }
                          setFormData((prevState) => ({
                            ...prevState,
                            permissions: newPermissions,
                          }));
                        }}
                      />
                      <ListItemText primary={permission.description} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] },
            }}>{t('CANCEL')}</Button>
          <Button onClick={handleFormSubmit}sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] }
            }}>{isEditing ? t('SAVE_CHANGE'): t('ADD')}</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default Role;
