
import { useEffect, useState } from 'react';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Box, TextField, MenuItem, Button,
  IconButton, Alert, CircularProgress, Divider,
} from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { adminApi } from '../services/adminApi';

const statuses = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

export default function EnquiryDialog({
  enquiryId,
  onClose,
  onUpdated,
}) {
  const [enquiry, setEnquiry] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!enquiryId) return;

    let active = true;

    adminApi.enquiry(enquiryId)
      .then((result) => {
        if (!active) return;
        setEnquiry(result.data);
        setStatus(result.data.status);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => { active = false; };
  }, [enquiryId]);

  async function saveStatus() {
    setSaving(true);
    setError('');

    try {
      await adminApi.updateStatus(enquiryId, status);
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={Boolean(enquiryId)}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: { className: 'admin_dialog' },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Enquiry Details
        <IconButton onClick={onClose} aria-label="Close enquiry">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {!enquiry && !error && <CircularProgress />}

        {enquiry && (
          <Box className="admin_enquiry_details">
            <Typography><strong>Name:</strong> {enquiry.name}</Typography>
            <Typography>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
            </Typography>
            <Typography>
              <strong>Phone:</strong> {enquiry.phone || 'Not provided'}
            </Typography>
            <Typography><strong>Service:</strong> {enquiry.service}</Typography>
            <Typography><strong>Budget:</strong> {enquiry.budget || 'Not specified'}</Typography>
            <Typography>
              <strong>Received:</strong>{' '}
              {new Date(enquiry.createdAt).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={700} mb={1}>Project Description</Typography>
            <Typography className="admin_message">
              {enquiry.message}
            </Typography>

            <TextField
              select
              fullWidth
              label="Enquiry Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mt: 3 }}
            >
              {statuses.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={saveStatus}
          disabled={!enquiry || saving || status === enquiry.status}
        >
          {saving ? 'Saving...' : 'Save Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
