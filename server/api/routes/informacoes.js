const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.informacoes.list);
router.get('/:id', api.informacoes.show);
router.post('/', requireJwt, api.informacoes.create);
router.put('/:id', requireJwt, api.informacoes.update);
router.delete('/:id', requireJwt, api.informacoes.delete);

module.exports = router;
