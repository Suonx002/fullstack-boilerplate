const handleUniqueViolation = (err) => {
	const columnsReducer = err.columns.reduce((prev, current) => {
		return `${prev} ${current}`;
	}, '');
	err.message = `${columnsReducer.trim()} is taken, please use something else.`;
	err.statusCode = 400;
	return err;
};

const handleJWTExpire = (err) => {
	err.message = 'Your token has expired. Please login again.';
	err.statusCode = 400;

	return err;
};

const handleJWTError = (err) => {
	err.message = 'Invalid token. Please login again.';
	err.statusCode = 400;
	return err;
};

const handleValidationError = (err) => {
	err.statusCode = 400;
	return err;
};

const handleInvalidInput = (err) => {
	err.statusCode = 400;
	err.message = 'Invalid input or id';

	return err;
};

const globalErrorHandlers = (err, req, res, next) => {
	let error = { ...err };

	// err.message is a property, would need to set inside of error,,
	error.message = err.message;

	if (error.name === 'UniqueViolationError')
		error = handleUniqueViolation(error);
	if (error.name === 'TokenExpiredError') error = handleJWTExpire(error);
	if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
	if (error.name === 'ValidationError') error = handleValidationError(error);
	if (error.code === '22P02') error = handleInvalidInput(error);

	return res.status(error.statusCode || 500).json({
		status: 'fail',
		message: error.message || 'Server Error',
		errors: error.inner ? error.inner : undefined,
	});
};

module.exports = globalErrorHandlers;
