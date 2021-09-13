import React from 'react';
import TableWithSortAndPagination from '../../../components/tables/TableWithSortAndPagination';

import TABLE_HEADER_COLUMNS from '../../../components/tables/TABLE_HEADER_COLUMNS';
import TABLE_DATA_SAMPLES from '../../../components/tables/TABLE_DATA_SAMPLES';

const TableWithSortAndPaginationSample = () => {
	return (
		<TableWithSortAndPagination
			TABLE_HEADER_COLUMNS={TABLE_HEADER_COLUMNS}
			TABLE_DATA_SAMPLES={TABLE_DATA_SAMPLES}
		/>
	);
};

export default TableWithSortAndPaginationSample;
