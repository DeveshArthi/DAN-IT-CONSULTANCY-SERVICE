
const express = require('express');

const {
  createContact,
} = require('../controllers/contactController');

const validateContact = require('../validators/contactValidator');
const contactLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  validateContact,
  createContact
);

module.exports = router;
