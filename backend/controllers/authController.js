
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { z } = require('zod');

const Admin = require('../models/Admin');

const loginSchema = z.strictObject({
  email: z.email().trim().toLowerCase().max(254),
  password: z.string().min(1).max(256),
});

function regenerateSession(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) =>
      error ? reject(error) : resolve()
    );
  });
}

function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((error) =>
      error ? reject(error) : resolve()
    );
  });
}

function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) =>
      error ? reject(error) : resolve()
    );
  });
}

async function getCsrfToken(req, res, next) {
  try {
    if (!req.session.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(32).toString('hex');
      await saveSession(req);
    }

    res.set('Cache-Control', 'no-store');
    res.json({
      success: true,
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid email and password.',
      });
    }

    const { email, password } = parsed.data;

    const admin = await Admin.findOne({
      email,
      active: true,
    }).select('+passwordHash');

    const validPassword = admin
      ? await bcrypt.compare(password, admin.passwordHash)
      : false;

    if (!validPassword || admin.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    await regenerateSession(req);

    req.session.adminId = admin.id;
    req.session.sessionVersion = admin.sessionVersion;
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');

    await saveSession(req);

    await Admin.updateOne(
      { _id: admin._id },
      { $set: { lastLoginAt: new Date() } }
    );

    res.set('Cache-Control', 'no-store');

    return res.json({
      success: true,
      csrfToken: req.session.csrfToken,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

function getMe(req, res) {
  res.set('Cache-Control', 'no-store');

  res.json({
    success: true,
    csrfToken: req.session.csrfToken,
    admin: {
      id: String(req.admin._id),
      name: req.admin.name,
      email: req.admin.email,
    },
  });
}

async function logout(req, res, next) {
  try {
    await destroySession(req);
    res.clearCookie('dan_admin.sid', {
      path: '/api/admin',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCsrfToken,
  login,
  getMe,
  logout,
};
