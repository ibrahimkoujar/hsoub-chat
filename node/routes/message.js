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
const controller = require('../controllers/messageController');

const auth = require('../middlewares/auth');

/**
 * GET user Messages.
 */
router.get('/', auth.authenticated, controller.all);

/**
 * Export router.
 */
module.exports = router;
