const express = require('express');
const router = express.Router();
const { blogController } = require('../controllers');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, blogController.view_all);

router.get('/new', requireAuth, blogController.view_new);

router.get('/edit/:blogId', requireAuth, blogController.view_edit);

router.get('/:blogId', requireAuth, blogController.view_details);

router.post('/', requireAuth, blogController.api_create);

router.delete('/:blogId', requireAuth, blogController.api_delete);

router.put('/:blogId', requireAuth, blogController.api_update);

module.exports = router;
