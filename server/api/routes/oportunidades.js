const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.oportunidades.list);
router.get('/:id', api.oportunidades.show);
router.post('/', requireJwt, api.oportunidades.create);
router.put('/:id', requireJwt, api.oportunidades.update);
router.delete('/:id', requireJwt, api.oportunidades.delete);

module.exports = router;
