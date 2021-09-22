import { FiHome, FiFileText, FiSettings } from 'react-icons/fi';
import { BiTable } from 'react-icons/bi';

const LINK_ITEMS = [
	{
		label: 'Home',
		icon: FiHome,
		to: '/dashboard',
	},
	// Pages
	{
		label: 'Pages',
		icon: FiFileText,
		children: [
			{
				label: 'Login Sample',
				subLabel: 'Login page sample',
				to: '/dashboard/login',
			},
			{
				label: 'Register Sample',
				subLabel: 'Register page sample',
				to: '/dashboard/register',
			},
		],
	},
	// tables
	{
		label: 'Tables',
		icon: BiTable,
		children: [
			{
				label: 'Basic Table Sample',
				to: '/dashboard/table/basicSampleTable',
			},
			{
				label: 'Basic Table With Pagination Sample',
				to: '/dashboard/table/basicSampleWithPaginationTable',
			},
			{
				label: 'Table With Sort And Pagination',
				to: '/dashboard/table/tableWithSortAndPagination',
			},
			{
				label: 'Table With Filter, Sort, and Pagination',
				to: '/dashboard/table/tableFilterSortPagination',
			},
			{
				label: 'Advance Table',
				to: '/dashboard/table/advanceTable',
			},
		],
	},
	// Settings
	{
		label: 'Settings',
		icon: FiSettings,
		to: '/dashboard/settings',
	},
];

export default LINK_ITEMS;
