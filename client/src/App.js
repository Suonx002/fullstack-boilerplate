import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from './redux/actions/auth/authActions';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/navbar/Navbar';
import MainRoutes from './routes';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.jwtToken) {
			setAuthToken(localStorage.jwtToken);
			dispatch(authActions.getAuthUser());
		}

		//eslint-disable-next-line
	}, []);

	return (
		<>
			<Navbar />
			<MainRoutes />
		</>
	);
};

export default App;
