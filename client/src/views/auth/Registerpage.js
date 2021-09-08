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

const RegisterPage = () => {
	const initialValues = {
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const loginSchema = Yup.object().shape({
		fullName: Yup.string().required().label('Full Name'),
		email: Yup.string().email().required().label('Email'),
		password: Yup.string().required().label('Password'),
		confirmPassword: Yup.string().required().label('Confirm Password'),
	});

	const signupFields = [
		{
			name: 'fullName',
			label: 'Full Name',
		},
		{
			name: 'email',
			label: 'Email',
		},
		{
			name: 'password',
			label: 'Password',
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
		},
	];

	const onSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Create an account</Heading>
				</Stack>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={onSubmit}>
					{({ values, isSubmitting }) => {
						console.log({ isSubmitting });
						return (
							<Form>
								<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
									<Stack spacing={4} minW={{ base: 'auto', sm: 350 }}>
										{signupFields?.length > 0 &&
											signupFields.map((item) => (
												<Field name={item.name} key={item.name}>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors[item.name] &&
																form.touched[item.name]
															}>
															<FormLabel htmlFor={item.name}>
																{item.label}
															</FormLabel>
															<Input {...field} id={item.name} />
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
												<Text>Already have an account?</Text>
												<Link color={'blue.400'} as={LinkRouter} to='/login'>
													Login here.
												</Link>
											</Stack>
											<Button
												isLoading={isSubmitting}
												loadingText='Loading'
												type='submit'
												bg={'blue.400'}
												color={'white'}
												_hover={{
													bg: 'blue.500',
												}}>
												Register
											</Button>
										</Stack>
									</Stack>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Stack>
		</Flex>
	);
};

export default RegisterPage;
