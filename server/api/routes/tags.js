const express = require('express');
const router = express.Router();
const api = require('../controllers/apiControllers');
const requireJwt = require('../../middleware/authMiddleware').requireJwt;

// GET /api/v1/tags
router.get('/', api.tags.list);

// GET /api/v1/tags/:id
router.get('/:id', api.tags.show);

// POST /api/v1/tags
router.post('/', requireJwt, api.tags.create);

// PUT /api/v1/tags/:id
router.put('/:id', requireJwt, api.tags.update);

// DELETE /api/v1/tags/:id
router.delete('/:id', requireJwt, api.tags.delete);

module.exports = router;
