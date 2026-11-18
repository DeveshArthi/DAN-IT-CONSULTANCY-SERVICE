
import { useState } from 'react';

import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import '../styles/FAQ.scss';

const faqItems = [
  {
    question: 'What services does DAN IT CONSULTANCY SERVICE offer?',
    answer:
      'We offer website development, website redesign, UI/UX design, branding, creative design and selected non-IT business support services. The exact scope depends on your project requirements.',
  },
  {
    question: 'How much does a website development project cost?',
    answer:
      'Project pricing depends on factors such as the number of pages, design complexity, required features, integrations and ongoing support. After discussing your requirements, we can prepare a quotation based on the agreed scope.',
  },
  {
    question: 'How long does it take to complete a project?',
    answer:
      'Timelines vary depending on the type and complexity of the project, content availability and feedback cycles. We discuss an estimated timeline during planning and confirm the schedule before development begins.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. We can review your current website and discuss improvements to its appearance, responsiveness, user experience and performance. The redesign scope will depend on the existing technology and your goals.',
  },
  {
    question: 'Do you provide both IT and non-IT services?',
    answer:
      'Yes. In addition to technical services, we offer creative design, presentation design, documentation and selected business assistance services. Contact us to confirm whether your specific requirement is within our scope.',
  },
  {
    question: 'Will my website work on mobile devices?',
    answer:
      'Responsive design is a core part of our website development approach. We aim to create layouts that adapt to desktop, tablet and mobile screens, with testing appropriate to the agreed project scope.',
  },
  {
    question: 'Can I request changes during development?',
    answer:
      'Yes. We encourage feedback at agreed review stages. The number of revisions and the process for additional changes will be outlined in the project proposal.',
  },
  {
    question: 'Do you provide maintenance after project delivery?',
    answer:
      'Maintenance and ongoing support can be discussed as part of your project requirements. Depending on the agreement, this may include content updates, technical fixes and further improvements.',
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box component="section" id="faq" className="faq_section">
      <Box className="faq_glow" aria-hidden="true" />

      <Container
        maxWidth={false}
        disableGutters
        className="container"
      >
        <Box className="faq_layout">

          {/* LEFT CONTENT */}
          <Box className="faq_intro" data-reveal="left">
            <Chip
              icon={<HelpOutlineRoundedIcon />}
              label="FREQUENTLY ASKED QUESTIONS"
              className="faq_chip"
            />

            <Typography variant="h2" className="faq_heading">
              Questions?
              <br />
              <span>We've Got Answers.</span>
            </Typography>

            <Typography className="faq_description">
              Find answers to common questions about our
              services, pricing, development process and
              project delivery.
            </Typography>

            <Box className="faq_contact_card">
              <Box className="faq_contact_icon">
                <HelpOutlineRoundedIcon />
              </Box>

              <Typography className="faq_contact_title">
                Still Have Questions?
              </Typography>

              <Typography className="faq_contact_text">
                Tell us about your requirements and we'll
                help you explore the next steps.
              </Typography>

              <Button
                variant="contained"
                href="#contact"
                endIcon={<ArrowOutwardRoundedIcon />}
                className="faq_contact_btn"
              >
                Contact Us
              </Button>
            </Box>
          </Box>

          {/* RIGHT ACCORDION */}
          <Box className="faq_accordion_list" data-reveal="right">
            {faqItems.map((item, index) => {
              const isExpanded = expanded === index;

              return (
                <Accordion
                  key={item.question}
                  expanded={isExpanded}
                  onChange={handleChange(index)}
                  disableGutters
                  elevation={0}
                  className={`faq_accordion ${
                    isExpanded ? 'faq_active' : ''
                  }`}
                  slotProps={{
                    transition: {
                      timeout: 250,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      isExpanded
                        ? <RemoveRoundedIcon />
                        : <AddRoundedIcon />
                    }
                    aria-controls={`faq-panel-${index}-content`}
                    id={`faq-panel-${index}-header`}
                    className="faq_summary"
                  >
                    <Typography className="faq_question_number">
                      {String(index + 1).padStart(2, '0')}
                    </Typography>

                    <Typography className="faq_question">
                      {item.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails className="faq_details">
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
