import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        height: '400px',
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%'
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.2)' }} />
      <Container sx={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <Box sx={{ maxWidth: '600px', color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Up to 15% off
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#0071c2', 
              '&:hover': { bgcolor: '#005999' },
              py: 1.5,
              px: 3
            }}
          >
            Book a hotel now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;