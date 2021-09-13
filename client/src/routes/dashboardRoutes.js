import DashboardHomepage from '../views/dashboard/DashboardHomepage';

import LoginSample from '../views/dashboard/auth/LoginSample';
import RegisterSample from '../views/dashboard/auth/RegisterSample';

const homeRoutes = [
	{
		path: '/dashboard',
		component: DashboardHomepage,
		type: 'private',
	},
	{
		path: '/dashboard/login',
		component: LoginSample,
		type: 'private',
	},
	{
		path: '/dashboard/register',
		component: RegisterSample,
		type: 'private',
	},
];

export default homeRoutes;
