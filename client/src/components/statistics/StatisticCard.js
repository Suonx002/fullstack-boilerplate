import React from 'react';
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Icon,
	Flex,
} from '@chakra-ui/react';

const StatisticCard = ({ stat: { label, number, type, helpText, icon } }) => {
	return (
		<Flex
			align='center'
			justify='center'
			bg='white'
			borderRadius='4px'
			p={{ base: 6, sm: 8, md: 10 }}>
			<Icon
				mr='4'
				ml='4'
				fontSize={{ base: 18, sm: 20, md: 25 }}
				// _groupHover={{
				// 	color: 'white',
				// }}
				as={icon}
			/>
			<Stat justifyContent='flex-end'>
				<Flex
					justifyContent={'space-between'}
					flexDirection='column'
					align='center'>
					<StatLabel>{label}</StatLabel>
					<StatNumber>{number}</StatNumber>
					{/* <StatHelpText>
						<StatArrow type={type} />
						{helpText}
					</StatHelpText> */}
				</Flex>
			</Stat>
		</Flex>
	);
};

export default StatisticCard;
