import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, InputLabel, FormControl } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { expenseList, insertExpense, editExpense, deleteExpense } from '../../redux/actions/expenseActions';
import { expenseCategoryList } from '../../redux/actions/expenseCategoryActions';
import { eventList } from '../../redux/actions/eventActions';
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t,i18n}=useTranslation()

  const user = JSON.parse(localStorage.getItem('user'));
  const adminId = user ? user.id : null;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [open, setOpen] = useState(false);  // State for Dialog open/close
  const [isEditMode, setIsEditMode] = useState(false);  // Track if it's editing mode
  const [editExpenseId,setEditExpenseId]=useState(null)
  const [formData, setFormData] = useState({ 
    event_id: '', 
    category: '',
    reason: '',
    amount: '',
    payment_date: '' 
  });

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setFormData({
        event_id: expenseToEdit.event_id,
        category: expenseToEdit.category,
        reason: expenseToEdit.reason,
        amount: expenseToEdit.amount,
        payment_date: expenseToEdit.payment_date.split('T')[0],  // Format date
      });
      setEditExpenseId(id)
      setIsEditMode(true);  // Switch to edit mode
      setOpen(true);  // Open the dialog
    }
    handleMenuClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
    handleMenuClose();
  };

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const { loading, error, expenses } = useSelector((state) => state.expense);
  const { expenseCategories } = useSelector((state) => state.expenseCategory);
  const { events } = useSelector((state) => state.event);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(expenseList()); 
    dispatch(expenseCategoryList());
    dispatch(eventList());
  }, [dispatch]);

  const isRtl = i18n.language === 'ar' || i18n.language==='fa';

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0.5 },
    {
      field: "Event.name",
      headerName: t('EXPENSE_EVENT_NAME'),
      flex: 1,
      renderCell: (params) => {
        return params.row.Event?.name || "N/A";
      }
    },
    {
      field: "reason",
      headerName: t('EXPENSE_REASON'),
      flex: 1,
    },
    {
      field: "amount",
      headerName: t('EXPENSE_AMOUNT'),
      flex: 1,
    },
    {
      field: "payment_date",
      headerName: t('EXPENSE_PAYMENT_DATE'),
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "ExpenseCategory.name",
      headerName: t('EXPENSE_CATEGORY_NAME'),
      flex: 1,
      renderCell:(params)=>{
        return params.row.ExpenseCategory?.name||"N/A"
      }
    },
    {
      field: "actions",
      headerName: t('ACTIONS'),
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
        {permissions.includes('manage_expenses')&&(
        <IconButton color="success" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
        )}
        {permissions.includes('manage_expenses')&&(
        <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      )}
      </Box>
      ),
    },
  ];

  const handleOpen = () => {
    setIsEditMode(false);  // Switch to add mode
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      event_id: '',
      category: '',
      reason: '',
      amount: '',
      payment_date: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!formData.event_id || !formData.category || !formData.reason || !formData.amount || !formData.payment_date) {
      toast.error("Please fill in all fields");
      return;
    }

    const newExpense = {
      admin_id: adminId,
      event_id: formData.event_id,
      category: formData.category,
      reason: formData.reason,
      amount: formData.amount,
      payment_date: formData.payment_date  // Include payment_date in submission
    };

    if (isEditMode) {
      // Update existing expense
      dispatch(editExpense(editExpenseId, newExpense));
      //console.log(newExpense)
    } else {
      // Add new expense
      dispatch(insertExpense(newExpense));
      console.log(newExpense)
   
    }

    handleClose();
  };

  return (
    <Box m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('EXPENSES')} subtitle={t('EXPENSE_LIST')} />
        <Box>
        {permissions.includes('manage_expenses')&&(
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
            }}
          >
            {t('ADD_EXPENSE')}
          </Button>
        )}
        </Box>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={expenses}
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
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>
          {isEditMode ? t('EDIT_EXPENSE') : t('ADD_EXPENSE')}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
          
          <FormControl fullWidth margin="dense">
            <InputLabel id="event-select-label" sx={{ color: colors.grey[100] }}>{t('EXPENSE_EVENT_NAME')}</InputLabel>
            <Select
              labelId="event_id-select-label"
              id="event-select"
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              sx={{
                color: colors.grey[100],
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '.MuiSvgIcon-root ': {
                  fill: colors.grey[100],
                },
              }}
            >
              {events && events.map((event) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel id="category-select-label" sx={{ color: colors.grey[100] }}>{t('EXPENSE_CATEGORY')}</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              sx={{
                color: colors.grey[100],
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '.MuiSvgIcon-root ': {
                  fill: colors.grey[100],
                },
              }}
            >
              {expenseCategories && expenseCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="reason"
            label={t('EXPENSE_REASON')}
            type="text"
            fullWidth
            required
            value={formData.reason}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
          <TextField
            margin="dense"
            name="amount"
            label={t('EXPENSE_AMOUNT')}
            type="number"
            fullWidth
            required
            value={formData.amount}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
          <TextField
            margin="dense"
            name="payment_date"
            label={t('EXPENSE_PAYMENT_DATE')}
            type="date"
            fullWidth
            required
            value={formData.payment_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
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
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              }
            }}
          >
            {isEditMode ? t('SAVE_CHANGE') : t('ADD')}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default Expense;
