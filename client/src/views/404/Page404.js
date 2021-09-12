import {
	Box,
	Heading,
	Container,
	Text,
	Button,
	Stack,
	Icon,
	useColorModeValue,
	createIcon,
} from '@chakra-ui/react';

import { Link as LinkRouter } from 'react-router-dom';

export default function Page404() {
	return (
		<>
			<Container maxW={'3xl'}>
				<Stack
					as={Box}
					textAlign={'center'}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}>
					<Heading
						fontWeight={600}
						fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
						lineHeight={'110%'}>
						<Text
							as={'h1'}
							color={'black.400'}
							fontSize='100px'
							mb={{ base: 12, sm: 8 }}>
							404
						</Text>
						<Text as={'span'} color={'red.400'}>
							Page Not Found
						</Text>
					</Heading>
					<Text color={'gray.500'}>
						Sorry, we are unable to find this page.
					</Text>
					<Stack
						direction={'column'}
						spacing={3}
						align={'center'}
						alignSelf={'center'}
						position={'relative'}>
						<Button
							as={LinkRouter}
							to='/'
							colorScheme={'red'}
							bg={'red.400'}
							rounded={'full'}
							px={6}
							_hover={{
								bg: 'red.500',
							}}>
							Go Back
						</Button>
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
