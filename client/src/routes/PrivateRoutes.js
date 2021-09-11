import React from 'react';

import { useToast } from '@chakra-ui/toast';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component, ...rest }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const toast = useToast();

	return (
		<Route
			{...rest}
			render={(props) => {
				const PERMISSION_ACCESS = ['user', 'admin'];
				const isUserLoggedIn = localStorage?.jwtToken;

				if (
					isUserLoggedIn ||
					(isAuthenticated && user && PERMISSION_ACCESS.includes(user.role))
				) {
					return <Component {...props} />;
				}

				toast({
					title: 'Error',
					description: 'Please login to access this page!',
					status: 'error',
					position: 'top',

					duration: 4000,
					isClosable: true,
				});

				return <Redirect to='/login' />;
			}}
		/>
	);
};

export default PrivateRoutes;
