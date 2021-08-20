const path = require('path');
const express = require('express');

const dotenv = require('dotenv').config({
	path: path.resolve(__dirname + '/configs.env'),
});

// connect to database
const db = require('./database/db');
const AppError = require('./utils/AppError');
const globalErrorHandlers = require('./controllers/errorController');
const apiRouters = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouters);

// catch errors (all verbs: get post put patch , etc...)
app.all('*', (req, res, next) => {
	return next(
		new AppError(`Can't find ${req.originalUrl} on this server!`, 400)
	);
});

app.use(globalErrorHandlers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server is currently running on port ${PORT}`)
);
