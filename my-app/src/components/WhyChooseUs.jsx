
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';

import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

import '../styles/WhyChooseUs.scss';

const benefits = [
  {
    number: '01',
    icon: <ForumOutlinedIcon />,
    title: 'Direct Communication',
    description:
      'Work with a team that values clear conversations, understands your requirements and keeps you informed throughout the project.',
  },
  {
    number: '02',
    icon: <TrackChangesOutlinedIcon />,
    title: 'Designed for Your Goals',
    description:
      'Every solution begins with understanding your business, audience and objectives rather than following a one-size-fits-all approach.',
  },
  {
    number: '03',
    icon: <AssignmentTurnedInOutlinedIcon />,
    title: 'Clear Project Scope',
    description:
      'We focus on defining deliverables, timelines and expectations before work begins, helping projects stay organized and transparent.',
  },
  {
    number: '04',
    icon: <WorkspacePremiumOutlinedIcon />,
    title: 'Attention to Detail',
    description:
      'From visual consistency to functionality and usability, we pay attention to the details that shape a professional final result.',
  },
];

export default function WhyChooseUs() {
  return (
    <Box
      component="section"
      id="why-choose-us"
      className="why_section"
    >
      <Container
  maxWidth={false}
  disableGutters
  className="container"
>

        <Box className="why_header" data-reveal>
          <Box>
            <Chip
              label="WHY WORK WITH US"
              className="why_chip"
            />

            <Typography variant="h2" className="why_title">
              More Than a Service.
              <br />
              <span>A Partner in Your Growth.</span>
            </Typography>
          </Box>

          <Typography className="why_intro">
            We combine practical thinking, creativity and
            technical expertise to deliver solutions that
            support your goals and help your ideas move forward.
          </Typography>
        </Box>

        <Grid container spacing={3} className="why_grid">
          {benefits.map((benefit, index) => (
            <Grid
              key={benefit.number}
              size={{ xs: 12, sm: 6, lg: 3 }}
            >
              <Card
                className="why_card"
                data-reveal
                style={{
                  '--reveal-delay': `${index * 90}ms`,
                }}
              >
                <CardContent className="why_card_content">

                  <Box className="why_card_top">
                    <Box className="why_icon">
                      {benefit.icon}
                    </Box>

                    <Typography className="why_number">
                      {benefit.number}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h3"
                    className="why_card_title"
                  >
                    {benefit.title}
                  </Typography>

                  <Typography className="why_card_text">
                    {benefit.description}
                  </Typography>

                  <Box className="why_card_line" />

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="why_bottom" data-reveal>
          <Typography>
            Have an idea? Let's explore how we can bring it to life.
          </Typography>

          <Button
            variant="contained"
            href="#contact"
            endIcon={<ArrowOutwardRoundedIcon />}
          >
            Discuss Your Project
          </Button>
        </Box>

      </Container>
    </Box>
  );
}
