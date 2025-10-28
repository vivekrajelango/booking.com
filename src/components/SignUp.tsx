import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Stack, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim()) return 'Email is required';
    if (!password) return 'Password is required';
    if (password !== confirmPassword) return 'Passwords do not match';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await signup({
        firstName,
        lastName,
        emailAddress: email,
        password
      });

      if (response.success) {
        setSuccess(true);
        
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#003580' }}>
            Create your account
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Registration successful! Redirecting to login...</Alert>}

          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField 
                label="First name" 
                variant="outlined" 
                fullWidth 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField 
                label="Last name" 
                variant="outlined" 
                fullWidth 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Stack>
            <TextField 
              label="Email" 
              type="email" 
              variant="outlined" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField 
              label="Confirm password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#003580',
                color: '#FFFFFF',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#00224f' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/signin')}
              disabled={loading}
              sx={{
                color: '#003580',
                borderColor: '#003580',
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