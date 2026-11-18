
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
// import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import '../styles/Footer.scss';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Portfolio', href: '#portfolio' },
  { label: 'How We Work', href: '#process' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact Us', href: '#contact' },
];

const itServices = [
  { label: 'Website Development', service: 'website-development' },
  { label: 'Website Redesign', service: 'website-redesign' },
  { label: 'UI/UX Design', service: 'ui-ux-design' },
  { label: 'Software Solutions', service: 'software-solutions' },
];

const creativeServices = [
  { label: 'Logo & Brand Identity', service: 'logo-branding' },
  { label: 'Social Media Design', service: 'social-media-design' },
  { label: 'Business Support', service: 'business-support' },
  { label: 'Digital Assistance', service: 'digital-assistance' },
];

// Add verified business social media URLs here.
// Leave them empty until the accounts are ready.
const socialLinks = [
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: '',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    url: '',
  },
  {
    name: 'GitHub',
    icon: <GitHubIcon />,
    url: '',
  },
];

const contactInfo = [
  {
    icon: <EmailOutlinedIcon />,
    label: 'Email',
    value: 'danitconsultancyservice@gmail.com',
    href: 'mailto:danitconsultancyservice@gmail.com',
  },
  {
    icon: <PhoneOutlinedIcon />,
    label: 'Phone',
    value: '+91 9943552181',
    href: 'tel:+917904598497',
  },
  {
    icon: <LocationOnOutlinedIcon />,
    label: 'Location',
    value: 'Tamil Nadu, India',
    href: null,
  },
];

const serviceHref = (service) =>
  `/?service=${encodeURIComponent(service)}#contact`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'instant'
        : 'smooth',
    });
  };

  return (
    <Box component="footer" className="footer_section">
      <Box className="footer_glow" aria-hidden="true" />

      <Container
        maxWidth={false}
        disableGutters
        className="container"
      >
        {/* TOP CTA */}
        <Box className="footer_cta">
          <Box>
            <Typography className="footer_cta_label">
              HAVE A PROJECT IN MIND?
            </Typography>

            <Typography variant="h2" className="footer_cta_title">
              Let's Build Something
              <span> Great Together.</span>
            </Typography>

            <Typography className="footer_cta_text">
              From websites and branding to creative and
              business solutions, let's discuss your next idea.
            </Typography>
          </Box>

          <Button
            variant="contained"
            href="#contact"
            endIcon={<ArrowOutwardRoundedIcon />}
            className="footer_cta_button"
          >
            Start a Project
          </Button>
        </Box>

        {/* MAIN FOOTER */}
        <Grid container spacing={4} className="footer_grid">

          {/* BRAND */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Box className="footer_brand">
              <Box className="footer_logo">
                <Box className="footer_logo_icon">
                  D
                </Box>

                <Box>
                  <Typography className="footer_logo_title">
                    DAN IT
                  </Typography>

                  <Typography className="footer_logo_subtitle">
                    CONSULTANCY SERVICE
                  </Typography>
                </Box>
              </Box>

              <Typography className="footer_brand_description">
                We bring ideas to life through technology,
                creative design and practical consultancy
                solutions. Our goal is to help businesses
                build a stronger digital presence.
              </Typography>

              <Stack
                direction="row"
                spacing={1.2}
                className="footer_socials"
              >
                {socialLinks
                  .filter((social) => Boolean(social.url))
                  .map((social) => (
                    <Tooltip
                      key={social.name}
                      title={social.name}
                      arrow
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="footer_social_btn"
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
              </Stack>
            </Box>
          </Grid>

          {/* QUICK LINKS */}
          <Grid size={{ xs: 6, sm: 6, lg: 2 }}>
            <Box className="footer_column">
              <Typography className="footer_column_title">
                Quick Links
              </Typography>

              <Box
                component="nav"
                aria-label="Footer navigation"
                className="footer_links"
              >
                {quickLinks.map((link) => (
                  <Box
                    component="a"
                    key={link.label}
                    href={link.href}
                    className="footer_link"
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* SERVICES */}
          <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
            <Box className="footer_column">
              <Typography className="footer_column_title">
                Our Services
              </Typography>

              <Typography className="footer_service_label">
                IT SOLUTIONS
              </Typography>

              <Box className="footer_links">
                {itServices.map((item) => (
                  <Box
                    component="a"
                    key={item.service}
                    href={serviceHref(item.service)}
                    className="footer_link"
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>

              <Typography className="footer_service_label footer_non_it">
                CREATIVE & BUSINESS
              </Typography>

              <Box className="footer_links">
                {creativeServices.map((item) => (
                  <Box
                    component="a"
                    key={item.service}
                    href={serviceHref(item.service)}
                    className="footer_link"
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* CONTACT */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box className="footer_column">
              <Typography className="footer_column_title">
                Get in Touch
              </Typography>

              <Box className="footer_contact_list">
                {contactInfo.map((item) => (
                  <Box
                    key={item.label}
                    className="footer_contact_item"
                  >
                    <Box className="footer_contact_icon">
                      {item.icon}
                    </Box>

                    <Box className="footer_contact_content">
                      <Typography className="footer_contact_label">
                        {item.label}
                      </Typography>

                      {item.href ? (
                        <Box
                          component="a"
                          href={item.href}
                          className="footer_contact_value"
                        >
                          {item.value}
                        </Box>
                      ) : (
                        <Typography className="footer_contact_value">
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className="footer_availability">
                <span className="footer_status_dot" />
                <Typography>
                  Open for Project Enquiries
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer_divider" />

        {/* BOTTOM BAR */}
        <Box className="footer_bottom">
          <Typography className="footer_copyright">
            © {currentYear} DAN IT CONSULTANCY SERVICE.
            All rights reserved.
          </Typography>

          <Box className="footer_bottom_right">
            <Typography>
              Designed with purpose.
            </Typography>

            <Tooltip title="Back to Top" arrow>
              <IconButton
                onClick={scrollToTop}
                aria-label="Back to top"
                className="footer_back_top"
              >
                <ArrowUpwardRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
