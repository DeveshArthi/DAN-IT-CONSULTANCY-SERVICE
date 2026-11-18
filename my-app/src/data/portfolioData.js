
import skincare from '../assets/portfolio/skincare.jpg';
import travel from '../assets/portfolio/travel.jpg';
import fashion from '../assets/portfolio/fashion.jpg';
import branding from '../assets/portfolio/branding.jpg';
import creative from '../assets/portfolio/creative.jpg';
import business from '../assets/portfolio/business.jpg';

export const portfolioCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'branding', label: 'Branding' },
  { id: 'creative', label: 'Creative' },
  { id: 'business', label: 'Business' },
];

export const portfolioProjects = [
  {
    id: 1,
    title: 'DANI Bee — Skincare Experience',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    image: skincare,
    type: 'concept',
    year: '2026',
    description:
      'A premium skincare e-commerce interface focused on elegant visuals, product discovery and a responsive shopping experience.',
    services: [
      'Frontend Development',
      'Responsive Design',
      'Product Showcase',
    ],
    technologies: ['React', 'SCSS', 'JavaScript'],
    challenge:
      'Create a premium product-focused interface that remains intuitive and responsive across different screen sizes.',
    solution:
      'A modern landing experience with carefully structured product cards, interactive sections and responsive layouts.',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 2,
    title: 'Sarai Stories — Travel Journal',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    image: travel,
    type: 'concept',
    year: '2026',
    description:
      'A travel, food and culture blogging platform designed for immersive storytelling and content discovery.',
    services: [
      'Website Development',
      'Blog Interface',
      'Responsive Design',
    ],
    technologies: ['React', 'SCSS', 'JavaScript'],
    challenge:
      'Organize multiple storytelling categories while maintaining a consistent visual experience.',
    solution:
      'A category-driven website with editorial layouts, cinematic hero sections and intuitive navigation.',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 3,
    title: 'Modern Fashion — Online Store',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    image: fashion,
    type: 'concept',
    year: '2026',
    description:
      'A contemporary fashion shopping interface with product collections, browsing experiences and a modern visual identity.',
    services: [
      'E-Commerce UI',
      'Frontend Development',
      'Responsive Layouts',
    ],
    technologies: ['React', 'MUI', 'SCSS'],
    challenge:
      'Present fashion collections with clear product hierarchy and simple navigation.',
    solution:
      'A clean shopping experience using reusable components, product cards and responsive layouts.',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 4,
    title: 'DAN — Brand Identity Concept',
    category: 'branding',
    categoryLabel: 'BRAND IDENTITY',
    image: branding,
    type: 'concept',
    year: '2026',
    description:
      'A visual identity exploration featuring typography, brand colors and professional business assets.',
    services: [
      'Logo Design',
      'Brand Identity',
      'Business Card Design',
    ],
    technologies: ['Brand Design', 'Graphic Design'],
    challenge:
      'Develop a consistent visual language for a professional consultancy.',
    solution:
      'A flexible identity concept with a distinctive mark, coordinated colors and reusable brand assets.',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 5,
    title: 'Creative Social Campaign',
    category: 'creative',
    categoryLabel: 'CREATIVE DESIGN',
    image: creative,
    type: 'concept',
    year: '2026',
    description:
      'A coordinated social media design concept for promoting services, products and brand awareness.',
    services: [
      'Social Media Graphics',
      'Campaign Creatives',
      'Digital Marketing Assets',
    ],
    technologies: ['Graphic Design', 'Visual Branding'],
    challenge:
      'Create promotional designs that remain visually consistent across different formats.',
    solution:
      'A modular design system with clear typography, reusable layouts and consistent brand styling.',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 6,
    title: 'Business Presentation Design',
    category: 'business',
    categoryLabel: 'BUSINESS SERVICES',
    image: business,
    type: 'concept',
    year: '2026',
    description:
      'A professional business presentation concept designed to communicate ideas, services and proposals clearly.',
    services: [
      'Presentation Design',
      'Content Organization',
      'Business Documentation',
    ],
    technologies: ['Presentation Design', 'Documentation'],
    challenge:
      'Transform detailed business information into an easy-to-follow presentation.',
    solution:
      'A structured slide system with readable layouts, clear hierarchy and consistent visual elements.',
    liveUrl: '',
    githubUrl: '',
  },
];
