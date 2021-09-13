import React from 'react';

import { Input } from '@chakra-ui/react';

const FilterSearchBar = ({ filter, setFilter }) => {
	return (
		<Input
			placeholder='Filter by id, name, email, etc...'
			value={filter || ''}
			onChange={(e) => setFilter(e.target.value)}
			size={'lg'}
			variant='outline'
			my={5}
		/>
	);
};

export default FilterSearchBar;
