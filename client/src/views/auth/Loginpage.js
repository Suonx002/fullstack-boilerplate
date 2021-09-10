import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	FormErrorMessage,
} from '@chakra-ui/react';

import { Link as LinkRouter } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

const LoginPage = () => {
	const initialValues = {
		email: '',
		password: '',
	};

	const loginSchema = Yup.object().shape({
		email: Yup.string().email().required().label('Email'),
		password: Yup.string().required().label('Password'),
	});

	const loginFields = [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
		},
	];

	const onSubmit = async (values) => {};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
				</Stack>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={onSubmit}>
					{(values, isSubmitting) => (
						<Form>
							<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
								<Stack spacing={4} minW={{ base: 'auto', sm: 350 }}>
									{loginFields?.length > 0 &&
										loginFields.map((item) => (
											<Field name={item.name} key={item.name}>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors[item.name] && form.touched[item.name]
														}>
														<FormLabel htmlFor={item.name}>
															{item.label}
														</FormLabel>
														<Input
															{...field}
															id={item.name}
															type={item?.type}
														/>
														<FormErrorMessage>
															{form.errors[item.name]}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										))}

									<Stack spacing={10}>
										{/* <Stack
											direction={{ base: 'column', sm: 'row' }}
											align={'start'}
											justify={'space-between'}>
											<Checkbox>Remember me</Checkbox>
											<Link color={'blue.400'}>Forgot password?</Link>
										</Stack> */}

										<Stack
											direction={{ base: 'column', sm: 'row' }}
											align={'start'}>
											<Text>Don't have an account?</Text>
											<Link color={'blue.400'} as={LinkRouter} to='/register'>
												Register Here.
											</Link>
										</Stack>
										<Button
											isLoading={isSubmitting}
											type='submit'
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500',
											}}>
											Login
										</Button>
									</Stack>
								</Stack>
							</Box>
						</Form>
					)}
				</Formik>
			</Stack>
		</Flex>
	);
};

export default LoginPage;
