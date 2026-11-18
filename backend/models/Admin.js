
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },

    active: {
      type: Boolean,
      default: true,
    },

    sessionVersion: {
      type: Number,
      default: 0,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'admins',
  }
);

module.exports =
  mongoose.models.Admin ||
  mongoose.model('Admin', adminSchema);
