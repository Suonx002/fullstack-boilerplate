import { FiHome, FiFileText } from 'react-icons/fi';
import { BiTable } from 'react-icons/bi';

const LINK_ITEMS = [
	{
		label: 'Home',
		icon: FiHome,
		to: '/',
	},
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
	{
		label: 'Tables',
		icon: BiTable,
		children: [
			{
				label: 'Basic Table Sample',
				subLabel: 'Basic table page sample',
				to: '/dashboard/table/basicSampleTable',
			},
			{
				label: 'Basic Table With Pagination Sample',
				subLabel: 'Basic table with pagination page sample',
				to: '/dashboard/table/basicSampleWithPaginationTable',
			},
		],
	},
];

export default LINK_ITEMS;
