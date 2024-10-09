import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, InputLabel, FormControl } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from 'react-redux';
import { groupList,addGroup,deleteGroup,editGroup } from '../../redux/actions/groupActions'; 
import {groupTypeList} from '../../redux/actions/groupTypeAction'
import {userList} from '../../redux/actions/userAction'
import UserDetails from "./detailsUser";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";

const Group = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation()
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editGroupId,setEditGroupId]=useState(null)

  // State for add/edit dialog
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", leader_id: "",group_type:"" });

  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const { groupTypes } = useSelector((state) => state.groupType);
  const {users}=useSelector((state)=>state.user)
  const {permissions}=useSelector((state)=>state.auth)

  useEffect(() => {
    dispatch(groupList());
    dispatch(userList())
    dispatch(groupTypeList())
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
    setFormData({ name: "", description: "", leader_id: "" }); // Reset form for add
    setOpenAddEditDialog(true);
  };

  const handleEdit = (id) => {
    const group = groups.find((group) => group.id === id);
    setFormData(group); // Fill the form with the selected row data
    setIsEditing(true);
    setOpenAddEditDialog(true);
    setEditGroupId(id)
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteGroup(selectedRowId));
    handleMenuClose();
  };

  const handleDetails = () => {
    const group = groups.find((group) => group.id === selectedRowId);
    setSelectedGroup(group);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedGroup(null);
  };

  const handleAddEditSubmit = () => {
    if (isEditing) {
      dispatch(editGroup(editGroupId, formData)); // Edit Group
    } else {
      dispatch(addGroup(formData)); // Add new Group
    }
    setOpenAddEditDialog(false);
    setFormData({ name: "", description: "", leader_id: "",group_type:"" }); // Reset the form
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "GroupType.name", headerName: "Group Type", flex: 1 ,
      renderCell:(params)=>{
        return params.row.GroupType?.name||"N/A"
      }
    },
    { field: "leader_id", headerName: "Leader", flex: 1 ,
      renderCell:(params)=>{
        return params.row.User?.username||"N/A"
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRowId === params.row.id}
            onClose={handleMenuClose}
          >
           
              <MenuItem onClick={()=>handleEdit(params.row.id)}>{t('EDIT')}</MenuItem>
          
           
              <MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
           
            <MenuItem onClick={handleDetails}>{t('DETAILS')}</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Group" subtitle="Group List" />
       
          <Button
          onClick={handleAdd}
          size="small"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          Add Group
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
        <DataGrid
          rows={groups}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Add/Edit Group Dialog */}
      <Dialog open={openAddEditDialog} onClose={handleAddEditClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>{isEditing ?"Edit Group" : "Add Group"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Group Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
          />
          {isEditing? (<FormControl fullWidth margin="dense">
            <InputLabel id="leader-label">{t("SELECT_LEADER")}</InputLabel>
            <Select
              labelId="leader-label"
              name="leader_id"
              value={formData.leader_id}
              onChange={handleInputChange}
              label={t("SELECT_LEADER")}
              required
            >
              {users && users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  Email: {user.email}
                  <br />
                  User: {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>):""}

          <FormControl fullWidth margin="dense">
            <InputLabel id="leader-label">Select Group</InputLabel>
            <Select
              labelId="group-label"
              name="group_type"
              value={formData.group_type}
              onChange={handleInputChange}
              label="Select Group"
              required
            >
              {groupTypes && groupTypes.map((groupType) => (
                <MenuItem key={groupType.id} value={groupType.id}>
                  {groupType.name}
                  
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddEditClose} sx={{ backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] }, }}>{t("CANCEL")}</Button>
          <Button onClick={handleAddEditSubmit} color="primary" sx={{  backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] }}}>
            {isEditing ?  t('SAVE_CHANGE') : t('ADD')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* <UserDetails open={openDetailsDialog} handleClose={handleCloseDetailsDialog} user={selectedUsra} colors={colors} /> */}
      <ToastContainer />
    </Box>
  );
};

export default Group;
