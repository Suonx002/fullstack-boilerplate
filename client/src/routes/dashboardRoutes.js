import DashboardHomepage from '../views/dashboard/DashboardHomepage';

import LoginSample from '../views/dashboard/auth/LoginSample';
import RegisterSample from '../views/dashboard/auth/RegisterSample';

import BasicTableSample from '../views/dashboard/tables/BasicTableSample';
import BasicTableWithPaginationSample from '../views/dashboard/tables/BasicTableWithPaginationSample';
import TableWithSortAndPaginationSample from '../views/dashboard/tables/TableWithSortAndPaginationSample';
import TableWithFilterSortPaginationSample from '../views/dashboard/tables/TableWithFilterSortPagination';
import AdvanceTableSample from '../views/dashboard/tables/AdvanceTableSample';

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
	{
		path: '/dashboard/table/tableWithSortAndPagination',
		component: TableWithSortAndPaginationSample,
		type: 'private',
	},
	{
		path: '/dashboard/table/tableFilterSortPagination',
		component: TableWithFilterSortPaginationSample,
		type: 'private',
	},
	{
		path: '/dashboard/table/advanceTable',
		component: AdvanceTableSample,
		type: 'private',
	},
];

export default homeRoutes;
