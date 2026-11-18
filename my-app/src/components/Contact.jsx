
import { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
} from '@mui/material';

import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

import {
  serviceOptions,
  budgetOptions,
  initialContactForm,
  getServiceFromUrl,
} from '../data/contactOptions';

import { submitContactForm } from '../services/contactApi';

import '../styles/Contact.scss';

const contactDetails = [
  {
    icon: <MailOutlineRoundedIcon />,
    label: 'EMAIL US',
    value: 'danitconsultancyservice@gmail.com',
    href: 'mailto:danitconsultancyservice@gmail.com',
  },
  {
    icon: <PhoneOutlinedIcon />,
    label: 'CALL US',
    value: '+91 9943552181',
    href: 'tel:+917904598497',
  },
  {
    icon: <LocationOnOutlinedIcon />,
    label: 'LOCATION',
    value: 'Tamil Nadu, India',
    href: null,
  },
];

function validateForm(values) {
  const errors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2 || name.length > 100) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = 'Enter a valid email address.';
  }

  if (phone && !/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.service) {
    errors.service = 'Please select a service.';
  }

  if (!message) {
    errors.message = 'Please describe your project.';
  } else if (message.length < 20) {
    errors.message = 'Please enter at least 20 characters.';
  } else if (message.length > 3000) {
    errors.message = 'Maximum 3000 characters allowed.';
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(() => ({
    ...initialContactForm,
    service: getServiceFromUrl(),
  }));

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    const syncServiceFromUrl = () => {
      const selectedService = getServiceFromUrl();

      if (selectedService) {
        setForm((current) => ({
          ...current,
          service: selectedService,
        }));
      }
    };

    window.addEventListener('popstate', syncServiceFromUrl);

    return () => {
      window.removeEventListener('popstate', syncServiceFromUrl);
    };
  }, []);

  
useEffect(() => {
  const syncService = () => {
    const service = getServiceFromUrl();

    if (service) {
      setForm((current) => ({
        ...current,
        service,
      }));
    }
  };

  window.addEventListener('hashchange', syncService);

  return () => {
    window.removeEventListener('hashchange', syncService);
  };
}, []);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  };

  const showNotification = (severity, message) => {
    setNotification({
      open: true,
      severity,
      message,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showNotification(
        'error',
        'Please correct the highlighted fields.'
      );

      return;
    }

    setLoading(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      service: form.service,
      budget: form.budget,
      message: form.message.trim(),
    };

    try {
      await submitContactForm(payload);

      showNotification(
        'success',
        'Your enquiry has been submitted successfully!'
      );

      setForm({
        ...initialContactForm,
        service: getServiceFromUrl(),
      });

      setErrors({});
    } catch (error) {
      showNotification(
        'error',
        error.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      className="contact_section"
    >
      <Box className="contact_glow" aria-hidden="true" />

      <Container
        maxWidth={false}
        disableGutters
        className="container"
      >
        <Box className="contact_header" data-reveal>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="LET'S CONNECT"
            className="contact_chip"
          />

          <Typography variant="h2" className="contact_heading">
            Have an Idea?
            <br />
            <span>Let's Make It Happen.</span>
          </Typography>

          <Typography className="contact_intro">
            Whether you're planning a new website, building
            a brand or looking for professional business
            support, we'd love to hear about your project.
          </Typography>
        </Box>

        <Grid container spacing={4} className="contact_grid">

          {/* LEFT: CONTACT INFORMATION */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box className="contact_info" data-reveal="left">
              <Typography className="contact_info_eyebrow">
                START A CONVERSATION
              </Typography>

              <Typography
                variant="h3"
                className="contact_info_title"
              >
                Let's Build Something
                <span> Meaningful Together.</span>
              </Typography>

              <Typography className="contact_info_text">
                Share your requirements, ask a question
                or request a project quotation. We can
                discuss the right approach based on
                your goals and budget.
              </Typography>

              <Stack spacing={3} className="contact_details">
                {contactDetails.map((item) => (
                  <Box key={item.label} className="contact_detail">
                    <Box className="contact_detail_icon">
                      {item.icon}
                    </Box>

                    <Box className="contact_detail_content">
                      <Typography className="contact_detail_label">
                        {item.label}
                      </Typography>

                      {item.href ? (
                        <Box
                          component="a"
                          href={item.href}
                          className="contact_detail_value"
                        >
                          {item.value}
                        </Box>
                      ) : (
                        <Typography className="contact_detail_value">
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box className="contact_info_bottom">
                <BusinessCenterOutlinedIcon />

                <Box>
                  <Typography className="contact_bottom_title">
                    IT & Non-IT Solutions
                  </Typography>

                  <Typography className="contact_bottom_text">
                    Technology, design and business-focused
                    services under one consultancy.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: ENQUIRY FORM */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box className="contact_form_card" data-reveal="right">
              <Box className="contact_form_header">
                <Typography
                  variant="h3"
                  className="contact_form_title"
                >
                  Tell Us About Your Project
                </Typography>

                <Typography className="contact_form_subtitle">
                  Fill in the details below to request
                  a project discussion.
                </Typography>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                className="contact_form"
              >
                <Grid container spacing={2.5}>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      autoComplete="name"
                      slotProps={{
                        htmlInput: { maxLength: 100 },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineRoundedIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      autoComplete="email"
                      slotProps={{
                        htmlInput: { maxLength: 254 },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AlternateEmailRoundedIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number (Optional)"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      error={Boolean(errors.phone)}
                      helperText={errors.phone}
                      autoComplete="tel"
                      slotProps={{
                        htmlInput: { maxLength: 20 },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      required
                      label="Service Required"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      error={Boolean(errors.service)}
                      helperText={errors.service}
                    >
                      {serviceOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      select
                      fullWidth
                      label="Estimated Project Budget (Optional)"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                    >
                      {budgetOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={5}
                      label="Tell Us About Your Project"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={
                        errors.message ||
                        `${form.message.length}/3000 characters`
                      }
                      placeholder="Describe your project, goals, required features or any questions you have..."
                      slotProps={{
                        htmlInput: { maxLength: 3000 },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography className="contact_privacy">
                      Your details will be used to respond to
                      your enquiry and discuss your project.
                    </Typography>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      className="contact_submit"
                      endIcon={
                        loading
                          ? <CircularProgress size={18} color="inherit" />
                          : <SendRoundedIcon />
                      }
                    >
                      {loading ? 'Sending Enquiry...' : 'Send Project Enquiry'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') {
            setNotification((current) => ({
              ...current,
              open: false,
            }));
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity={notification.severity}
          variant="filled"
          onClose={() =>
            setNotification((current) => ({
              ...current,
              open: false,
            }))
          }
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
