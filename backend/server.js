
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




const allowedOrigins = (
  process.env.CLIENT_URLS || ''
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header,
    // such as backend health checks.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error('CORS blocked origin:', origin);

    const error = new Error('Origin not allowed by CORS');
    error.status = 403;

    return callback(error);
  },

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
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

app.use(cors(corsOptions));


app.disable('x-powered-by');

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error('Origin not allowed');
      error.status = 403;
      callback(error);
    },

    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(
  express.json({
    limit: '20kb',
    strict: true,
    type: 'application/json',
  })
);

app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    message: connected
      ? 'DAN IT CONSULTANCY SERVICE API is running'
      : 'Database unavailable',
  });
});

// Public contact form — no admin session required.
app.use('/api/contact', contactRoutes);

// Session middleware only for private admin APIs.
app.use('/api/admin', createSessionMiddleware());

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);

app.use((err, req, res, next) => {
  if (err.status === 403) {
    return res.status(403).json({
      success: false,
      message: 'Request origin is not allowed.',
    });
  }

  errorHandler(err, req, res, next);
});

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
