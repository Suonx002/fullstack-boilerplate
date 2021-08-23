import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import StatisticGroup from '../../components/statistics/StatisticGroup';
import TableList from '../../components/table/TableList';

const Dashboard = () => {
	return (
		<>
			<Box mb={8}>
				<StatisticGroup />
			</Box>
			<Box my={8}>
				<TableList />
			</Box>
		</>
	);
};

export default Dashboard;
