
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const createSessionMiddleware = require('./config/session');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const {
  notFound,
  errorHandler,
} = require('./middleware/errorMiddleware');

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// ==========================================
// SERVER CONFIGURATION
// ==========================================

app.disable('x-powered-by');

app.set(
  'trust proxy',
  Number(process.env.TRUST_PROXY || 0)
);

// ==========================================
// ALLOWED ORIGINS
// ==========================================

const allowedOrigins = (process.env.CLIENT_URLS || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

// Allow local development only in development mode.
if (!isProduction) {
  allowedOrigins.push(
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  );
}

const uniqueOrigins = [...new Set(allowedOrigins)];

console.log('Allowed origins:', uniqueOrigins);

// ==========================================
// SECURITY
// ==========================================

app.use(helmet());

// ==========================================
// CORS CONFIGURATION
// ==========================================

const corsOptions = {
  origin(origin, callback) {
    console.log('Incoming origin:', origin || 'No origin');

    if (!origin || uniqueOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error('CORS blocked origin:', origin);

    const error = new Error('Request origin is not allowed.');
    error.status = 403;
    error.code = 'CORS_ORIGIN_DENIED';

    return callback(error);
  },

  methods: [
    'GET',
    'POST',
    'PATCH',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-CSRF-Token',
  ],

  credentials: true,

  optionsSuccessStatus: 204,
};

// Apply CORS only once.
app.use(cors(corsOptions));

// ==========================================
// BODY PARSER
// ==========================================

app.use(
  express.json({
    limit: '20kb',
    strict: true,
    type: 'application/json',
  })
);

// ==========================================
// ROOT ENDPOINT
// ==========================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DAN IT CONSULTANCY SERVICE Backend API',
    status: 'Running',
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    message: connected
      ? 'DAN IT CONSULTANCY SERVICE API is running'
      : 'Database unavailable',
  });
});

// ==========================================
// PUBLIC CONTACT API
// ==========================================

app.use('/api/contact', contactRoutes);

// ==========================================
// ADMIN SESSION
// ==========================================

app.use('/api/admin', createSessionMiddleware());

// ==========================================
// ADMIN APIs
// ==========================================

app.use('/api/admin/auth', authRoutes);

app.use('/api/admin', adminRoutes);

// ==========================================
// ERROR HANDLING
// ==========================================

app.use(notFound);

app.use((err, req, res, next) => {
  if (err.code === 'CORS_ORIGIN_DENIED') {
    return res.status(403).json({
      success: false,
      message: 'Request origin is not allowed.',
      code: 'CORS_ORIGIN_DENIED',
    });
  }

  return errorHandler(err, req, res, next);
});

// ==========================================
// START SERVER
// ==========================================

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log('================================');
      console.log(`Backend running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log('================================');
    });

  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
