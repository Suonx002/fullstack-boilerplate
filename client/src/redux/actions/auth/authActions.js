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

export const loginUser = (data, toast) => async (dispatch) => {
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
	} catch (err) {
		console.log({ err });

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

export const registerUser = (data, toast) => async (dispatch) => {
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
