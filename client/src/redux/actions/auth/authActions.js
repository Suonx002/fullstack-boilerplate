import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';
import * as types from './authTypes';

export const getAuthUser = () => async (dispatch) => {
	try {
		setAuthToken(localStorage.jwtToken);

		const res = await axios.get('/users/me');
		dispatch({
			type: types.GET_AUTH_USER,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: types.AUTH_ERROR,
			payload: 'Please login to access this page.',
		});
	}
};

export const loginUser = (data, toast, history) => async (dispatch) => {
	try {
		const res = await axios.post('/users/login', data);
		dispatch({
			type: types.LOGIN_SUCCESS,
			payload: res.data,
		});
		toast({
			title: 'Login Success!',
			status: 'success',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});
		// change this to '/' if without dashboard
		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: types.LOGIN_FAILED,
			payload:
				err?.response?.data?.message ||
				err?.response?.message ||
				'Invalid Credentials',
		});
		toast({
			title: 'Error',
			description:
				err?.response?.data?.message ||
				err?.response?.message ||
				'Invalid Credentials',
			status: 'error',
			position: 'top',

			duration: 4000,
			isClosable: true,
		});
	}
};

export const registerUser = (data, toast, history) => async (dispatch) => {
	try {
		const res = await axios.post('/users', data);
		dispatch({
			type: types.REGISTER_SUCCESS,
			payload: res.data,
		});
		toast({
			title: 'Account created.',
			description: "We've created your account for you.",
			status: 'success',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});

		// change this to '/' if without dashboard
		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: types.REGISTER_FAILED,
			payload:
				err?.response?.data?.message ||
				err?.response?.message ||
				'Something went wrong with registering a user',
		});
		toast({
			title: 'Error',
			description:
				err?.response?.data?.message ||
				err?.response?.message ||
				'Something went wrong with creating an account.',
			status: 'error',
			position: 'top',

			duration: 4000,
			isClosable: true,
		});
	}
};

export const logoutUser = (toast) => (dispatch) => {
	dispatch({
		type: types.LOGOUT,
	});

	toast({
		title: 'Successfully logout!',
		status: 'success',
		position: 'top',
		duration: 4000,
		isClosable: true,
	});
};

export const resetPassword = (data, toast, history) => async (dispatch) => {
	try {
		const res = await axios.patch(`/users/resetPassword/${data.token}`, {
			password: data.password,
		});

		const title =
			res?.data?.message || 'Password has been changed successfully!';

		dispatch({
			type: types.RESET_PASSWORD,
			message: title,
		});

		toast({
			title,
			status: 'success',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});

		history.push('/login');
	} catch (err) {
		const description =
			err?.response?.data?.message ||
			err?.response?.message ||
			'Something went wrong with resetting the password.';

		dispatch({
			type: types.RESET_PASSWORD_FAILED,
			message: description,
		});
		toast({
			title: 'Error',
			description,

			status: 'error',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});
	}
};

export const forgotPassword = (data, toast) => async (dispatch) => {
	try {
		const res = await axios.post(`/users/forgotPassword`, data);

		const title =
			res?.data?.message || 'Password reset has been sent to your email!';

		toast({
			title,
			status: 'success',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});

		dispatch({
			type: types.FORGOT_PASSWORD,
			payload: title,
		});
	} catch (err) {
		const description =
			err?.response?.data?.message ||
			err?.response?.message ||
			'Something went wrong with forgot password. Please contact us.';

		dispatch({
			type: types.FORGOT_PASSWORD_FAILED,
			payload: description,
		});

		toast({
			title: 'Error',
			description,
			status: 'error',
			position: 'top',
			duration: 4000,
			isClosable: true,
		});
	}
};
