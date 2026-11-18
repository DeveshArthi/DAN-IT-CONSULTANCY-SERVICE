
import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import {
  portfolioCategories,
  portfolioProjects,
} from '../data/portfolioData';

import '../styles/Portfolio.scss';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const gridRef = useRef(null);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory
        );

  // Observe cards whenever the category changes.
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(
      '[data-portfolio-reveal]'
    );

    if (!cards?.length) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach((card) => {
        card.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [activeCategory]);

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <Box
      component="section"
      id="portfolio"
      className="portfolio_section"
    >
      <div className="portfolio_glow" />

      <Container
  maxWidth={false}
  disableGutters
  className="container"
>

        {/* SECTION HEADER */}
        <Box className="portfolio_header" data-reveal>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="SELECTED WORK"
            className="portfolio_chip"
          />

          <Typography
            variant="h2"
            className="portfolio_heading"
          >
            Ideas Turned Into
            <br />
            <span>Digital Experiences.</span>
          </Typography>

          <Typography className="portfolio_intro">
            Explore our development, design and business
            solution concepts. Each project represents
            an approach to solving practical challenges
            through technology and creativity.
          </Typography>
        </Box>

        {/* CATEGORY FILTERS */}
        <Stack
          direction="row"
          className="portfolio_filters"
          role="group"
          aria-label="Filter portfolio projects"
        >
          {portfolioCategories.map((category) => (
            <Button
              key={category.id}
              className={`portfolio_filter ${
                activeCategory === category.id ? 'active' : ''
              }`}
              variant={
                activeCategory === category.id
                  ? 'contained'
                  : 'outlined'
              }
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </Stack>

        {/* PROJECT GRID */}
        <Grid
          container
          spacing={3}
          ref={gridRef}
          className="portfolio_grid"
        >
          {filteredProjects.map((project, index) => (
            <Grid
              key={project.id}
              size={{ xs: 12, sm: 6, lg: 4 }}
              className="portfolio_grid_item"
            >
              <Card
                className="portfolio_card"
                data-portfolio-reveal
                style={{
                  '--card-delay': `${Math.min(index % 3, 2) * 90}ms`,
                }}
              >
                <Box className="portfolio_image_wrapper">

                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={`${project.title} project preview`}
                    className="portfolio_image"
                    loading="lazy"
                  />

                  <Chip
                    label={
                      project.type === 'client'
                        ? 'Client Project'
                        : 'Concept Project'
                    }
                    className={`portfolio_type ${
                      project.type === 'client'
                        ? 'client_type'
                        : 'concept_type'
                    }`}
                  />

                  <Box className="portfolio_overlay">
                    <Button
                      variant="contained"
                      className="portfolio_view_btn"
                      onClick={() => openProject(project)}
                      endIcon={<ArrowOutwardRoundedIcon />}
                      aria-label={`View details for ${project.title}`}
                    >
                      View Project
                    </Button>
                  </Box>
                </Box>

                <Box className="portfolio_card_body">
                  <Box className="portfolio_meta">
                    <Typography>
                      {project.categoryLabel}
                    </Typography>

                    <Typography>
                      {project.year}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h3"
                    className="portfolio_card_title"
                  >
                    {project.title}
                  </Typography>

                  <Typography className="portfolio_card_description">
                    {project.description}
                  </Typography>

                  <Box className="portfolio_tags">
                    {project.services.slice(0, 2).map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        size="small"
                        className="portfolio_tag"
                      />
                    ))}
                  </Box>

                  <Button
                    className="portfolio_details_link"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => openProject(project)}
                  >
                    Explore Project
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* BOTTOM CTA */}
        <Box className="portfolio_bottom" data-reveal>
          <Box>
            <Typography variant="h3">
              Have a Project in Mind?
            </Typography>

            <Typography>
              Let's create something meaningful for your business.
            </Typography>
          </Box>

          <Button
            variant="contained"
            href="#contact"
            endIcon={<ArrowOutwardRoundedIcon />}
          >
            Start Your Project
          </Button>
        </Box>
      </Container>

      {/* PROJECT DETAILS MODAL */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={closeProject}
        maxWidth="md"
        fullWidth
        scroll="paper"
        className="portfolio_dialog"
        aria-labelledby="portfolio-dialog-title"
      >
        {selectedProject && (
          <DialogContent className="portfolio_dialog_content">
            <IconButton
              onClick={closeProject}
              className="portfolio_close"
              aria-label="Close project details"
            >
              <CloseRoundedIcon />
            </IconButton>

            <Box className="dialog_image_wrapper">
              <Box
                component="img"
                src={selectedProject.image}
                alt={`${selectedProject.title} preview`}
                className="dialog_image"
              />
            </Box>

            <Box className="dialog_body">
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
                className="dialog_badges"
              >
                <Chip
                  label={
                    selectedProject.type === 'client'
                      ? 'Client Project'
                      : 'Concept Project'
                  }
                  className="dialog_type"
                />

                <Chip
                  label={selectedProject.categoryLabel}
                  variant="outlined"
                />
              </Stack>

              <Typography
                variant="h2"
                id="portfolio-dialog-title"
                className="dialog_title"
              >
                {selectedProject.title}
              </Typography>

              <Typography className="dialog_description">
                {selectedProject.description}
              </Typography>

              <Divider className="dialog_divider" />

              <Box className="dialog_details_grid">
                <Box>
                  <Typography className="dialog_label">
                    THE CHALLENGE
                  </Typography>

                  <Typography className="dialog_text">
                    {selectedProject.challenge}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="dialog_label">
                    OUR APPROACH
                  </Typography>

                  <Typography className="dialog_text">
                    {selectedProject.solution}
                  </Typography>
                </Box>
              </Box>

              <Divider className="dialog_divider" />

              <Typography className="dialog_label">
                SERVICES PROVIDED / EXPLORED
              </Typography>

              <Box className="dialog_services">
                {selectedProject.services.map((service) => (
                  <Box key={service} className="dialog_service">
                    <CheckCircleOutlineRoundedIcon />
                    <Typography>{service}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography className="dialog_label">
                TECHNOLOGIES & TOOLS
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
                className="dialog_technologies"
              >
                {selectedProject.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    className="dialog_tech"
                  />
                ))}
              </Stack>

              <Box className="dialog_actions">
                {selectedProject.liveUrl && (
                  <Button
                    component="a"
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    endIcon={<OpenInNewRoundedIcon />}
                  >
                    Live Preview
                  </Button>
                )}

                {selectedProject.githubUrl && (
                  <Button
                    component="a"
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                  >
                    Source Code
                  </Button>
                )}

                <Button
                  component="a"
                  href="#contact"
                  variant="outlined"
                  onClick={closeProject}
                  endIcon={<ArrowOutwardRoundedIcon />}
                >
                  Discuss a Similar Project
                </Button>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}
