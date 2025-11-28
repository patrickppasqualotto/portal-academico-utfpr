const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rotas MVC (requer sessão)
 */
function requireSession(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/web/login?next=' + encodeURIComponent(req.originalUrl));
}

/**
 * Middleware para proteger rotas API (requer JWT)
 */
function requireJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = auth.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_super_segura_utfpr';
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Anexar informações do token
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
}

module.exports = { requireSession, requireJwt };
