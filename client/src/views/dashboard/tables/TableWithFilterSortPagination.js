import React from 'react';
import TableWithFilterSortPagination from '../../../components/tables/TableWithFilterSortPagination';

import TABLE_HEADER_COLUMNS from '../../../components/tables/TABLE_HEADER_COLUMNS';
import TABLE_DATA_SAMPLES from '../../../components/tables/TABLE_DATA_SAMPLES';

const TableWithFilterSortPaginationSample = () => {
	return (
		<TableWithFilterSortPagination
			TABLE_HEADER_COLUMNS={TABLE_HEADER_COLUMNS}
			TABLE_DATA_SAMPLES={TABLE_DATA_SAMPLES}
		/>
	);
};

export default TableWithFilterSortPaginationSample;
