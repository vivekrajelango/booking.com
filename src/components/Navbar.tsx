import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Stack
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#003580', padding: '8px 0' }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            Booking.com
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>GBP</Typography>
            <IconButton color="inherit">
              <LightModeIcon />
            </IconButton>
            <Typography>List your property</Typography>
            <Button variant="contained" sx={{ bgcolor: 'white', color: '#003580' }}>Register</Button>
            <Button variant="contained" sx={{ bgcolor: 'white', color: '#003580' }}>Sign in</Button>
          </Stack>
        </Toolbar>
        <Box sx={{ mt: 2, mb:1, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            startIcon={<HomeIcon />}
            sx={{ 
              bgcolor: 'white', 
              color: '#003580',
              textTransform: 'none'
            }}
          >
            Stays
          </Button>
          <Button 
            variant="text" 
            startIcon={<BookmarkIcon />}
            sx={{ 
              color: 'white',
              textTransform: 'none'
            }}
          >
            Flights
          </Button>
          <Button 
            variant="text" 
            sx={{ color: 'white', textTransform: 'none' }}
          >
            Flight + Hotel
          </Button>
          <Button 
            variant="text" 
            sx={{ color: 'white', textTransform: 'none' }}
          >
            Car rentals
          </Button>
          <Button 
            variant="text" 
            sx={{ color: 'white', textTransform: 'none' }}
          >
            Attractions
          </Button>
          <Button 
            variant="text" 
            sx={{ color: 'white', textTransform: 'none' }}
          >
            Airport taxis
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;