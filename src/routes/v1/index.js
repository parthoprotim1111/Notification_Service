const express = require('express');

const { InfoController, emailController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);

router.post('/tickets',emailController.create)

module.exports = router;