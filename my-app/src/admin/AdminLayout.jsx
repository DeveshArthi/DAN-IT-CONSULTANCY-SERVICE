
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import {
  Box, Drawer, IconButton, Typography,
  Button, Stack, Alert,
} from '@mui/material';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useAdminAuth } from './AuthContext';

const menu = [
  { label: 'Overview', path: '/admin', icon: <DashboardRoundedIcon />, end: true },
  { label: 'Enquiries', path: '/admin/enquiries', icon: <InboxRoundedIcon /> },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  
async function handleLogout() {
  setLoggingOut(true);
  setError('');

  try {
    await logout();
    navigate('/admin/login', { replace: true });
  } catch {
    setError(
      'Could not confirm logout. Please retry.'
    );
  } finally {
    setLoggingOut(false);
  }
}


  const sidebar = (
    <Box className="admin_sidebar_inner">
      <Box className="admin_brand">
        <span className="admin_brand_icon">D</span>
        <Box>
          <Typography fontWeight={800}>DAN IT</Typography>
          <Typography fontSize={10} color="text.secondary">
            ADMIN PANEL
          </Typography>
        </Box>
      </Box>

      <Box component="nav" className="admin_navigation">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `admin_nav_link ${isActive ? 'active' : ''}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </Box>

      <Box className="admin_sidebar_bottom">
        <Typography fontSize={12} sx={{ overflowWrap: 'anywhere' }}>
          {admin?.email}
        </Typography>
        <Button
          fullWidth
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box className="admin_shell">
      <Box className="admin_desktop_sidebar">{sidebar}</Box>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: { sx: { width: 270, bgcolor: '#110E1B' } },
        }}
      >
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{ alignSelf: 'flex-end', m: 1 }}
          aria-label="Close menu"
        >
          <CloseRoundedIcon />
        </IconButton>
        {sidebar}
      </Drawer>

      <Box className="admin_main">
        <Box className="admin_topbar">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              className="admin_mobile_menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open admin menu"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography fontWeight={700}>Admin Workspace</Typography>
          </Stack>
          <Typography fontSize={12} color="text.secondary">
            {admin?.name}
          </Typography>
        </Box>

        <Box className="admin_content">
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
