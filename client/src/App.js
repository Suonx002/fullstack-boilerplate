import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setAuthToken from './utils/setAuthToken';
import * as authActions from './redux/actions/auth/authActions';

import NavbarDashboard from './components/dashboard/navbarDashboard/NavbarDashboard';
import Navbar from './components/navbar/Navbar';
import MainRoutes from './routes';

const App = () => {
	const dispatch = useDispatch();
	const {
		auth: { user },
	} = useSelector((state) => state);

	useEffect(() => {
		if (localStorage.jwtToken) {
			setAuthToken(localStorage.jwtToken);
			dispatch(authActions.getAuthUser());
		}

		//eslint-disable-next-line
	}, []);

	return (
		<>
			{/* start -  with Dashboard */}
			{user ? (
				<NavbarDashboard>
					<MainRoutes />
				</NavbarDashboard>
			) : (
				<>
					<Navbar />
					<MainRoutes />
				</>
			)}
			{/* end -  with Dashboard */}
		</>
	);
};

export default App;
