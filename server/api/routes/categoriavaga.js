const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.categoriaVaga.list);
router.get('/:id', api.categoriaVaga.show);
router.post('/', requireJwt, api.categoriaVaga.create);
router.put('/:id', requireJwt, api.categoriaVaga.update);
router.delete('/:id', requireJwt, api.categoriaVaga.delete);

module.exports = router;
