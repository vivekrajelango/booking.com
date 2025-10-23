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
    <AppBar position="static" sx={{ bgcolor: '#003580', padding: { xs: '4px 0', sm: '8px 0' } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Booking.com<Typography sx={{ display: { xs: 'inline', sm: 'inline' }, fontSize: '0.8em' }}>GBP</Typography>
          </Typography>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} alignItems="center">
            <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <LightModeIcon />
            </IconButton>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>List your property</Typography>
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