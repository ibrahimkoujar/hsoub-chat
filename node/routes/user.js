/**
 * Express Module.
 */
const express = require('express');

/**
 * Router Module.
 */
const router = express.Router();

/**
 * Controller Module.
 */
const controller = require('../controllers/userController');

/**
 * Controller Module.
 */
const auth = require('../middlewares/auth');

/**
 * GET users.
 */
router.get('/', auth.authenticated, controller.all);

/**
 * Export router.
 */
module.exports = router;
