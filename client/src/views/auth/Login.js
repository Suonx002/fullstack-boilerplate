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
								<Stack spacing={4}>
									<Field name='email'>
										{({ field, form }) => (
											<FormControl
												isInvalid={form.errors.email && form.touched.email}>
												<FormLabel htmlFor='email'>Email</FormLabel>
												<Input {...field} id='email' />
												<FormErrorMessage>{form.errors.email}</FormErrorMessage>
											</FormControl>
										)}
									</Field>

									<Field name='password'>
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.password && form.touched.password
												}>
												<FormLabel htmlFor='password'>Password</FormLabel>
												<Input {...field} id='password' />
												<FormErrorMessage>
													{form.errors.password}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>

									<Stack spacing={10}>
										{/* <Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}>
								<Checkbox>Remember me</Checkbox>
								<Link color={'blue.400'}>Forgot password?</Link>
							</Stack> */}
										<Button
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500',
											}}>
											Sign in
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
