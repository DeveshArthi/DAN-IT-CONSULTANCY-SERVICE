
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
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

import '../styles/About.scss';

const expertise = [
  {
    icon: <CodeRoundedIcon />,
    title: 'Technology',
    text: 'Modern digital solutions',
  },
  {
    icon: <DesignServicesRoundedIcon />,
    title: 'Creativity',
    text: 'Purposeful visual design',
  },
  {
    icon: <BusinessCenterRoundedIcon />,
    title: 'Consultancy',
    text: 'Practical business support',
  },
];

export default function About() {
  return (
    <Box component="section" id="about" className="about_section">
      <div className="about_glow" />

      <Container
  maxWidth={false}
  disableGutters
  className="container"
>
        <Box className="about_grid">

          {/* LEFT VISUAL */}
          <Box className="about_visual" data-reveal="left">
            <Box className="visual_frame">
              <Box className="visual_grid" />

              <Box className="visual_orb">
                <Box className="orb_inner">
                  <Typography className="orb_letter">
                    DAN
                  </Typography>
                </Box>
              </Box>

              <Box className="visual_caption">
                <Typography className="caption_eyebrow">
                  OUR APPROACH
                </Typography>

                <Typography className="caption_title">
                  Design. Develop. Deliver.
                </Typography>
              </Box>
            </Box>

            <Box className="floating_card">
              <AutoAwesomeRoundedIcon />

              <Box>
                <Typography className="floating_title">
                  Built Around Your Vision
                </Typography>

                <Typography className="floating_text">
                  Thoughtful solutions for real business needs
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* RIGHT CONTENT */}
          <Box className="about_content" data-reveal="right">
            <Chip
              label="GET TO KNOW US"
              className="about_chip"
            />

            <Typography variant="h2" className="about_title">
              Bringing Ideas to Life
              <br />
              Through <span>Design & Technology.</span>
            </Typography>

            <Typography className="about_description">
              DAN IT CONSULTANCY SERVICE is a growing
              freelance consultancy focused on helping
              businesses and individuals transform ideas
              into practical, engaging and effective solutions.
            </Typography>

            <Typography className="about_description">
              We bring together technology, creativity
              and business-focused thinking to deliver
              websites, digital experiences, branding
              and professional support tailored to
              your requirements.
            </Typography>

            <Stack spacing={2} className="about_highlights">
              {[
                'Solutions tailored to your business goals',
                'Clear communication throughout every project',
                'Modern, responsive and user-focused designs',
              ].map((item) => (
                <Box key={item} className="highlight_item">
                  <CheckCircleOutlineRoundedIcon />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Stack>

            <Box className="expertise_grid">
              {expertise.map((item) => (
                <Box key={item.title} className="expertise_item">
                  <Box className="expertise_icon">
                    {item.icon}
                  </Box>

                  <Typography className="expertise_title">
                    {item.title}
                  </Typography>

                  <Typography className="expertise_text">
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              href="#contact"
              endIcon={<ArrowOutwardRoundedIcon />}
              className="about_cta"
            >
              Let's Work Together
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
