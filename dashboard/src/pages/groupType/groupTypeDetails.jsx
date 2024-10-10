import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, InputLabel, FormControl, useMediaQuery, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from 'react-redux';
import { groupList, addGroup, deleteGroup, editGroup } from '../../redux/actions/groupActions';
import { groupTypeList } from '../../redux/actions/groupTypeAction';
import { memberList } from '../../redux/actions/memberAction';
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const GroupTypeDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editGroupId, setEditGroupId] = useState(null);

  // State for add/edit dialog
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", leader_id: "", group_type: "" });
  const [selectedGroupType, setSelectedGroupType] = useState(formData.group_type);

  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const { groupTypes } = useSelector((state) => state.groupType);
  const { members } = useSelector((state) => state.member);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(groupList(null, null, id));
    dispatch(memberList());
    dispatch(groupTypeList());
  }, [dispatch, id]);

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
    setEditGroupId(id);
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteGroup(selectedRowId));
    handleMenuClose();
  };

  const handleAddEditSubmit = () => {
    if (isEditing) {
      dispatch(editGroup(editGroupId, formData)); // Edit Group
    } else {
      dispatch(addGroup(formData)); // Add new Group
    }
    setOpenAddEditDialog(false);
    setFormData({ name: "", description: "", leader_id: "", group_type: "" }); // Reset the form
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

  const handleGroupTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setSelectedGroupType(newValue);
      // Update your formData here if necessary
      // For example:
      setFormData({ ...formData, group_type: newValue });
    }
  };

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0.5 },
    { field: "name", headerName: t('GROUP_NAME'), flex: 1 },
    { field: "description", headerName: t('GROUP_DESCRIPTION'), flex: 1 },
    {
      field: "GroupType.name",
      headerName: t('GROUP_TYPE_NAME'),
      flex: 1,
      renderCell: (params) => params.row.GroupType?.name || "N/A",
    },
    {
      field: "leader_id",
      headerName: t('LEADER'),
      flex: 1,
      renderCell: (params) => {
        const leader = params.row.Members.find((member) => member.member_type === 'leader');
        return leader ? leader.name : "N/A";
      },
    },
    {
      field: "actions",
      headerName: t('ACTIONS'),
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
            <MenuItem onClick={() => handleEdit(params.row.id)}>{t('EDIT')}</MenuItem>
            <MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('GROUP')} subtitle={t('GROUP_LIST')} />
        <Button
          onClick={handleAdd}
          size="small"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            padding: isMobile ? "6px 12px" : "10px 20px",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          {t('ADD_GROUP')}
        </Button>
      </Box>

      {/* Scrollable Table Section */}
      <Box
        m="40px 0 0 0"
        height={isMobile ? "60vh" : "75vh"}
        sx={{
          overflowX: "auto",  // Allow horizontal scrolling on mobile
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
          minWidth: "700px",  // Ensures table doesn't shrink too much on mobile
        }}
      >
        <DataGrid
          rows={groups}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight={isMobile}
        />
      </Box>

      <Dialog open={openAddEditDialog} onClose={handleAddEditClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>
          {isEditing ? t('EDIT_GROUP') : t('ADD_GROUP')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label={t('GROUP_NAME')}
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            margin="dense"
            name="description"
            label={t('GROUP_DESCRIPTION')}
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            size={isMobile ? "small" : "medium"}
          />
          {isEditing && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="leader-label">{t("SELECT_LEADER")}</InputLabel>
              <Select
                labelId="leader-label"
                name="leader_id"
                value={formData.leader_id}
                onChange={handleInputChange}
                label={t("SELECT_LEADER")}
                required
              >
                {members && members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

<FormControl fullWidth margin="dense">
  <InputLabel id="group-label" shrink>{t('SELECT_GROUP_TYPE')}</InputLabel>
  <ToggleButtonGroup
    value={selectedGroupType}
    exclusive
    onChange={handleGroupTypeChange}
    aria-label="group types"
    sx={{mt:3}}
  >
    {groupTypes && groupTypes.map((groupType) => (
      <ToggleButton
        key={groupType.id}
        value={groupType.id}
        aria-label={groupType.name}
        sx={{
          borderRadius: '4px', // Make the button rectangular with slightly rounded corners
          border: `2px solid ${selectedGroupType === groupType.id ? '#007bff' : '#ccc'}`, // Change border color based on selection
          backgroundColor: selectedGroupType === groupType.id ? '#007bff' : '#fff', // Change background color when selected
          color: selectedGroupType === groupType.id ? '#fff' : '#000', // Change text color based on selection
          transition: 'background-color 0.3s, color 0.3s', // Smooth transition effect
          '&:hover': {
            backgroundColor: selectedGroupType === groupType.id ? '#0056b3' : '#f0f0f0', // Hover effect for selected and unselected states
          },
          margin: '0 5px', // Horizontal margin for space between buttons
          padding: '10px 20px', // Padding for better button size
        }}
      >
        {groupType.name}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
</FormControl>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddEditClose} sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
            }}>
            {t('CANCEL')}
          </Button>
          <Button onClick={handleAddEditSubmit} sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              }
            }}>
            {isEditing ? t('SAVE_CHANGES') : t('ADD_GROUP')}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default GroupTypeDetails;
