const yup = require('yup');

exports.createSchema = yup.object().shape({
	firstName: yup.string().trim().min(2).label('First Name').required(),
	lastName: yup.string().trim().min(2).label('Last Name').required(),
	email: yup.string().trim().email().label('Email').required(),
	password: yup.string().min(5).max(50).label('Password').required(),
});

exports.loginSchema = yup.object().shape({
	email: yup.string().trim().email().label('Email').required(),
	password: yup.string().label('Password').required(),
});
