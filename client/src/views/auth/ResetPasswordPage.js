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

import { Link as LinkRouter, useHistory, useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../redux/actions/auth/authActions';

const ResetPasswordPage = () => {
	const {
		auth: { user },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const toast = useToast();
	const history = useHistory();
	const { token } = useParams();

	const initialValues = {
		password: '',
		confirmPassword: '',
	};

	const resetPasswordSchema = Yup.object().shape({
		password: Yup.string().min(5).max(50).required().label('Password'),
		confirmPassword: Yup.string()
			.min(5)
			.max(50)
			.oneOf([Yup.ref('password')], 'Password does not match')
			.required('Password confirm is required')
			.label('Confirm Password'),
	});

	const resetPasswordFields = [
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

	const onSubmit = async (values) => {
		const password = values.password;

		dispatch(authActions.resetPassword({ password, token }, toast, history));
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
					<Heading fontSize={'4xl'}>Reset your password</Heading>
				</Stack>
				<Formik
					initialValues={initialValues}
					validationSchema={resetPasswordSchema}
					onSubmit={onSubmit}>
					{(values, isSubmitting) => (
						<Form>
							<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
								<Stack spacing={4} minW={{ base: 'auto', sm: 350 }}>
									{resetPasswordFields?.length > 0 &&
										resetPasswordFields.map((item) => (
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
											Update Password
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

export default ResetPasswordPage;
