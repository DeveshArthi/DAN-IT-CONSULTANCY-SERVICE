
const express = require('express');
const { rateLimit } = require('express-rate-limit');

const {
  getCsrfToken,
  login,
  getMe,
  logout,
} = require('../controllers/authController');

const requireAdmin = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Try again later.',
  },
});

router.get('/csrf', getCsrfToken);
router.post('/login', loginLimiter, csrfProtection, login);
router.get('/me', requireAdmin, getMe);
router.post('/logout', requireAdmin, csrfProtection, logout);

module.exports = router;
