
const crypto = require('crypto');

function csrfProtection(req, res, next) {
  const method = req.method.toUpperCase();

  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return next();
  }

  const allowedOrigins = (process.env.CLIENT_URLS || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const origin = req.get('origin');

  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: 'Request origin is not permitted.',
    });
  }

  const expected = req.session?.csrfToken;
  const received = req.get('x-csrf-token');

  if (
    !expected ||
    !received ||
    expected.length !== received.length ||
    !crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(received)
    )
  ) {
    return res.status(403).json({
      success: false,
      message: 'Invalid security token. Refresh and try again.',
    });
  }

  next();
}

module.exports = csrfProtection;
