const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/v1/auth/login
router.post('/login', authController.login);

// GET /api/v1/auth/verify
router.get('/verify', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'Token não fornecido' });

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta_super_segura_utfpr', (err, user) => {
    if (err) return res.status(401).json({ success: false, error: 'Token inválido' });
    req.user = user;
    authController.verify(req, res);
  });
});

module.exports = router;
