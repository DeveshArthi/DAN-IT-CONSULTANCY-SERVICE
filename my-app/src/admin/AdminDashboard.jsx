
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box, Grid, Card, Typography, Button,
  Alert, CircularProgress,
} from '@mui/material';

import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { adminApi } from '../services/adminApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    adminApi.stats()
      .then((result) => {
        if (active) setStats(result.data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => { active = false; };
  }, []);

  const cards = stats ? [
    { label: 'Total Enquiries', value: stats.total, icon: <InboxRoundedIcon /> },
    { label: 'New Leads', value: stats.new, icon: <FiberNewRoundedIcon /> },
    { label: 'In Progress', value: stats.inProgress, icon: <PendingActionsRoundedIcon /> },
    { label: 'Closed', value: stats.closed, icon: <TaskAltRoundedIcon /> },
  ] : [];

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={1}>
        Dashboard Overview
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Monitor and manage your client enquiries.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!stats && !error && <CircularProgress />}

      <Grid container spacing={3}>
        {cards.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Card className="admin_stat_card">
              <Box className="admin_stat_icon">{item.icon}</Box>
              <Typography variant="h3" fontWeight={800}>
                {item.value}
              </Typography>
              <Typography color="text.secondary" fontSize={13}>
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box className="admin_dashboard_cta">
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Client Enquiries
          </Typography>
          <Typography color="text.secondary" fontSize={13}>
            View messages, update progress and follow up with leads.
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/admin/enquiries"
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
        >
          Manage Enquiries
        </Button>
      </Box>
    </Box>
  );
}
