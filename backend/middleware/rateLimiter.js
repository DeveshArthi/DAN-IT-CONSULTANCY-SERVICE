
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: 'draft-8',
  legacyHeaders: false,

  keyGenerator: (req) =>
    ipKeyGenerator(req.ip),

  message: {
    success: false,
    message:
      'Too many enquiries from this connection. Please try again later.',
  },
});

module.exports = contactLimiter;
