
require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Admin = require('../models/Admin');
const connectDB = require('../config/db');

async function main() {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password || password.length < 16) {
    throw new Error(
      'Set ADMIN_NAME, ADMIN_EMAIL and a password of at least 16 characters.'
    );
  }

  await connectDB();

  const existing = await Admin.findOne({ email });

  if (existing) {
    throw new Error(
      'Admin already exists. Existing accounts are not overwritten.'
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    name,
    email,
    passwordHash,
    role: 'admin',
    active: true,
  });

  console.log('Admin account created successfully');
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
