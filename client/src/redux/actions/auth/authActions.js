import axios from 'axios';
import res from 'express/lib/response';
import * as types from './authTypes';

export const loginUser = (data) => async (dispatch) => {
	try {
		const res = await axios.post('/users/login', data);
		dispatch({
			type: types.LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: types.LOGIN_FAILED,
			payload: res?.response?.message || 'Something went wrong with login',
		});
	}
};

export const registerUser = (data) => async (dispatch) => {
	try {
		const res = await axios.post('/users', data);
		dispatch({
			type: types.REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: types.REGISTER_FAILED,
			payload:
				res?.response?.message ||
				'Something went wrong with registering a user',
		});
	}
};
