import React from 'react';
import AdvanceTable from '../../../components/tables/AdvanceTable';

import TABLE_HEADER_COLUMNS from '../../../components/tables/TABLE_HEADER_COLUMNS';
import TABLE_DATA_SAMPLES from '../../../components/tables/TABLE_DATA_SAMPLES';

const AdvanceTableSample = () => {
	return (
		<AdvanceTable
			TABLE_HEADER_COLUMNS={TABLE_HEADER_COLUMNS}
			TABLE_DATA_SAMPLES={TABLE_DATA_SAMPLES}
		/>
	);
};

export default AdvanceTableSample;
