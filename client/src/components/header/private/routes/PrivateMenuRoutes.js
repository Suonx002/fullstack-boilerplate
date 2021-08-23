import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../../../screens/dashboard/Dashboard';
import Settings from '../../../../screens/settings/Settings';

import SIDEBAR_MENU_ITEMS from '../SIDEBAR_MENU_ITEMS';

const componentsList = {
	Dashboard,
	Settings,
};

const PrivateMenuRoutes = () => {
	return (
		<Switch>
			{SIDEBAR_MENU_ITEMS?.length > 0 &&
				SIDEBAR_MENU_ITEMS.map((item, index) => (
					<Route
						exact
						path={`${item.link}`}
						component={componentsList[item.name]}
						key={`${item.name}-${index}`}
					/>
				))}
		</Switch>
	);
};

export default PrivateMenuRoutes;
