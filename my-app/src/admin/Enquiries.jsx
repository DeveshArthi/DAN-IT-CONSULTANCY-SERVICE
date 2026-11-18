
import { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Pagination,
  InputAdornment,
  Stack,
} from '@mui/material';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

import { adminApi } from '../services/adminApi';
import EnquiryDialog from './EnquiryDialog';

const statusColors = {
  new: 'info',
  contacted: 'warning',
  'in-progress': 'secondary',
  closed: 'success',
};

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  'in-progress': 'In Progress',
  closed: 'Closed',
};

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

const PAGE_LIMIT = 10;

export default function Enquiries() {
  const [items, setItems] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 0,
    total: 0,
  });

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Debounce search to avoid API requests on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch enquiries whenever filters, page or refresh changes
  useEffect(() => {
    let active = true;

    async function fetchEnquiries() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
          status,
          search,
        });

        const result = await adminApi.enquiries(params);

        if (!active) return;

        setItems(result.data || []);

        setPagination(
          result.pagination || {
            page: 1,
            pages: 0,
            total: 0,
          }
        );
      } catch (err) {
        if (!active) return;

        setError(
          err.message || 'Failed to load enquiries.'
        );

        setItems([]);

        setPagination({
          page: 1,
          pages: 0,
          total: 0,
        });
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchEnquiries();

    return () => {
      active = false;
    };
  }, [page, status, search, refresh]);

  // Search input
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setPage(1);
  };

  // Status filter
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  // Pagination
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  // Manual refresh
  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  // After updating enquiry status
  const handleEnquiryUpdated = () => {
    handleRefresh();
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return '—';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return '—';
    }

    return parsed.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Box className="admin_enquiries_page">

      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            mb={1}
          >
            Client Enquiries
          </Typography>

          <Typography
            color="text.secondary"
            fontSize={14}
          >
            Search, review and manage incoming
            project requests.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={handleRefresh}
          disabled={loading}
          sx={{
            borderColor: 'rgba(139,92,246,0.4)',
            color: '#C4B5FD',
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* Enquiries Container */}
      <Box className="admin_table_card">

        {/* Filters */}
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          mb={3}
        >
          <TextField
            fullWidth
            size="small"
            label="Search name, email or service"
            placeholder="Search enquiries..."
            value={searchInput}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon
                      fontSize="small"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            size="small"
            label="Filter by Status"
            value={status}
            onChange={handleStatusChange}
            sx={{
              minWidth: {
                xs: '100%',
                md: 190,
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleRefresh}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress
              size={35}
              sx={{
                color: '#8B5CF6',
              }}
            />

            <Typography
              color="text.secondary"
              fontSize={13}
            >
              Loading enquiries...
            </Typography>
          </Box>
        ) : error ? null : (
          <TableContainer
            component={Paper}
            className="admin_table_wrapper"
            sx={{
              overflowX: 'auto',
            }}
          >
            <Table
              sx={{
                minWidth: 650,
              }}
            >
              {/* Table Header */}
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item._id}
                    hover
                  >
                    {/* Client */}
                    <TableCell>
                      <Typography
                        fontWeight={700}
                        fontSize={13}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={11}
                        sx={{
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {item.email}
                      </Typography>
                    </TableCell>

                    {/* Service */}
                    <TableCell>
                      <Typography
                        fontSize={12}
                        sx={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.service?.replace(
                          /-/g,
                          ' '
                        ) || '—'}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          statusLabels[item.status] ||
                          item.status ||
                          'Unknown'
                        }
                        color={
                          statusColors[item.status] ||
                          'default'
                        }
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <Typography
                        fontSize={12}
                        color="text.secondary"
                      >
                        {formatDate(item.createdAt)}
                      </Typography>
                    </TableCell>

                    {/* Action */}
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={
                          <VisibilityOutlinedIcon />
                        }
                        onClick={() =>
                          setSelectedId(item._id)
                        }
                        sx={{
                          borderColor:
                            'rgba(139,92,246,0.3)',
                          color: '#C4B5FD',
                          textTransform: 'none',
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Empty State */}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{
                        py: 7,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <InboxOutlinedIcon
                          sx={{
                            fontSize: 45,
                            color: '#8B5CF6',
                            opacity: 0.65,
                          }}
                        />

                        <Typography
                          fontWeight={700}
                          fontSize={15}
                        >
                          No enquiries found
                        </Typography>

                        <Typography
                          color="text.secondary"
                          fontSize={12}
                        >
                          Try changing your search
                          or status filter.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        {!error && (
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            mt={3}
          >
            <Typography
              color="text.secondary"
              fontSize={12}
            >
              Total Enquiries: {pagination.total}
            </Typography>

            <Pagination
              page={page}
              count={Math.max(1, pagination.pages)}
              onChange={handlePageChange}
              color="primary"
              disabled={loading || pagination.pages <= 1}
              showFirstButton
              showLastButton
              size="small"
            />
          </Stack>
        )}
      </Box>

      {/* Enquiry Details Modal */}
      {selectedId && (
        <EnquiryDialog
          key={selectedId}
          enquiryId={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdated={handleEnquiryUpdated}
        />
      )}
    </Box>
  );
}
