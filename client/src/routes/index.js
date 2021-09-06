import { Route, Switch } from 'react-router-dom';

import homeRoutes from './homeRoutes';
import authRoutes from './authRoutes';

const MainRoutes = () => {
	const publicRouteComponents = [...homeRoutes, ...authRoutes];

	return (
		<Switch>
			{publicRouteComponents?.length > 0 &&
				publicRouteComponents.map(({ path, component }, index) => (
					<Route exact path={path} component={component} key={index} />
				))}
		</Switch>
	);
};

export default MainRoutes;
