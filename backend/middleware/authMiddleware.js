const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // In a real app, verify JWT token
  // For demo, we'll just pass through
  next();
};
