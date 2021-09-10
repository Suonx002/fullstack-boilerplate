import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';

import homeRoutes from './homeRoutes';
import authRoutes from './authRoutes';

const MainRoutes = () => {
	const allRouteComponents = [...homeRoutes, ...authRoutes];

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
		</Switch>
	);
};

export default MainRoutes;
