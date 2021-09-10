/* eslint-disable import/no-anonymous-default-export */

import * as types from '../actions/auth/authTypes';

const initialStates = {
	isAuthenticated: true,
	user: null,
	token: null,
	message: '',
	isLoading: true,
};

export default (state = initialStates, action) => {
	switch (action) {
		case types.LOGIN_SUCCESS:
		case types.REGISTER_SUCCESS:
		case types.IS_LOGGED_IN:
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
