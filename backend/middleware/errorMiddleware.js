
function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: 'API endpoint not found.',
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request body is too large.',
    });
  }

  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body.',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid enquiry information.',
    });
  }

  console.error('API error:', {
    name: err.name,
    message: err.message,
  });

  return res.status(500).json({
    success: false,
    message: 'An internal server error occurred.',
  });
}

module.exports = {
  notFound,
  errorHandler,
};
