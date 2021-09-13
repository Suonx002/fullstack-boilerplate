import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';

import homeRoutes from './homeRoutes';
import authRoutes from './authRoutes';

import dashboardRoutes from './dashboardRoutes';

import Page404 from '../views/404/Page404';
const MainRoutes = () => {
	const allRouteComponents = [...homeRoutes, ...authRoutes, ...dashboardRoutes];

	return (
		<Switch>
			{allRouteComponents?.length > 0 &&
				allRouteComponents.map(({ path, component, type = 'public' }, index) =>
					type === 'private' ? (
						<PrivateRoutes
							exact
							path={path}
							component={component}
							key={index}
						/>
					) : (
						<Route exact path={path} component={component} key={index} />
					)
				)}
			<Route component={Page404} />
		</Switch>
	);
};

export default MainRoutes;
