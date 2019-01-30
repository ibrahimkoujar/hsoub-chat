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
const controller = require('../controllers/accountController');
/**
 * Auth Middleware.
 */
const auth = require('../middlewares/auth');

/**
 * POST update profile.
 */
router.post('/', auth.authenticated, controller.profile);

/**
 * POST Change password.
 */
router.post('/password', auth.authenticated, controller.password);

/**
 * Export router.
 */
module.exports = router;
