
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function requireAdmin(req, res, next) {
  try {
    const adminId = req.session?.adminId;

    if (!adminId || !mongoose.isValidObjectId(adminId)) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    const admin = await Admin.findById(adminId)
      .select('name email role active sessionVersion')
      .lean();

    if (
      !admin ||
      !admin.active ||
      admin.role !== 'admin' ||
      admin.sessionVersion !== req.session.sessionVersion
    ) {
      return res.status(401).json({
        success: false,
        message: 'Your session is no longer valid.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = requireAdmin;
