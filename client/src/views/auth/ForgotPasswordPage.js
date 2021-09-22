import { useEffect } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../redux/actions/auth/authActions';

const ForgotPasswordPage = () => {
	const {
		auth: { user },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const toast = useToast();
	const history = useHistory();

	const initialValues = {
		email: '',
	};

	const forgotPasswordSchema = Yup.object().shape({
		email: Yup.string().email().required().label('Email'),
	});

	const forgotPasswordFields = [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
		},
	];

	const onSubmit = async (values) => {
		const email = values?.email?.trim();
		dispatch(authActions.forgotPassword({ email }, toast));
	};

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, []);

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Forgot your password</Heading>
				</Stack>
				<Formik
					initialValues={initialValues}
					validationSchema={forgotPasswordSchema}
					onSubmit={onSubmit}>
					{(values, isSubmitting) => (
						<Form>
							<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
								<Stack spacing={4} minW={{ base: 'auto', sm: 350 }}>
									{forgotPasswordFields?.length > 0 &&
										forgotPasswordFields.map((item) => (
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
										<Button
											isLoading={isSubmitting}
											type='submit'
											bg={'primary.400'}
											color={'white'}
											_hover={{
												bg: 'primary.500',
											}}>
											Send Reset Link
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

export default ForgotPasswordPage;
