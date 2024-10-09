import { Box, Button, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProgressCircle from "../../components/ProgressCircle";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import {groupList} from '../../redux/actions/groupActions'
import {memberList,unPaymentList} from '../../redux/actions/memberAction'
import {eventList} from '../../redux/actions/eventActions'
import {paymentList} from '../../redux/actions/paymentActions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Members from "../members";
import { DataGrid } from "@mui/x-data-grid";
import MemberDetails from "../members/memberDetails";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const {groups}=useSelector((state)=>state.group)
  const {members,unPaymentMembers}=useSelector((state)=>state.member)
  const {events}=useSelector((state)=>state.event)
  const {payments}=useSelector((state)=>state.payment)



  useEffect(() => {
    dispatch(groupList());
    dispatch(memberList());
    dispatch(eventList());
    dispatch(paymentList())
    dispatch(unPaymentList())
  }, [dispatch]);

  useEffect(()=>{
    console.log(unPaymentMembers)
  },[dispatch])

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
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
            <MenuItem onClick={handleDetails}>{t('DETAILS')}</MenuItem>
          </Menu>
        </Box>
      ),
    }
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('DAHSBOARD')} subtitle="Welcome to your dashboard" />

       
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
            subtitle="Total Groups"
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
            subtitle="Total Members"
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
            subtitle="Total Events"
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
            title={payments?.length || 0}
            subtitle="Total Payments"
            progress="0.25"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        

        {/* ROW 2 */}
        {/* ROW 2 */}
        <Box gridColumn="span 12">
          <Box m="40px 0 0 0">
            {/* Title for Unpayment Members */}
            <Typography variant="h5" color={colors.grey[100]} mb={2}>
              Unpayment Members: Current Month
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
              />
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
