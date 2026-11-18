
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useAdminAuth } from './AuthContext';

export default function ProtectedAdminRoute() {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#08070D',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
