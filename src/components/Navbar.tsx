import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import BookingsIcon from '@mui/icons-material/BookOnline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#003580', padding: { xs: '4px 0', sm: '8px 0' } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, color: 'white', cursor: 'pointer' }}>
              Booking.com
            </Typography>
          </Link>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} alignItems="center">
            <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <LightModeIcon />
            </IconButton>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>List your property</Typography>
            
            {isAuthenticated ? (
              <>
                <IconButton 
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{ 
                    ml: 1,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f1f1f1' }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: '#003580',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleClose(); navigate('/bookings'); }}>
                    <BookingsIcon fontSize="small" sx={{ mr: 1 }} /> My Bookings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#003580',
                      fontSize: { xs: '0.7rem', sm: '0.875rem' },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.5, sm: 0.75 }
                    }}
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#003580',
                      fontSize: { xs: '0.7rem', sm: '0.875rem' },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.5, sm: 0.75 }
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
        <Box
          sx={{
            mt: { xs: 1, sm: 2 },
            mb: { xs: 0.5, sm: 1 },
            display: 'flex',
            gap: { xs: 0.5, sm: 2 },
            flexWrap: 'nowrap',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            pb: 1
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
            sx={{
              bgcolor: 'white',
              color: '#003580',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Stays
          </Button>
          <Button
            variant="text"
            startIcon={<BookmarkIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Flights
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Flight + Hotel
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Car rentals
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Attractions
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minWidth: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Airport taxis
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;