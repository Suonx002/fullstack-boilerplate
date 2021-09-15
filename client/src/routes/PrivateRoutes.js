import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component, ...rest }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) => {
				// const PERMISSION_ACCESS = ['user', 'admin'];
				const isUserLoggedIn = localStorage?.jwtToken;

				if (isUserLoggedIn || isAuthenticated) {
					return <Component {...props} />;
				}

				return <Redirect to='/login' />;
			}}
		/>
	);
};

export default PrivateRoutes;
