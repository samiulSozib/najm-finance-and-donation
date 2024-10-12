import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { eventList,insertEvent,deleteEvent,editEvent } from '../../redux/actions/eventActions';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const Event = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { loading,events } = useSelector(state => state.event);
  const { permissions } = useSelector((state) => state.auth);
  const {t,i18n }=useTranslation()
  const isMobileOrTablet = window.innerWidth <= 900;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '',start_date:"", end_date:"" });

  useEffect(() => {
    dispatch(eventList());
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
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      const formatDate = (date) => date.split('T')[0]; // Extracting YYYY-MM-DD from the ISO date string
  
      setFormData({
        name: eventToEdit.name,
        description: eventToEdit.description,
        start_date: formatDate(eventToEdit.start_date), // Format the date correctly
        end_date: formatDate(eventToEdit.end_date), // Format the date correctly
      });
      setEditEventId(id);
      setIsEditing(true);
      setOpen(true);
    }
    handleMenuClose();
  };
  

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    handleMenuClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', description: '' });
    setIsEditing(false);
    setEditEventId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.description || !formData.start_date || !formData.end_date) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isEditing) {
      dispatch(editEvent(editEventId, formData));
    } else {
      dispatch(insertEvent(formData));
    }

    handleClose();
  };

  const isRtl = i18n.language === 'ar' || i18n.language==='fa';

  const columns = [
    { field: "id", headerName: t('ID'), width:80, flex: 0 },
    { field: "name", headerName: t('EVENT_NAME'),width: 150, flex:isMobileOrTablet?0:1  },
    { field: "description", headerName: t('EVENT_DESCRIPTION'),width: 150, flex:isMobileOrTablet?0:1  },
    { field: "start_date", headerName: t('EVENT_START_DATE'),
      width: 150, flex:isMobileOrTablet?0:1 ,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
     },
    { field: "end_date", headerName: t('EVENT_END_DATE'), width: 150, flex:isMobileOrTablet?0:1 ,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
     },
    {
      field: "actions",
      headerName: t('ACTIONS'),
      width: 150, flex:isMobileOrTablet?0:1 ,
      renderCell: (params) => (
       
        <Box display="flex" justifyContent="start" gap={1}>
         {permissions.includes('manage_events')&&(
        <IconButton color="success" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
          )}
        {permissions.includes('manage_events')&&(
        <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
          )}
      </Box>
       
      ),
    },
  ];

 

  return (
  
     <Box paddingBottom="20px" m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('EVENTS')} subtitle={t('EVENT_LIST')} />
        {permissions.includes('manage_events')&&(
          <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
         {t('ADD_EVENT')}
        </Button>
        )}
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
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
        <DataGrid rows={events} columns={columns} components={{ Toolbar: GridToolbar }} sx={{
            "& .MuiDataGrid-columnHeaders": {
              textAlign: isRtl ? 'right' : 'left', // Ensure header text alignment is right or left
            },
            "& .MuiDataGrid-cell": {
              textAlign: isRtl ? 'right' : 'left', // Ensure cell content is also right or left aligned
            },
          }}/>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} dir={isRtl ? 'rtl' : 'ltr'}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>
          {isEditing ? t('EDIT_EVENT') : t('ADD_EVENT')}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label={t('EVENT_NAME')}
            type="text"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
            
          />
          <TextField
            margin="dense"
            name="description"
            label={t('EVENT_DESCRIPTION')}
            type="text"
            fullWidth
            required
            value={formData.description}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
          <TextField
            margin="dense"
            name="start_date"
            label={t('EVENT_START_DATE')}
            type="date"
            fullWidth
            value={formData.start_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            name="end_date"
            label={t('EVENT_END_DATE')}
            type="date"
            fullWidth
            value={formData.end_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colors.primary[400], justifyContent: isRtl ? 'flex-start' : 'flex-end'}} >
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] },
              marginLeft: isRtl ? '16px' : '0',
                marginRight: isRtl ? '0' : '16px',
            }}
          >
            {t('CANCEL')}
          </Button>
          <Button
            onClick={handleFormSubmit}
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] },
              marginLeft: isRtl ? '0' : '16px',
            }}
          >
            {isEditing ? t('SAVE_CHANGE') : t('ADD')}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>

  );
};

export default Event;
