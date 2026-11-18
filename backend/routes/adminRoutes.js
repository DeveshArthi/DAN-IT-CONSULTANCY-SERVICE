
const express = require('express');

const requireAdmin = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');

const {
  getStats,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
} = require('../controllers/adminController');

const router = express.Router();

router.use(requireAdmin);

router.get('/stats', getStats);
router.get('/enquiries', getEnquiries);
router.get('/enquiries/:id', getEnquiryById);

router.patch(
  '/enquiries/:id/status',
  csrfProtection,
  updateEnquiryStatus
);

module.exports = router;
