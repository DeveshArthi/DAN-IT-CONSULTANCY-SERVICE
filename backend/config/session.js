
const session = require('express-session');

const connectMongo = require('connect-mongo');

// Support different connect-mongo export formats.
const MongoStore =
  connectMongo.MongoStore ||
  connectMongo.default ||
  connectMongo;

function createSessionMiddleware() {
  if (
    !process.env.SESSION_SECRET ||
    process.env.SESSION_SECRET.length < 32
  ) {
    throw new Error(
      'SESSION_SECRET must contain at least 32 characters'
    );
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  if (typeof MongoStore.create !== 'function') {
    throw new Error(
      'Unsupported connect-mongo version. Check npm ls connect-mongo.'
    );
  }

  return session({
    name: 'dan_admin.sid',

    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,
    rolling: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'admin_sessions',
      ttl: 60 * 60 * 8,
      autoRemove: 'native',
    }),

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
      path: '/api/admin',
    },
  });
}

module.exports = createSessionMiddleware;
