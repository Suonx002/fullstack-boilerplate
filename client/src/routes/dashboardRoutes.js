import DashboardHomepage from '../views/dashboard/DashboardHomepage';

import LoginSample from '../views/dashboard/auth/LoginSample';
import RegisterSample from '../views/dashboard/auth/RegisterSample';

import BasicTableSample from '../views/dashboard/tables/BasicTableSample';
import BasicTableWithPaginationSample from '../views/dashboard/tables/BasicTableWithPaginationSample';

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
	{
		path: '/dashboard/table/basicSampleTable',
		component: BasicTableSample,
		type: 'private',
	},
	{
		path: '/dashboard/table/basicSampleWithPaginationTable',
		component: BasicTableWithPaginationSample,
		type: 'private',
	},
];

export default homeRoutes;
