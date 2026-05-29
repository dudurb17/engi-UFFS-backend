const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);

module.exports = router;