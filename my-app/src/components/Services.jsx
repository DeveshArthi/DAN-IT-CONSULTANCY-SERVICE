
import { useState } from 'react';

import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Chip,
} from '@mui/material';
import { serviceOptions } from '../data/contactOptions';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import '../styles/Services.scss';

const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'it', label: 'IT Services' },
    { id: 'non-it', label: 'Non-IT Services' },
    { id: 'creative', label: 'Creative Services' },
];

const services = [
    {
        id: 1,
        icon: <CodeRoundedIcon />,
        category: 'it',
        label: 'IT SERVICES',
        title: 'Website Development',
        description:
            'Fast, responsive and modern websites designed to strengthen your online presence and grow your business.',
        features: [
            'Business Websites',
            'Landing Pages',
            'E-Commerce Solutions',
        ],
        featured: true,
    },
    {
        id: 2,
        icon: <WebRoundedIcon />,
        category: 'it',
        label: 'IT SERVICES',
        title: 'Website Redesign',
        description:
            'Transform outdated websites into modern, user-friendly digital experiences with improved performance.',
        features: [
            'Modern UI',
            'Responsive Layouts',
            'Performance Optimization',
        ],
    },
    {
        id: 3,
        icon: <DesignServicesRoundedIcon />,
        category: 'it',
        label: 'IT SERVICES',
        title: 'UI/UX Design',
        description:
            'Intuitive and visually engaging user interfaces that create smooth experiences across digital platforms.',
        features: [
            'Wireframing',
            'Interface Design',
            'Prototyping',
        ],
    },
    {
        id: 4,
        icon: <DataObjectRoundedIcon />,
        category: 'it',
        label: 'IT SERVICES',
        title: 'Software Solutions',
        description:
            'Custom digital tools and practical software solutions tailored to your business requirements.',
        features: [
            'Custom Applications',
            'API Integration',
            'Business Automation',
        ],
    },
    {
        id: 5,
        icon: <BrushRoundedIcon />,
        category: 'creative',
        label: 'CREATIVE SERVICES',
        title: 'Logo & Brand Identity',
        description:
            'Distinctive visual identities that communicate your brand personality and make a lasting impression.',
        features: [
            'Logo Design',
            'Brand Guidelines',
            'Business Cards',
        ],
        featured: true,
    },
    {
        id: 6,
        icon: <CampaignRoundedIcon />,
        category: 'creative',
        label: 'CREATIVE SERVICES',
        title: 'Social Media Design',
        description:
            'Creative and consistent graphics that help businesses communicate effectively across social platforms.',
        features: [
            'Social Media Posts',
            'Marketing Banners',
            'Promotional Creatives',
        ],
    },
    {
        id: 7,
        icon: <BusinessCenterRoundedIcon />,
        category: 'non-it',
        label: 'NON-IT SERVICES',
        title: 'Business Support',
        description:
            'Reliable administrative and documentation support to simplify everyday business operations.',
        features: [
            'Documentation',
            'Presentation Design',
            'Administrative Assistance',
        ],
    },
    {
        id: 8,
        icon: <SupportAgentRoundedIcon />,
        category: 'non-it',
        label: 'NON-IT SERVICES',
        title: 'Digital Assistance',
        description:
            'Practical digital and operational assistance for individuals, startups and growing businesses.',
        features: [
            'Data Organization',
            'Research Assistance',
            'Digital Documentation',
        ],
    },
];

export default function Services() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredServices =
        activeCategory === 'all'
            ? services
            : services.filter(
                (service) => service.category === activeCategory
            );

    return (
        <Box component="section" id="services" className="services_section">
            <div className="services_glow" />

            <Container
                maxWidth={false}
                disableGutters
                className="container"
            >
                <Box className="services_header">

                    <Chip
                        icon={<AutoAwesomeRoundedIcon />}
                        label="WHAT WE OFFER"
                        className="services_chip"
                    />

                    <Typography variant="h2" className="services_title">
                        Solutions Built for
                        <br />
                        <span>Your Success.</span>
                    </Typography>

                    <Typography className="services_description">
                        From innovative IT solutions to creative and
                        professional business services, we bring the
                        right skills and ideas together to help your
                        business move forward.
                    </Typography>

                </Box>

                <Stack
                    direction="row"
                    className="services_filters"
                    role="group"
                    aria-label="Filter services by category"
                >
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                activeCategory === category.id
                                    ? 'contained'
                                    : 'outlined'
                            }
                            className={`filter_btn ${activeCategory === category.id ? 'active' : ''
                                }`}
                            aria-pressed={activeCategory === category.id}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                        </Button>
                    ))}
                </Stack>

                <Grid
                    container
                    spacing={3}
                    className="services_grid"
                >
                    {filteredServices.map((service) => (
                        <Grid
                            key={service.id}
                            size={{ xs: 12, sm: 6, lg: 4 }}
                        >
                            <Card
                                className={`service_card ${service.featured ? 'featured_card' : ''
                                    }`}
                            >
                                <CardContent className="service_card_content">

                                    <Box className="card_top">
                                        <Box className="service_icon">
                                            {service.icon}
                                        </Box>

                                        <ArrowOutwardRoundedIcon
                                            className="card_arrow"
                                        />
                                    </Box>

                                    <Typography className="service_category">
                                        {service.label}
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        className="service_title"
                                    >
                                        {service.title}
                                    </Typography>

                                    <Typography className="service_text">
                                        {service.description}
                                    </Typography>

                                    <Box className="service_features">
                                        {service.features.map((feature) => (
                                            <Box
                                                key={feature}
                                                className="service_feature"
                                            >
                                                <span className="feature_dot" />
                                                <Typography>{feature}</Typography>
                                            </Box>
                                        ))}
                                    </Box>



                                    <Button
                                        component="a"
                                        href={`/?service=${encodeURIComponent(
                                            serviceOptions.find(
                                                (option) => option.label === service.title
                                            )?.value || 'other'
                                        )}#contact`}
                                        endIcon={<ArrowForwardRoundedIcon />}
                                        className="service_link"
                                    >
                                        Get a Quote
                                    </Button>



                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box className="services_bottom">
                    <Typography>
                        Have a unique project or requirement in mind?
                    </Typography>

                    <Button
                        variant="outlined"
                        href="#contact"
                        endIcon={<ArrowOutwardRoundedIcon />}
                    >
                        Let's Discuss Your Project
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}
