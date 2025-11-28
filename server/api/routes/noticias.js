const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.noticias.list);
router.get('/:id', api.noticias.show);
router.post('/', requireJwt, api.noticias.create);
router.put('/:id', requireJwt, api.noticias.update);
router.delete('/:id', requireJwt, api.noticias.delete);

module.exports = router;
