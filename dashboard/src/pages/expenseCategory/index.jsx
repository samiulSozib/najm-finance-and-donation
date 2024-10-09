import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { expenseCategoryList, deleteExpenseCategory, insertExpenseCategory,editExpenseCategory } from '../../redux/actions/expenseCategoryActions';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

const ExpenseCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation()

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editCategoryId, setEditCategoryId] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, expenseCategories } = useSelector((state) => state.expenseCategory);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(expenseCategoryList());
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
    const categoryToEdit = expenseCategories.find((category) => category.id === id);
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name,
        description: categoryToEdit.description,
      });
      setEditCategoryId(id);
      setIsEditing(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteExpenseCategory(selectedRowId));
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setFormData({ name: "", description: "" });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ name: "", description: "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      dispatch(editExpenseCategory(editCategoryId, formData));
    } else {
      dispatch(insertExpenseCategory(formData));
    }
    handleDialogClose();
  };

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0.5 },
    { field: "name", headerName: t('EXPENSE_CATEGORY_NAME'), flex: 1 },
    { field: "description", headerName: t('EXPENSE_CATEGORY_DESCRIPTION'), flex: 1 },
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
            {permissions.includes('manage_expense_category')&&(
              <Box>
                <MenuItem onClick={() => handleEdit(params.row.id)}>{t('EDIT')}</MenuItem>
                <MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
              </Box>
            )}
            
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('EXPENSE_CATEGORY')} subtitle={t('CATEGORY_LIST')} />
        {permissions.includes('manage_expense_category')&&(
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
            {t('ADD_EXPENSE_CATEGORY')}
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
        <DataGrid
          rows={expenseCategories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>{isEditing ? t('EDIT_EXPENSE_CATEGORY') : t('ADD_EXPENSE_CATEGORY')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label={t('EXPENSE_CATEGORY_NAME')}
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label={t('EXPENSE_CATEGORY_DESCRIPTION')}
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}
              sx={{ backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.blueAccent[800] }, }}>{t('CANCEL')}</Button>
          <Button onClick={handleFormSubmit} 
              sx={{  backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": { backgroundColor: colors.greenAccent[800] }}}>{isEditing ? t('SAVE_CHANGE') : t('ADD')}</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default ExpenseCategory;
