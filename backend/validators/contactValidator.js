
const { z } = require('zod');

const serviceValues = [
  'website-development',
  'website-redesign',
  'ui-ux-design',
  'software-solutions',
  'logo-branding',
  'social-media-design',
  'business-support',
  'digital-assistance',
  'other',
];

const budgetValues = [
  'not-sure',
  'below-10000',
  '10000-25000',
  '25000-50000',
  '50000-100000',
  'above-100000',
];

const contactSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters')
    .max(100),

  email: z
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase()
    .max(254),

  phone: z
    .string()
    .trim()
    .max(20)
    .refine(
      (value) =>
        value === '' || /^\+?[0-9\s()-]{7,20}$/.test(value),
      'Invalid phone number'
    )
    .default(''),

  service: z.enum(serviceValues),

  budget: z
    .union([z.literal(''), z.enum(budgetValues)])
    .default(''),

  message: z
    .string()
    .trim()
    .min(20, 'Message must contain at least 20 characters')
    .max(3000),
});

function validateContact(req, res, next) {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Please check your submitted information.',
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'form',
        message: issue.message,
      })),
    });
  }

  req.validatedContact = result.data;
  next();
}

module.exports = validateContact;
