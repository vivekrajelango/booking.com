import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        height: { xs: '300px', sm: '400px' },
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        width: '100%'
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.2)' }} />
      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            mb={2}
            sx={{ 
              fontSize: { xs: '2rem', sm: '3rem' }
            }}
          >
            Up to 15% off
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#0071c2', 
              '&:hover': { bgcolor: '#005999' },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            BOOK A HOTEL NOW
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;