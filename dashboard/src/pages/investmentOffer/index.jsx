import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useDispatch,useSelector} from 'react-redux'
import {investementOffertList} from '../../redux/actions/investmentOfferActions'

const InvestmentOffer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // State for the selected row data
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleMenuOpen = (event, id, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = () => {
    console.log(`Edit clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log(`Delete clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDetails = () => {
    console.log(`Details clicked for row with id: ${selectedRowId}`);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };


  const dispatch=useDispatch()
  const {loading,error,investmentOffers}=useSelector((state)=>state.investmentOffer)

  useEffect(()=>{
    dispatch(investementOffertList())
  },[dispatch])
  useEffect(()=>{
    console.log(investmentOffers)
  })

  const columns = [
    { field: "id", headerName: "ID" },
   {
    field:'status',
    headerName:"Status",
    flex:1,
   },
    {
      field:'investmentRequest.business_name',
      headerName:"Business",
      flex:1,
      renderCell:(params)=>{
        return params.row.investmentRequest.business_name
      }
    },
    {
      field:'investor.name',
      headerName:"Investor",
      flex:1,
      renderCell:(params)=>{
        return params.row.investor.name
      }
    },
    {
      field: "offered_amount",
      headerName: "Offered Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.offered_amount}
        </Typography>
      ),
    },
    {
      field: "proposed_share",
      headerName: "Proposed Share",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.proposed_share}%
        </Typography>
      ),
    },
   
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.id, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleDetails}>Details</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];
  




  return (
    <Box m="20px">
      <Header title="Investment Offers" subtitle="List of Investment Offer" />
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
        }}
      >
        <DataGrid checkboxSelection rows={investmentOffers} columns={columns} />
      </Box>

      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsDialog}
        maxWidth="md" // Set max width to medium size
        fullWidth // Make the dialog use the full width defined by maxWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
        >
          Transaction Details
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>ID:</strong> {selectedRow.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedRow.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedRow.phone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedRow.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Invest:</strong> ${selectedRow.cost}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Date:</strong> {selectedRow.date}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDetailsDialog}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvestmentOffer;
