const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const userSchema = require('../validationSchema/userValidations');
const validateRequest = require('../validationSchema/validateRequest');
const permissions = require('../middlewares/permissions');

const userController = require('../controllers/userController');

router
	.route('/')
	.get(permissions.privateRoute, catchAsync(userController.getAll))
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

router
	.route('/me')
	.get(permissions.privateRoute, catchAsync(userController.getMe));

router.route('/forgotPassword').post(catchAsync(userController.forgotPassword));

router
	.route('/resetPassword/:token')
	.patch(catchAsync(userController.resetPassword));

router
	.route('/:id')
	.get(catchAsync(userController.get))
	.delete(
		permissions.privateRoute,
		permissions.permissionAccesByRoles(['enterprise']),
		catchAsync(userController.delete)
	);

module.exports = router;
