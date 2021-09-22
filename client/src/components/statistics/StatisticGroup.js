import React from 'react';

import { StatGroup, SimpleGrid } from '@chakra-ui/react';

import { FiUsers, FiCheck, FiRefreshCcw, FiCalendar } from 'react-icons/fi';
import StatisticCard from './StatisticCard';

const StatisticGroup = () => {
	const statisticList = [
		{
			label: 'Users',
			number: 456670,
			type: 'increase',
			helpText: `23%`,
			icon: FiUsers,
		},
		{
			label: 'Active',
			number: 9000,
			type: 'increase',
			helpText: `30%`,
			icon: FiCheck,
		},
		{
			label: 'churned',
			number: 420,
			type: 'decrease',
			helpText: `15%`,
			icon: FiRefreshCcw,
		},
		{
			label: 'this month',
			number: 210,
			type: 'decrease',
			helpText: `5%`,
			icon: FiCalendar,
		},
	];

	return (
		statisticList?.length > 0 && (
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 4 }}
				spacing={{ base: '20px', sm: '30px', md: '40px' }}>
				{statisticList.map((stat) => (
					<StatisticCard key={stat.label} stat={stat} />
				))}
			</SimpleGrid>
		)
	);
};

export default StatisticGroup;
