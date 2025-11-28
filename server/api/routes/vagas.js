const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.vagas.list);
router.get('/:id', api.vagas.show);
router.post('/', requireJwt, api.vagas.create);
router.put('/:id', requireJwt, api.vagas.update);
router.delete('/:id', requireJwt, api.vagas.delete);

module.exports = router;
