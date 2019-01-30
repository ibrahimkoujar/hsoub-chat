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
const controller = require('../controllers/authController');
/**
 * Auth Middleware.
 */
const auth = require('../middlewares/auth');

/**
 * POST Login Request.
 */
router.post('/', controller.login);

/**
 * POST register Request.
 */
router.post('/register', controller.register);

/**
 * Export router.
 */
module.exports = router;
