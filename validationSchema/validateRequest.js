const catchAsync = require('../utils/catchAsync');

module.exports = (schema) =>
	catchAsync(async (req, res, next) => {
		const validateBody = await schema.validate(req.body, { abortEarly: false });

		req.body = validateBody;

		next();
	});
