
export const serviceOptions = [
  { value: 'website-development', label: 'Website Development' },
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'software-solutions', label: 'Software Solutions' },
  { value: 'logo-branding', label: 'Logo & Brand Identity' },
  { value: 'social-media-design', label: 'Social Media Design' },
  { value: 'business-support', label: 'Business Support' },
  { value: 'digital-assistance', label: 'Digital Assistance' },
  { value: 'other', label: 'Other / Custom Requirement' },
];

export const budgetOptions = [
  { value: 'not-sure', label: 'Not Sure Yet' },
  { value: 'below-10000', label: 'Below ₹10,000' },
  { value: '10000-25000', label: '₹10,000 – ₹25,000' },
  { value: '25000-50000', label: '₹25,000 – ₹50,000' },
  { value: '50000-100000', label: '₹50,000 – ₹1,00,000' },
  { value: 'above-100000', label: 'Above ₹1,00,000' },
];

export const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
};

export const getServiceFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');

  if (!requestedService) return '';

  const normalized = requestedService.trim().toLowerCase();

  const matched = serviceOptions.find(
    (option) =>
      option.value === normalized ||
      option.label.toLowerCase() === normalized
  );

  return matched?.value || '';
};
