import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useTranslation } from 'react-i18next';

const MemberDetails = ({ open, onClose, member, colors }) => {
  const { t, i18n } = useTranslation();
  
  // Determine direction based on the current language (rtl for Arabic)
  const isRtl = i18n.language === 'ar' || i18n.language==='fa';
  const direction = isRtl ? 'rtl' : 'ltr'; 

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Customize format if needed
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        },
        direction: direction,
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        {t('MEMBERS')}
      </DialogTitle>
      <DialogContent>
        {member ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              padding: 2,
              direction: direction,
            }}
          >
            {/* Member ID */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                backgroundColor: colors.primary[500],
                padding: 2,
                borderRadius: 1,
                border: `1px solid ${colors.blueAccent[700]}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {t('MEMBER_ID')}: {member.id}
              </Typography>
            </Box>

            {/* Member Information */}
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <AccountCircleIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>{t('MEMBER_NAME')}:</strong> {member.name}
                  </Typography>
                </Box>
              </Grid>

              {/* Occupation */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <BusinessIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>{t('MEMBER_OCCUPATION')}:</strong> {member.occupation}
                  </Typography>
                </Box>
              </Grid>

              {/* Monthly Contribution */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <MonetizationOnIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>{t('MEMBER_MONTHLY_CONTRIBUTION')}:</strong> ${member.monthly_contribution}
                  </Typography>
                </Box>
              </Grid>

              {/* Address */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="body1">
                    <strong>{t('MEMBER_ADDRESS')}:</strong> {member.address}
                  </Typography>
                </Box>
              </Grid>

              {/* Joining Date */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <TimerIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>{t('MEMBER_JOINING_DATE')}:</strong> {formatDate(member.joining_date)}
                  </Typography>
                </Box>
              </Grid>

              {/* Status */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <EventAvailableIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>{t('MEMBER_STATUS')}: </strong>
                    {member.status} 
                  </Typography>
                </Box>
              </Grid>

              {/* Member Type */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="body1">
                    <strong>{t('MEMBER_TYPE')}:</strong> {member.member_type}
                  </Typography>
                </Box>
              </Grid>

              {/* Group Information */}
              {member.Group && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                    }}
                  >
                    <GroupIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                    <Typography variant="body1">
                      <strong>{t('MEMBER_GROUP_NAME')}:</strong> {member.Group.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{t('MEMBER_GROUP_DESCRIPTION')}:</strong> {member.Group.description}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {/* User Information */}
              {member.User && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                    }}
                  >
                    <VerifiedIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                    <Typography variant="body1">
                      <strong>{t('MEMBER_USERNAME')}:</strong> {member.User.username}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{t('MEMBER_EMAIL')}:</strong> {member.User.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{t('MEMBER_VERIFIED')}:</strong> {member.User.is_verified ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: colors.grey[200] }}>
            {t('MEMBER_NOT_FOUND')}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          {t('CLOSE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDetails;
