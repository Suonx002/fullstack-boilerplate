import React, { useEffect } from 'react';
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
	useToast,
} from '@chakra-ui/react';

import { Link as LinkRouter, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

const RegisterSample = () => {
	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const loginSchema = Yup.object().shape({
		firstName: Yup.string().min(2).required().label('First Name'),
		lastName: Yup.string().min(2).required().label('Last Name'),
		email: Yup.string().min(2).email().required().label('Email'),
		password: Yup.string().min(5).max(50).required().label('Password'),
		confirmPassword: Yup.string()
			.min(5)
			.max(50)
			.oneOf([Yup.ref('password')], 'Password does not match')
			.required('Password confirm is required')
			.label('Confirm Password'),
	});

	const signupFields = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
		},
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
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
		},
	];

	const onSubmit = async (values, { setSubmitting }) => {
		// const firstName = values?.firstName.trim() || '';
		// const lastName = values?.lastName.trim() || '';
		// const email = values?.email.trim() || '';
		// const password = values?.password.trim() || '';
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
															<Input
																{...field}
																id={item.name}
																type={item.type}
															/>
															<FormErrorMessage>
																{form.errors[item.name]}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
											))}

										<Stack spacing={10}>
											<Stack
												direction={{ base: 'column', sm: 'row' }}
												align={'start'}>
												<Text>Already have an account?</Text>
												<Link color={'primary.400'} as={LinkRouter} to='/login'>
													Login here.
												</Link>
											</Stack>
											<Button
												isLoading={isSubmitting}
												loadingText='Loading'
												type='submit'
												bg={'primary.400'}
												color={'white'}
												_hover={{
													bg: 'primary.500',
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

export default RegisterSample;
