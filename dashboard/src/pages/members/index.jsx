import React, { useEffect, useState } from "react";
import {
  Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, InputLabel, FormControl
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { memberList, deleteMember, addMember, editMember } from "../../redux/actions/memberAction";
import { groupList } from "../../redux/actions/groupActions";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";
import 'react-toastify/dist/ReactToastify.css';
import MemberDetails from "./memberDetails";

const Members = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, i18n } = useTranslation();
  
  // State variables
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: "", email: "", name: "", occupation: "", 
    monthly_contribution: "", address: "", joining_date: "", group_id: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMemberId, setEditMemberId] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [groupFilter, setGroupFilter] = useState('');

  const dispatch = useDispatch();
  const { members, totalItems } = useSelector((state) => state.member);
  const { groups } = useSelector((state) => state.group);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(memberList(page + 1, pageSize, groupFilter));
    dispatch(groupList());
  }, [dispatch, page, pageSize, groupFilter]);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    const memberToEdit = members.find(member => member.id === id);
    if (memberToEdit) {
      setFormData({
        name: memberToEdit.name,
        occupation: memberToEdit.occupation,
        monthly_contribution: memberToEdit.monthly_contribution,
        address: memberToEdit.address,
        joining_date: memberToEdit.joining_date,
        group_id: memberToEdit.group_id
      });
      setEditMemberId(id);
      setIsEditing(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteMember(selectedRowId));
    handleMenuClose();
  };

  const handleDetails = () => {
    const member = members.find(member => member.id === selectedRowId);
    setSelectedMember(member);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedMember(null);
  };

  const handleDialogOpen = () => {
    setFormData({
      username: "", email: "", name: "", occupation: "", 
      monthly_contribution: "", address: "", joining_date: "", group_id: ""
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      username: "", email: "", name: "", occupation: "", 
      monthly_contribution: "", address: "", joining_date: "", group_id: ""
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      dispatch(editMember(editMemberId, formData));
    } else {
      dispatch(addMember(formData));
    }
    handleDialogClose();
  };

  const handleGroupChange = (event) => {
    setGroupFilter(event.target.value);
  };

  const isRtl = i18n.language === 'ar'||i18n.language==='fa';
  const columns = [
    { field: "id", headerName: t('ID'), flex: 0.5 },
    { field: "name", headerName: t('MEMBER_NAME'), flex: 1 },
    { field: "occupation", headerName: t('MEMBER_OCCUPATION'), flex: 1 },
    { field: "monthly_contribution", headerName: t('MEMBER_MONTHLY_CONTRIBUTION'), flex: 1 },
    { field: "address", headerName: t('MEMBER_ADDRESS'), flex: 1 },
    { field: "joining_date", headerName: t('MEMBER_JOINING_DATE'), flex: 1 },
    {
      field: "Group.name", headerName: t('MEMBER_GROUP_NAME'), flex: 1,
      renderCell: (params) => params.row.Group?.name || "N/A"
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
            {permissions.includes('manage_members') && (
              <Box>
                <MenuItem onClick={() => handleEdit(params.row.id)}>{t('EDIT')}</MenuItem>
                <MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
              </Box>
            )}
            <MenuItem onClick={handleDetails}>{t('DETAILS')}</MenuItem>
          </Menu>
        </Box>
      ),
    }
  ];

  return (
    <Box m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('MEMBERS')} subtitle={t('MEMBER_LIST')} />
        {permissions.includes('manage_members') && (
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
            {t('ADD_MEMBER')}
          </Button>
        )}
      </Box>

      {/* Group Filter Dropdown */}
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <FormControl
          sx={{
            minWidth: 150,
            maxHeight: 50,
            border: '2px solid',
            borderColor: 'gray',
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              }
            }
          }}
        >
          <InputLabel>Select Group</InputLabel>
          <Select value={groupFilter} onChange={handleGroupChange}>
            <MenuItem value="">All Groups</MenuItem>
            {groups.map(group => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Data Grid */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}
      >
        <DataGrid
          rows={members}
          columns={columns}
          getRowId={(row) => row.id}
          pagination
          paginationMode="server"
          rowCount={totalItems}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[10, 20, 50]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Member Form Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>{isEditing ? t('EDIT_MEMBER') : t('ADD_MEMBER')}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label={t('MEMBER_NAME')}
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="occupation"
            label={t('MEMBER_OCCUPATION')}
            value={formData.occupation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="monthly_contribution"
            label={t('MEMBER_MONTHLY_CONTRIBUTION')}
            value={formData.monthly_contribution}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="address"
            label={t('MEMBER_ADDRESS')}
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="joining_date"
            label={t('MEMBER_JOINING_DATE')}
            type="date"
            value={formData.joining_date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('MEMBER_GROUP_NAME')}</InputLabel>
            <Select
              name="group_id"
              value={formData.group_id}
              onChange={handleChange}
            >
              {groups.map(group => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
            }}>{t('CANCEL')}</Button>
          <Button onClick={handleFormSubmit} sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              }
            }}>
            {isEditing ? t('UPDATE') : t('ADD')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Member Details Dialog */}
      <MemberDetails open={openDetailsDialog} member={selectedMember} onClose={handleCloseDetailsDialog} colors={colors} />
      
      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default Members;
