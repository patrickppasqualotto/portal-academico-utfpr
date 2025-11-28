const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

router.get('/', api.eventos.list);
router.get('/:id', api.eventos.show);
router.post('/', requireJwt, api.eventos.create);
router.put('/:id', requireJwt, api.eventos.update);
router.delete('/:id', requireJwt, api.eventos.delete);

module.exports = router;
