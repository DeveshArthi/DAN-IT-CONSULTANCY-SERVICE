
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { useAdminAuth } from './AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { admin, login } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box className="admin_login_page">
      <Box className="admin_login_card">
        <Box className="admin_login_logo">D</Box>

        <Typography className="admin_login_eyebrow">
          DAN IT CONSULTANCY SERVICE
        </Typography>

        <Typography variant="h4" className="admin_login_title">
          Admin Login
        </Typography>

        <Typography className="admin_login_description">
          Sign in to manage client enquiries.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            type="email"
            label="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            endIcon={
              submitting
                ? <CircularProgress size={18} color="inherit" />
                : <LoginRoundedIcon />
            }
            sx={{ mt: 3, py: 1.6 }}
          >
            {submitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
