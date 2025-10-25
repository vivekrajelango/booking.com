import React from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Container maxWidth="sm" sx={{ mt: 6, px: { xs: 2, sm: 3 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#003580' }}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Use your email and password to access your account
          </Typography>
        </Box>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="medium"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            size="medium"
          />
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: '#003580', 
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: 'white',
              color: '#003580',
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignIn;