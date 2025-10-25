import React from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#003580' }}>
            Create your account
          </Typography>

          <Stack spacing={2}>
            <TextField label="Full name" variant="outlined" fullWidth />
            <TextField label="Email" type="email" variant="outlined" fullWidth />
            <TextField label="Password" type="password" variant="outlined" fullWidth />
            <TextField label="Confirm password" type="password" variant="outlined" fullWidth />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#003580',
                border: '1px solid #003580',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#f5f7fa' },
              }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(-1)}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#003580',
                border: '1px solid #003580',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#f5f7fa' },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;