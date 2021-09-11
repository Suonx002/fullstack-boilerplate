const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ignoreFavicon = require('./middlewares/ignoreFavicon');

const dotenv = require('dotenv').config({
	path: path.resolve(__dirname + '/configs.env'),
});

// connect to database
const db = require('./database/db');
const AppError = require('./utils/AppError');
const globalErrorHandlers = require('./controllers/errorController');
const apiRouters = require('./api');

const app = express();

// app.use(ignoreFavicon);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
	return res.status(200).json({
		status: 'success',
		message: 'Welcome to Full Stack Boilerplate',
		techStack: 'React, Chakra UI, React-Redux, Node, Knex, and Postgres',
	});
});

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
