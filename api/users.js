const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const userSchema = require('../validationSchema/userValidations');
const validateRequest = require('../validationSchema/validateRequest');

const userController = require('../controllers/userController');

router
	.route('/')
	.post(
		validateRequest(userSchema.createSchema),
		catchAsync(userController.create)
	);

router
	.route('/login')
	.post(
		validateRequest(userSchema.loginSchema),
		catchAsync(userController.login)
	);

router.route('/:id').get(catchAsync(userController.get));

module.exports = router;
