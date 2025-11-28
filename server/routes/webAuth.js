const express = require('express');
const { findUserByEmail } = require('../lib/authService');

const router = express.Router();

/**
 * GET /web/login - Renderiza página de login
 */
router.get('/login', (req, res) => {
  const error = req.query.error || null;
  res.render('login', { error, appName: 'Portal Acadêmico UTFPR' });
});

/**
 * POST /web/login - Autentica e cria sessão
 */
router.post('/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).render('login', {
      error: 'Email é obrigatório',
      appName: 'Portal Acadêmico UTFPR'
    });
  }

  try {
    const usuario = await findUserByEmail(email);
    if (!usuario) {
      return res.status(401).render('login', {
        error: 'Usuário não encontrado',
        appName: 'Portal Acadêmico UTFPR'
      });
    }

    // Salvar dados do usuário na sessão
    req.session.user = usuario;
    req.session.save((err) => {
      if (err) {
        return res.status(500).render('login', {
          error: 'Erro ao criar sessão',
          appName: 'Portal Acadêmico UTFPR'
        });
      }
      // Redirecionar para página protegida ou home (por padrão volta para o portal root)
      const nextUrl = req.query.next || '/';
      res.redirect(nextUrl);
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).render('login', {
      error: 'Erro interno do servidor',
      appName: 'Portal Acadêmico UTFPR'
    });
  }
});

/**
 * GET /web/logout - Encerra sessão
 */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
    }
    res.redirect('/web/login?message=Logout realizado');
  });
});

/**
 * GET /web/dashboard - Página protegida (exemplo)
 */
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/web/login?next=' + encodeURIComponent(req.originalUrl));
  }
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
