import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import OfferIcon from '@mui/icons-material/LocalOffer';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const UserDetails = ({ open, handleClose, user, colors }) => {
  const investments = user?.investments || [];
  const investmentRequests = user?.investmentRequests || [];
  const investmentOffers = user?.investmentOffers || [];
  const newsBlogs = user?.newsBlogs || [];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
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
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        User Details
      </DialogTitle>
      <DialogContent>
        {user ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              padding: 2,
            }}
          >
            {/* User Information */}
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
            {user.profile_image ? (
              <img
                src={user.profile_image.image_url}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <AccountCircleIcon sx={{ color: colors.blueAccent[300], fontSize: 28 }} />
            )}
            
            {/* Name, Email, and Phone */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {user.email}
              </Typography>
              <Typography variant="body1">
                {user.phone_number}
              </Typography>
            </Box>
          </Box>


            {/* User Details */}
            <Grid container spacing={2}>
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
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Phone Number:</strong> {user.phone_number || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Role:</strong> {user.user_role.map(role => role.role).join(', ') || "N/A"}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}
                  </Typography>
                </Box>
              </Grid>

              {/* Investments Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                    <MonetizationOnIcon sx={{ marginRight: 1 }} /> Investments
                  </Typography>
                  {investments.length > 0 ? (
                    investments.map((investment) => (
                      <Box key={investment.id} sx={{ marginBottom: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: colors.primary[400],
                            padding: 2,
                            borderRadius: 1,
                            border: `1px solid ${colors.blueAccent[700]}`,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Business Name:</strong> {investment.business_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Amount:</strong> ${investment.amount}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Expected Return:</strong> ${investment.expected_return}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Status:</strong> {investment.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No investments available.</Typography>
                  )}
                </Box>
              </Grid>

              {/* Investment Requests Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                    <RequestQuoteIcon sx={{ marginRight: 1 }} /> Investment Requests
                  </Typography>
                  {investmentRequests.length > 0 ? (
                    investmentRequests.map((request) => (
                      <Box key={request.id} sx={{ marginBottom: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: colors.primary[400],
                            padding: 2,
                            borderRadius: 1,
                            border: `1px solid ${colors.blueAccent[700]}`,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Request ID:</strong> {request.id}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Business Name:</strong> {request.business_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Requested Amount:</strong> ${request.requested_amount}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Status:</strong> {request.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No investment requests available.</Typography>
                  )}
                </Box>
              </Grid>

              {/* Investment Offers Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                    <OfferIcon sx={{ marginRight: 1 }} /> Investment Offers
                  </Typography>
                  {investmentOffers.length > 0 ? (
                    investmentOffers.map((offer) => (
                      <Box key={offer.id} sx={{ marginBottom: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: colors.primary[400],
                            padding: 2,
                            borderRadius: 1,
                            border: `1px solid ${colors.blueAccent[700]}`,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Offer ID:</strong> {offer.id}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Business Name:</strong> {offer.business_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Offered Amount:</strong> ${offer.offered_amount}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Status:</strong> {offer.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No investment offers available.</Typography>
                  )}
                </Box>
              </Grid>

              {/* Blogs News Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                    <AnnouncementIcon sx={{ marginRight: 1 }} /> Blogs News
                  </Typography>
                  {newsBlogs.length > 0 ? (
                    newsBlogs.map((news, index) => (
                      <Box key={index} sx={{ marginBottom: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: colors.primary[400],
                            padding: 2,
                            borderRadius: 1,
                            border: `1px solid ${colors.blueAccent[700]}`,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="body1">
                                <strong>Title:</strong> {news.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2">
                                <strong>Content:</strong> {news.content}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No news available.</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography>No details available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
  );
};

export default UserDetails;
