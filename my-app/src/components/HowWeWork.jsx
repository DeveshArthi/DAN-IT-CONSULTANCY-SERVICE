
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material';

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import '../styles/HowWeWork.scss';

const processSteps = [
  {
    number: '01',
    icon: <ChatBubbleOutlineRoundedIcon />,
    title: 'Share Your Idea',
    description:
      'Tell us about your project, business goals and requirements. We begin by understanding what you want to achieve.',
    details: 'Discovery & Consultation',
  },
  {
    number: '02',
    icon: <AssignmentOutlinedIcon />,
    title: 'Planning & Proposal',
    description:
      'We discuss the project scope, expected deliverables, estimated timeline and quotation before work begins.',
    details: 'Strategy & Project Scope',
  },
  {
    number: '03',
    icon: <CodeRoundedIcon />,
    title: 'Design & Development',
    description:
      'We transform the agreed plan into a practical solution, sharing progress and gathering feedback along the way.',
    details: 'Creative & Technical Execution',
  },
  {
    number: '04',
    icon: <TaskAltRoundedIcon />,
    title: 'Review & Delivery',
    description:
      'We review the completed work against the agreed requirements, make applicable refinements and prepare the final delivery.',
    details: 'Quality Check & Handover',
  },
];

export default function HowWeWork() {
  return (
    <Box
      component="section"
      id="process"
      className="process_section"
    >
      <Box className="process_glow" aria-hidden="true" />

      <Container
        maxWidth={false}
        disableGutters
        className="container"
      >
        {/* SECTION HEADER */}
        <Box className="process_header" data-reveal>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="OUR WORKING PROCESS"
            className="process_chip"
          />

          <Typography variant="h2" className="process_heading">
            From Your First Idea
            <br />
            <span>To the Final Result.</span>
          </Typography>

          <Typography className="process_intro">
            Every successful project starts with a clear plan.
            Our structured approach keeps communication,
            creativity and your business goals at the center
            of the process.
          </Typography>
        </Box>

        {/* PROCESS STEPS */}
        <Box className="process_steps_wrapper">
          <Grid container spacing={3} className="process_grid">
            {processSteps.map((step, index) => (
              <Grid
                key={step.number}
                size={{ xs: 12, sm: 6, lg: 3 }}
                className="process_grid_item"
              >
                <Card
                  className="process_card"
                  data-reveal
                  style={{
                    '--reveal-delay': `${index * 100}ms`,
                  }}
                >
                  <CardContent className="process_card_content">
                    <Box className="process_card_top">
                      <Box className="process_icon">
                        {step.icon}
                      </Box>

                      <Typography className="process_number">
                        {step.number}
                      </Typography>
                    </Box>

                    <Typography className="process_step_label">
                      STEP {step.number}
                    </Typography>

                    <Typography
                      variant="h3"
                      className="process_card_title"
                    >
                      {step.title}
                    </Typography>

                    <Typography className="process_card_text">
                      {step.description}
                    </Typography>

                    <Box className="process_card_footer">
                      <span className="process_footer_dot" />

                      <Typography>
                        {step.details}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {index < processSteps.length - 1 && (
                  <Box
                    className="process_connector"
                    aria-hidden="true"
                  >
                    <ArrowForwardRoundedIcon />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Stack
          className="process_bottom"
          data-reveal
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Box>
            <Typography className="process_bottom_title">
              Ready to bring your idea to life?
            </Typography>

            <Typography className="process_bottom_text">
              Share your requirements and let's discuss
              the right solution for your project.
            </Typography>
          </Box>

          <Button
            variant="contained"
            href="#contact"
            endIcon={<ArrowOutwardRoundedIcon />}
            className="process_cta"
          >
            Start Your Project
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
