/* eslint-disable import/no-anonymous-default-export */

import * as types from '../actions/auth/authTypes';

const initialState = {
	isAuthenticated: true,
	user: null,
	token: null,
	message: '',
	isLoading: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_SUCCESS:
		case types.REGISTER_SUCCESS:
		case types.GET_AUTH_USER:
			localStorage.setItem('jwtToken', action.payload.token);
			return {
				...state,
				user: action.payload.data,
				token: action.payload.token,
				isAuthenticated: true,
				isLoading: false,
				message: '',
			};
		case types.LOGIN_FAILED:
		case types.REGISTER_FAILED:
		case types.AUTH_ERROR:
			localStorage.removeItem('jwtToken');
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				message: action.payload,
			};
		default:
			return state;
	}
};
