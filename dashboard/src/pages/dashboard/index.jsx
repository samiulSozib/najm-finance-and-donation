import { Box, Button, CircularProgress, IconButton, Menu, MenuItem, Typography, useTheme, Grid, Card, CardContent } from "@mui/material";
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
import { groupList } from '../../redux/actions/groupActions';
import { memberList, unPaymentList } from '../../redux/actions/memberAction';
import { eventList } from '../../redux/actions/eventActions';
import { paymentList } from '../../redux/actions/paymentActions';
import { expenseList } from '../../redux/actions/expenseActions';
import { expenseCategoryList } from '../../redux/actions/expenseCategoryActions';
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
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const isMobileOrTablet = window.innerWidth <= 900;

  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const { loading, members, unPaymentMembers } = useSelector((state) => state.member);
  const { events } = useSelector((state) => state.event);
  const { payments } = useSelector((state) => state.payment);
  const { expenses } = useSelector((state) => state.expense);
  const { expenseCategories } = useSelector((state) => state.expenseCategory);

  useEffect(() => {
    dispatch(groupList());
    dispatch(memberList());
    dispatch(eventList());
    dispatch(paymentList());
    dispatch(unPaymentList());
    dispatch(expenseList());
    dispatch(expenseCategoryList());
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
    const member = members.find((member) => member.id === id);
    setSelectedMember(member);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedMember(null);
  };

  const isRtl = i18n.language === 'ar' || i18n.language === 'fa';

  const columns = [
    { field: "id", headerName: t('ID'), flex: 0, width: 80 },
    { field: "name", headerName: t('MEMBER_NAME'), width: 120, flex: isMobileOrTablet ? 0 : 1 },
    { field: "occupation", headerName: t('MEMBER_OCCUPATION'), width: 120, flex: isMobileOrTablet ? 0 : 1 },
    { field: "monthly_contribution", headerName: t('MEMBER_MONTHLY_CONTRIBUTION'), width: 120, flex: isMobileOrTablet ? 0 : 1 },
    { field: "address", headerName: t('MEMBER_ADDRESS'), width: 120, flex: isMobileOrTablet ? 0 : 1 },
    { field: "joining_date", headerName: t('MEMBER_JOINING_DATE'), width: 120, flex: isMobileOrTablet ? 0 : 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "Group.name", headerName: t('MEMBER_GROUP_NAME'), width: 120, flex: isMobileOrTablet ? 0 : 1,
      renderCell: (params) => params.row.Group?.name || "N/A",
    },
    {
      field: "actions",
      headerName: t('ACTIONS'),
      width: 120, flex: isMobileOrTablet ? 0 : 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start" gap={1}>
          <IconButton color="default" onClick={() => handleDetails(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box paddingBottom="20px" m="20px" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('DASHBOARD')} subtitle={t('WELCOME_DASHBOARD')} />
      </Box>

      {/* GRID & CHARTS */}
      <Grid container spacing={2}>
        {/* ROW 1 */}
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px'}}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px' }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px' }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px' }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        {/* ROW 2 */}
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px' }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={3}>
          <Card sx={{ boxShadow: 3,backgroundColor: colors.primary[400],minHeight: '150px' }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        {/* ROW 3 - Table */}
        <Grid item xs={12}>
          <Box m="40px 0 0 0" height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
              "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
              "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
            }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid rows={unPaymentMembers || []} columns={columns} />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Toast notifications */}
      <ToastContainer />
      
      {/* Member Details Dialog */}
      <MemberDetails
        open={openDetailsDialog}
        member={selectedMember}
        handleClose={handleCloseDetailsDialog}
        colors={colors}
      />
    </Box>
  );
};

export default Dashboard;
