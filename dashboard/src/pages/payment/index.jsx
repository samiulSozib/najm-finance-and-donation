import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, InputLabel, FormControl, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { paymentList, deletePayment, addPayment, editPayment } from '../../redux/actions/paymentActions';
import {memberList} from '../../redux/actions/memberAction'
import {eventList} from '../../redux/actions/eventActions'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t,i18n}=useTranslation()
  const isMobileOrTablet = window.innerWidth <= 900;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Updated formData to include new fields
  const [formData, setFormData] = useState({ 
    member_id: "", 
    payment_date: "", 
    amount: "", 
    payment_type: "", 
    event_id: "" 
  });
  
  const [editPaymentId, setEditPaymentId] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, payments } = useSelector((state) => state.payment);
  const { permissions } = useSelector((state) => state.auth);
  const {events}=useSelector((state)=>state.event)
  const {members}=useSelector((state)=>state.member)

   // Payment type options
   const paymentTypes = ['monthly', 'event', 'voluntary'];

  useEffect(() => {
    dispatch(paymentList());
    dispatch(eventList())
    dispatch(memberList())
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
    const paymentToEdit = payments.find((payment) => payment.id === id);
    if (paymentToEdit) {
      setFormData({
        member_id: paymentToEdit.member_id,
        payment_date: paymentToEdit.payment_date,
        amount: paymentToEdit.amount,
        payment_type: paymentToEdit.payment_type,
        event_id: paymentToEdit.event_id,
      });
      setEditPaymentId(id);
      setIsEditing(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = (id) => {
    dispatch(deletePayment(id));
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setFormData({ member_id: "", payment_date: "", amount: "", payment_type: "", event_id: "" });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ member_id: "", payment_date: "", amount: "", payment_type: "", event_id: "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      dispatch(editPayment(editPaymentId, formData));
    } else {
      console.log(formData)
      dispatch(addPayment(formData));
    }
    handleDialogClose();
  };

  const isRtl = i18n.language === 'ar' || i18n.language==='fa';

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0,width:80 },
    { field: "Member.name", headerName: t('PAYMENT_MEMBER'), width: 150, flex:isMobileOrTablet?0:1,
      renderCell:(params)=>{
        return params.row.Member?.name||"N/A"
      }
    },
    { field: "payment_date", headerName: t('PAYMENT_DATE'), width: 150, flex:isMobileOrTablet?0:1,
      renderCell:(params)=>{
        const date=new Date(params.value)
        return date.toLocaleDateString()
      }
    },
    { field: "amount", headerName: t('PAYMENT_AMOUNT'), width: 150, flex:isMobileOrTablet?0:1},
    { field: "payment_type", headerName: t('PAYMENT_TYPE'), width: 150, flex:isMobileOrTablet?0:1},
    { field: "status", headerName: t('PAYMENT_STATUS'), width: 150, flex:isMobileOrTablet?0:1},
    { field: "Event.name", headerName: t('PAYMENT_EVENT'), width: 150, flex:isMobileOrTablet?0:1,
      renderCell:(params)=>{
        return params.row.Event?.name||"N/A"
      }
    },
    {
      field: "actions",
      headerName: t('ACTIONS'),
      width: 120, flex:isMobileOrTablet?0:1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
         {permissions.includes('manage_payments')&&(
        <IconButton color="success" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
        )}
        {permissions.includes('manage_payments')&&(
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
        <Header title={t('PAYMENTS')} subtitle={t('PAYMENT_LIST')} />
        {permissions.includes('manage_payments')&&(
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
          {t('ADD_PAYMENT')}
        </Button>
        )}
        
      </Box>

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
        {/* Loading state */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={60} />
            <Typography variant="h6" ml={2}>Loading ...</Typography>
          </Box>
        ) : (
          <DataGrid
            rows={payments}
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

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>{isEditing ? t('EDIT_PAYMENT') : t('ADD_PAYMENT')}</DialogTitle>
        <DialogContent>
        <FormControl fullWidth margin="dense" required>
            <InputLabel id="member-select-label">{t('PAYMENT_MEMBER')}</InputLabel>
            <Select
              labelId="member-select-label"
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
            >
              {members.map(member => (
                <MenuItem key={member.id} value={member.id}>
                  {member.name} {/* Assuming member has a 'name' property */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="payment_date"
            label={t('PAYMENT_DATE')}
            type="date"
            fullWidth
            value={formData.payment_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            margin="dense"
            name="amount"
            label={t('PAYMENT_AMOUNT')}
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="payment-type-select-label">{t('PAYMENT_TYPE')}</InputLabel>
            <Select
              labelId="payment-type-select-label"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
            >
              {paymentTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="event-select-label">{t('PAYMENT_EVENT')}</InputLabel>
            <Select
              labelId="event-select-label"
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
            >
              {events.map(event => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name} {/* Assuming event has a 'name' property */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] },
            }}>
            {t('CANCEL')}
          </Button>
          <Button onClick={handleFormSubmit} 
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] }
            }}>
           {isEditing ? t('SAVE_CHANGE') : t('ADD')}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default Payments;
