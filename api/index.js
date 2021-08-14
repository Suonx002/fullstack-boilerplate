const express = require('express');
const router = express.Router();

const userRouter = require('./users');

router.get('/', (req, res) => {
	return res.status(200).json({
		status: 'success',
		message: 'Welcome to Node-React-Saas!',
	});
});

router.use('/users', userRouter);

module.exports = router;
