
import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

import '../styles/Navbar.scss';


const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <Container
  maxWidth={false}
  disableGutters
  className="container"
>
          <Toolbar disableGutters className="navbar_inner">

            <Box component="a" href="#home" className="brand">
              <Box className="brand_icon">D</Box>

              <Box>
                <Typography className="brand_name">
                  DAN
                </Typography>

                <Typography className="brand_subtitle">
                  IT CONSULTANCY SERVICE
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={4}
              className="desktop_links"
            >
              {navLinks.map((link) => (
                <Box
                  key={link.label}
                  component="a"
                  href={link.href}
                  className="nav_link"
                >
                  {link.label}
                </Box>
              ))}
            </Stack>

            <Button
              variant="contained"
              href="#contact"
              endIcon={<ArrowOutwardRoundedIcon />}
              className="nav_cta"
            >
              Get a Quote
            </Button>

            <IconButton
              className="mobile_menu_btn"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
            >
              <MenuRoundedIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{ className: 'mobile_drawer' }}
      >
        <Box className="drawer_header">
          <Typography fontWeight={800}>DAN</Typography>

          <IconButton
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Stack spacing={1} className="drawer_links">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="drawer_link"
            >
              {link.label}
            </Button>
          ))}

          <Button
            variant="contained"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            sx={{ mt: 2 }}
          >
            Start a Project
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
