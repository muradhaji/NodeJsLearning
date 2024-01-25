const express = require('express');
const router = express.Router();
const { blogController } = require('../controllers');

router.get('/', blogController.view_all);

router.get('/new', blogController.view_new);

router.get('/edit/:blogId', blogController.view_edit);

router.get('/:blogId', blogController.view_details);

router.post('/', blogController.api_create);

router.delete('/:blogId', blogController.api_delete);

router.put('/:blogId', blogController.api_update);

module.exports = router;
