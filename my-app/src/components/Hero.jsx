
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

import '../styles/Hero.scss';

const specialties = [
  { icon: <CodeRoundedIcon />, label: 'Web Development' },
  { icon: <DesignServicesRoundedIcon />, label: 'Creative Design' },
  { icon: <BusinessCenterRoundedIcon />, label: 'Business Solutions' },
];

export default function Hero() {
  return (
    <Box component="section" id="home" className="hero">
      <div className="hero_glow hero_glow_one" />
      <div className="hero_glow hero_glow_two" />
      <div className="hero_grid" />

      <Container maxWidth={false} className="container hero_container">
        <Box className="hero_content">

          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="CREATIVE IDEAS. DIGITAL SOLUTIONS."
            className="hero_chip"
          />

          <Typography variant="h1" className="hero_title">
            We Build Digital
            <br />
            Experiences That
            <br />
            <span>Drive Growth.</span>
          </Typography>

          <Typography className="hero_description">
            From modern websites and creative branding to
            practical IT and business solutions, DAN IT
            CONSULTANCY SERVICE helps turn your ideas
            into impactful results.
          </Typography>

          <Stack direction="row" className="hero_actions">
            <Button
              variant="contained"
              size="large"
              href="#contact"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              Start Your Project
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="#services"
            >
              Explore Services
            </Button>
          </Stack>

          <Box className="hero_specialties">
            {specialties.map((item) => (
              <Box key={item.label} className="specialty">
                {item.icon}
                <Typography>{item.label}</Typography>
              </Box>
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
