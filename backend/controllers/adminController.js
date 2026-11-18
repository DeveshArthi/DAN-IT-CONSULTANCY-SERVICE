
const mongoose = require('mongoose');
const { z } = require('zod');
const Contact = require('../models/Contact');

const allowedStatuses = [
  'new',
  'contacted',
  'in-progress',
  'closed',
];

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.enum(['all', ...allowedStatuses]).default('all'),
  search: z.string().trim().max(100).default(''),
});

const statusSchema = z.strictObject({
  status: z.enum(allowedStatuses),
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getStats(req, res, next) {
  try {
    const [total, newCount, contacted, inProgress, closed] =
      await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ status: 'new' }),
        Contact.countDocuments({ status: 'contacted' }),
        Contact.countDocuments({ status: 'in-progress' }),
        Contact.countDocuments({ status: 'closed' }),
      ]);

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted,
        inProgress,
        closed,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getEnquiries(req, res, next) {
  try {
    const parsed = querySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid search or pagination parameters.',
      });
    }

    const { page, limit, status, search } = parsed.data;

    const filter = {};

    if (status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), 'i');

      filter.$or = [
        { name: regex },
        { email: regex },
        { service: regex },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Contact.find(filter)
        .select('name email service budget status createdAt')
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Contact.countDocuments(filter),
    ]);

    res.set('Cache-Control', 'no-store');

    res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getEnquiryById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID.',
      });
    }

    const enquiry = await Contact.findById(req.params.id).lean();

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.set('Cache-Control', 'no-store');

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

async function updateEnquiryStatus(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID.',
      });
    }

    const parsed = statusSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry status.',
      });
    }

    const enquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { status: parsed.data.status } },
      { new: true, runValidators: true }
    ).lean();

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStats,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
};
