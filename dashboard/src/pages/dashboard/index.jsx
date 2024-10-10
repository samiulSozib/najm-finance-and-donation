import { Box, Button, CircularProgress, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import {groupList} from '../../redux/actions/groupActions'
import {memberList,unPaymentList} from '../../redux/actions/memberAction'
import {eventList} from '../../redux/actions/eventActions'
import {paymentList} from '../../redux/actions/paymentActions'
import {expenseList} from '../../redux/actions/expenseActions'
import {expenseCategoryList} from '../../redux/actions/expenseCategoryActions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MemberDetails from "../members/memberDetails";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const getCurrentMonthName = () => {
  const date = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()]; 
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentMonth = getCurrentMonthName();
  const { t,i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const {groups}=useSelector((state)=>state.group)
  const {loading,members,unPaymentMembers}=useSelector((state)=>state.member)
  const {events}=useSelector((state)=>state.event)
  const {payments}=useSelector((state)=>state.payment)
  const {expenses}=useSelector((state)=>state.expense)
  const {expenseCategories}=useSelector((state)=>state.expenseCategory)



  useEffect(() => {
    dispatch(groupList());
    dispatch(memberList());
    dispatch(eventList());
    dispatch(paymentList())
    dispatch(unPaymentList())
    dispatch(expenseList())
    dispatch(expenseCategoryList())
  }, [dispatch]);


  const totalPayments = payments?.reduce((acc, payment) => acc + parseFloat(payment.amount), 0) || 0;
  const totalExpenses = expenses?.reduce((acc, exp) => acc + parseFloat(exp.amount), 0) || 0;

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDetails = (id) => {
    const member = members.find(member => member.id === id);
    setSelectedMember(member);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedMember(null);
  };


  const isRtl = i18n.language === 'ar' || i18n.language==='fa';

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0.5 },
    { field: "name", headerName: t('MEMBER_NAME'), flex: 1 },
    { field: "occupation", headerName: t('MEMBER_OCCUPATION'), flex: 1 },
    { field: "monthly_contribution", headerName: t('MEMBER_MONTHLY_CONTRIBUTION'), flex: 1 },
    { field: "address", headerName: t('MEMBER_ADDRESS'), flex: 1 },
    { field: "joining_date", headerName: t('MEMBER_JOINING_DATE'), flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
     },
    {
      field: "Group.name", headerName: t('MEMBER_GROUP_NAME'), flex: 1,
      renderCell: (params) => params.row.Group?.name || "N/A"
    },
    {
      field: "actions",
      headerName: t('ACTIONS'),
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
        <IconButton color="default" onClick={() => handleDetails(params.row.id)}>
          <VisibilityIcon />
        </IconButton>
      </Box>
      ),
    }
  ];

  return (
    <Box m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('DASHBOARD')} subtitle={t('WELCOME_DASHBOARD')} />
      </Box>

   

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={groups?.length || 0}
            subtitle={t('TOTAL_GROUPS')}
            progress="0.25"
            icon={
              <GroupIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* Member Count */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={members?.length || 0}
            subtitle={t('TOTAL_MEMBERS')}
            progress="0.25"
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* Event Count */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={events?.length || 0}
            subtitle={t('TOTAL_EVENTS')}
            progress="0.25"
            icon={
              <EventAvailableIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* Payment Count */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPayments}
            subtitle={t('TOTAL_PAYMENTS')}
            progress="0.25"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        

        {/* ROW 2 */}

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalExpenses}
            subtitle={t('TOTAL_EXPENSE')}
            progress="0.25"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={expenseCategories?.length || 0}
            subtitle={t('TOTAL_EXPENSE_CATEGORY')}
            progress="0.25"
            icon={
              <EventAvailableIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        

        {/* ROW 3 */}
        <Box gridColumn="span 12">
          <Box m="40px 0 0 0">
            {/* Title for Unpayment Members */}
            <Typography variant="h5" color={colors.grey[100]} mb={2}>
            <Header title={t('UNPAID_MEMBERS')} subtitle={currentMonth} />
            </Typography>
            
            <Box
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
              }}
            >
              {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress size={60} />
                    <Typography variant="h6" ml={2}>
                      Loading roles...
                    </Typography>
                  </Box>
                ) : (
              <DataGrid
                rows={unPaymentMembers}
                columns={columns}
                getRowId={(row) => row.id}
                // pagination
                // paginationMode="server"
                // rowCount={totalItems}
                // paginationModel={{ page, pageSize }}
                // onPaginationModelChange={(model) => {
                //   setPage(model.page);
                //   setPageSize(model.pageSize);
                // }}
                // pageSizeOptions={[10, 20, 50]}
                // components={{ Toolbar: GridToolbar }}
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
          </Box>
        </Box>

       
      </Box>

      <MemberDetails open={openDetailsDialog} member={selectedMember} onClose={handleCloseDetailsDialog} colors={colors} />
      <ToastContainer/>
    </Box>
  );
};

export default Dashboard;
