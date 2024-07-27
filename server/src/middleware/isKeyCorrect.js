const adminApiKey = process.env.ADMIN_API_KEY;

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey && apiKey === adminApiKey) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

export default apiKeyAuth;
