import React from 'react';

import { Skeleton, Stack } from '@chakra-ui/react';

const SkeletonLoading = () => {
	return (
		<Stack>
			{Array(100)
				.fill()
				.map((el, index) => (
					<Skeleton height='20px' key={index} />
				))}
		</Stack>
	);
};

export default SkeletonLoading;
