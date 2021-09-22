import React from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const EditUserTableForm = ({ heading, currentUserData, isOpen, onClose }) => {
	const initialValues = {
		firstName: currentUserData?.firstName || '',
		lastName: currentUserData?.lastName || '',
		email: currentUserData?.email || '',
	};

	const userSchema = Yup.object().shape({
		firstName: Yup.string().required().label('First Name'),
		lastName: Yup.string().required().label('Last Name'),
		email: Yup.string().email().required().label('Email'),
	});

	const userFieldsArray = [
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
	];

	const onSubmit = async (values, { setSubmitting }) => {
		console.log({ values });
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<Formik
				validationSchema={userSchema}
				initialValues={initialValues}
				onSubmit={onSubmit}>
				{({ values, isSubmitting }) => (
					<Form>
						<ModalContent>
							<ModalHeader>{heading}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								{userFieldsArray?.length > 0 &&
									userFieldsArray.map((item) => (
										<Box key={item.name} mb={4}>
											<Field name={item.name}>
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
															value={values[item.name]}
														/>
														<FormErrorMessage>
															{form.errors[item.name]}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										</Box>
									))}
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='gray' mr={3} onClick={onClose}>
									Close
								</Button>
								<Button
									type='submit'
									Button
									isLoading={isSubmitting}
									bg={'primary.400'}
									color={'white'}
									_hover={{
										bg: 'primary.500',
									}}
									onClick={onClose}>
									Save
								</Button>
							</ModalFooter>
						</ModalContent>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default EditUserTableForm;
