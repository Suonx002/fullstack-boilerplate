import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import StatisticGroup from '../../components/statistics/StatisticGroup';
import AdvanceTable from '../../components/tables/AdvanceTable';
import TABLE_DATA_SAMPLES from '../../components/tables/TABLE_DATA_SAMPLES';
import TABLE_HEADER_COLUMNS from '../../components/tables/TABLE_HEADER_COLUMNS';

const DashboardHomepage = () => {
	return (
		<>
			<Box mb={8}>
				<StatisticGroup />
			</Box>
			<Box my={8}>
				<AdvanceTable
					TABLE_DATA_SAMPLES={TABLE_DATA_SAMPLES}
					TABLE_HEADER_COLUMNS={TABLE_HEADER_COLUMNS}
				/>
			</Box>
		</>
	);
};

export default DashboardHomepage;
